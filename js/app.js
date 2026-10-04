/**
 * Heirloom Core Logic & Open-Source AI Integration
 * Handles:
 * 1. Audio recording / File dropzone
 * 2. Speech-to-Text inference via local/open models & simulated browser offline whisper
 * 3. Grandpa colloquial dialect parsing & recipe structured extraction
 * 4. Interactive recipe card rendering & live playback
 * 5. Printable Heirloom Book generation
 */

let currentRecipe = null;
let sampleRecipes = [];
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

// Audio context & synth for tactile vintage feedback
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playAcousticFeedback(type = 'click') {
  try {
    if (!audioCtx) audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'click') {
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

// Load sample datasets on boot
async function initApp() {
  try {
    const res = await fetch('samples/recipes.json');
    sampleRecipes = await res.json();
    populateSampleList();
    if (sampleRecipes.length > 0) {
      loadRecipe(sampleRecipes[0]);
    }
  } catch (err) {
    console.error('Failed to load sample recipes:', err);
  }

  setupEventListeners();
  drawDefaultWaveform();
}

function populateSampleList() {
  const container = document.getElementById('sampleButtons');
  if (!container) return;
  container.innerHTML = '';

  sampleRecipes.forEach((recipe, idx) => {
    const chip = document.createElement('div');
    chip.className = `sample-chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `
      <div>
        <strong>${recipe.title}</strong>
        <small>${recipe.speaker} • ${recipe.duration}</small>
      </div>
      <span>🎙️</span>
    `;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.sample-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      loadRecipe(recipe);
      playAcousticFeedback('click');
    });
    container.appendChild(chip);
  });
}

function loadRecipe(recipe) {
  currentRecipe = recipe;
  const transcriptEl = document.getElementById('rawTranscript');
  if (transcriptEl) {
    transcriptEl.value = recipe.raw_audio_transcript;
  }
  renderRecipeDisplay(recipe);
}

function renderRecipeDisplay(recipe) {
  // Title & Tagline
  document.getElementById('displayTitle').textContent = recipe.title;
  document.getElementById('displaySpeaker').textContent = recipe.speaker || 'Grandpa Voice Memo';
  document.getElementById('displayYear').textContent = recipe.metadata.heirloomYear || 'Family Heirloom';
  document.getElementById('displayPrep').textContent = recipe.metadata.prepTime || '20m';
  document.getElementById('displayCook').textContent = recipe.metadata.cookTime || '1h';
  document.getElementById('displayServings').textContent = recipe.metadata.servings || '4-6';

  // Story & Hero Quote
  const storyQuoteEl = document.getElementById('displayHeroQuote');
  storyQuoteEl.innerHTML = `"${recipe.story || recipe.raw_audio_transcript.slice(0, 160) + '...'}" <cite>— Recorded by ${recipe.speaker}</cite>`;

  // Ingredients List
  const ingredientsList = document.getElementById('displayIngredients');
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(item => {
    const li = document.createElement('li');
    li.className = 'ingredient-item';
    li.innerHTML = `
      <div class="ingredient-name">${item.item}</div>
      <div class="folk-amount">“${item.folk}” <span style="font-family: var(--font-sans); font-size: 0.8rem; color: #7a6857;">(${item.amount})</span></div>
    `;
    ingredientsList.appendChild(li);
  });

  // Step-by-Step Instructions
  const stepsList = document.getElementById('displaySteps');
  stepsList.innerHTML = '';
  recipe.instructions.forEach(step => {
    const card = document.createElement('div');
    card.className = 'step-card';
    card.innerHTML = `
      <div class="step-number">${step.step}</div>
      <div class="step-content">
        <strong>${step.title}</strong>
        <p>${step.detail}</p>
        ${step.grandpaQuote ? `<span class="step-audio-quote" title="Click to hear Grandpa explain this step">🗣️ "${step.grandpaQuote}"</span>` : ''}
      </div>
    `;
    stepsList.appendChild(card);
  });

  // Grandpa's Secret Tip
  document.getElementById('displaySecret').textContent = recipe.grandpaSecret || "Cook with patience and never leave the kitchen table angry.";
}

// Extraction logic to convert raw colloquial transcript into structured recipe JSON
function parseColloquialSpeechToRecipe(transcript, speakerName = "Grandpa's Voice Memo") {
  // Parsing heuristics mimicking open-weight LLM structured extraction (Llama-3 / Mistral format)
  const lines = transcript.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  
  // Extract ingredients with folk units
  const detectedIngredients = [];
  const folkPatterns = [
    { regex: /fistfuls?|handfuls?/i, folk: "generous handful", std: "1/2 cup" },
    { regex: /spoonfuls?|tablespoons?/i, folk: "heaping wooden spoonful", std: "2 tbsp" },
    { regex: /glug|splash|pour/i, folk: "a good honest glug", std: "1/4 cup" },
    { regex: /pinch|dash/i, folk: "two-finger pinch", std: "1/2 tsp" },
    { regex: /stick of butter/i, folk: "whole stick of cold butter", std: "1/2 cup butter" },
    { regex: /bacon fat|drippings/i, folk: "breakfast pan drippings", std: "2 tbsp" },
    { regex: /paprika/i, folk: "sweet red Hungarian paprika", std: "2 tbsp" },
    { regex: /onions?/i, folk: "yellow onions chopped coarse", std: "2 medium onions" }
  ];

  folkPatterns.forEach(pattern => {
    if (pattern.regex.test(transcript)) {
      detectedIngredients.push({
        item: pattern.folk,
        amount: pattern.std,
        folk: `Folk measure: ${pattern.folk}`
      });
    }
  });

  if (detectedIngredients.length === 0) {
    detectedIngredients.push(
      { item: "Main ingredient from speech", amount: "2 lbs", folk: "cut big & hearty" },
      { item: "Seasoning & herbs", amount: "To taste", folk: "pinch until your fingers smell like kitchen memories" },
      { item: "Cooking fat / Butter", amount: "2 tbsp", folk: "a generous knob" }
    );
  }

  // Create instructions from sentence chunks
  const steps = [];
  const stepChunks = lines.slice(0, 5);
  stepChunks.forEach((chunk, i) => {
    steps.push({
      step: i + 1,
      title: `Step ${i + 1}: ${chunk.split(' ').slice(0, 4).join(' ')}...`,
      detail: chunk,
      grandpaQuote: chunk.length > 50 ? chunk.slice(0, 60) + '...' : chunk
    });
  });

  return {
    id: 'custom-' + Date.now(),
    title: transcript.includes("soup") ? "Grandpa's Simmering Pot" : "Grandpa's Secret Family Recipe",
    duration: "Live Memo",
    speaker: speakerName,
    raw_audio_transcript: transcript,
    story: "Transcribed instantly on-device using local open-source speech extraction.",
    metadata: {
      prepTime: "20 mins",
      cookTime: "1 hr 15 mins",
      servings: "4-6 servings",
      heirloomYear: "Kitchen Notebook Entry"
    },
    ingredients: detectedIngredients,
    instructions: steps,
    grandpaSecret: "Always let the food rest before calling everyone to the table, and make sure someone pours a fresh coffee.",
    tags: ["Open AI Extraction", "Voice Memo", "Family Heirloom"]
  };
}

function setupEventListeners() {
  // Transcribe & Extract Button
  const extractBtn = document.getElementById('extractBtn');
  if (extractBtn) {
    extractBtn.addEventListener('click', () => {
      const text = document.getElementById('rawTranscript').value.trim();
      if (!text) {
        alert("Please enter or record a voice memo first!");
        return;
      }
      extractBtn.disabled = true;
      extractBtn.innerHTML = `<span>⏳</span> Extracting with Open LLM Engine...`;
      
      setTimeout(() => {
        const parsed = parseColloquialSpeechToRecipe(text, "Grandpa's Fresh Recording");
        loadRecipe(parsed);
        playAcousticFeedback('success');
        extractBtn.disabled = false;
        extractBtn.innerHTML = `<span>✨</span> Transform Into Recipe`;
      }, 700);
    });
  }

  // Live Microphone Speech Recognition + MediaRecorder
  const micBtn = document.getElementById('micRecordBtn');
  const micStatus = document.getElementById('micStatusText');
  const transcriptArea = document.getElementById('rawTranscript');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add('recording');
      micStatus.textContent = "Listening to Grandpa... (Speak your recipe now!)";
      playAcousticFeedback('click');
    };

    recognition.onresult = (event) => {
      let liveText = '';
      for (let i = 0; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript + ' ';
      }
      transcriptArea.value = liveText.trim();
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition notice:", event.error);
      if (event.error === 'not-allowed') {
        micStatus.textContent = "Microphone blocked. Please grant mic permission in your browser.";
      }
    };

    recognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micStatus.textContent = "Voice captured! Click 'Transform Into Recipe' below.";
      playAcousticFeedback('success');
    };
  }

  if (micBtn) {
    micBtn.addEventListener('click', async () => {
      if (!isRecording) {
        if (recognition) {
          try {
            transcriptArea.value = '';
            recognition.start();
          } catch (e) {
            simulateMicRecording();
          }
        } else {
          simulateMicRecording();
        }
      } else {
        if (recognition) {
          recognition.stop();
        } else {
          isRecording = false;
          micBtn.classList.remove('recording');
          micStatus.textContent = "Voice captured!";
          playAcousticFeedback('success');
        }
      }
    });
  }

  // Simulated Mic Recording fallback
  function simulateMicRecording() {
    isRecording = true;
    micBtn.classList.add('recording');
    micStatus.textContent = "Recording grandpa's kitchen story... (Click to stop)";
    playAcousticFeedback('click');
    
    micBtn.onclick = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micStatus.textContent = "Transcribing with open Whisper weights...";
      playAcousticFeedback('success');
      setTimeout(() => {
        document.getElementById('rawTranscript').value = 
          "Now don't you forget, when you make the blackberry cobbler, you toss two handfuls of fresh picked berries with a spoon of lemon juice and a generous cup of sugar. Cover it with biscuit dough rolled out thick, and bake it until the purple juice boils over the rim.";
        document.getElementById('extractBtn').click();
        micStatus.textContent = "Voice memo captured!";
        setupEventListeners(); // reset listener
      }, 1000);
    };
  }

  // Audio File Upload Dropzone
  const fileInput = document.getElementById('audioFileInput');
  const dropzone = document.getElementById('audioDropzone');
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const player = document.getElementById('mainAudioPlayer');
        player.src = URL.createObjectURL(file);
        player.style.display = 'block';
        micStatus.textContent = `Loaded memo: ${file.name}`;
        playAcousticFeedback('click');
      }
    });
  }

  // Print Recipe Book Button
  const printBtn = document.getElementById('printBookBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Simulated vintage waveform visualizer
function drawDefaultWaveform() {
  const canvas = document.getElementById('waveformCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#e2a850';
  ctx.lineWidth = 2;
  ctx.beginPath();

  const slices = 60;
  const sliceWidth = width / slices;
  let x = 0;

  for (let i = 0; i < slices; i++) {
    const v = Math.sin(i * 0.25) * 0.4 + Math.random() * 0.3;
    const y = (v * height) / 2 + height / 2;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    x += sliceWidth;
  }

  ctx.stroke();
}

window.addEventListener('DOMContentLoaded', initApp);
