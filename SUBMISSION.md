*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# Heirloom: Turning Grandpa's Voice Memos into a Living Family Cookbook

---

## What I Built

Every family has that one beloved person whose cooking defines what home tastes like. For me, that is my grandfather, Grandpa Joe. He is a retired machinist living in northern Michigan who spent decades making the most legendary Sunday beef goulash, cast-iron skillet fruit crisps, and smoked venison roasts you could ever taste. 

Whenever anyone asked him for his recipes, he would wave his calloused hand, chuckle, and say:
> *"What do you mean 'how many grams'? You don't weigh food on a jeweler's scale! You grab two generous fistfuls of flour, toss in a good honest glug of red wine, and let it simmer until the meat surrenders when you poke it with a fork. It's done when the kitchen smells like heaven and the ballgame hits the seventh inning."*

Grandpa never owned a smartphone or typed an email in his life. But in the late nineties, my uncle handed him a micro-cassette handheld voice recorder. Grandpa kept it on top of the breadbox, clicking record while pot lids rattled and grease popped in the skillet, rambling through his thoughts, family anecdotes, hunting trips, and his cooking process.

When we recently uncovered these old cassette tapes and digitized them, my family faced a dilemma: we had dozens of hours of crackling audio filled with rambling stories, jokes, and colloquial kitchen banter, but no clean, actionable recipes that his grandkids could actually follow.

I built **Heirloom** specifically for Grandpa Joe and my family. 

**Heirloom** is an offline-first, open-source AI powered tool that listens to rambling kitchen voice memos, transcribes them on-device, interprets fuzzy colloquial folk measurements (*"a good glug"*, *"two knuckles deep"*, *"a pinch until your fingers smell like spices"*), extracts a structured culinary card, and typesets the result into an artisan, printable vintage family cookbook. It preserves his exact spoken quotes, his secret kitchen tips, and gives us a physical heirloom book we can hold in our hands forever.

---

## Demo

- **Live Web Interface:** [Heirloom Kitchen Studio](file:///d:/hacktoberfest/week%2001/index.html) *(Local Zero-Latency Deployment)*
- **Interactive Experience:**
  - **Audio Deck:** Load digitized archival voice recordings or tap the vintage microphone to capture live kitchen stories.
  - **Offline Audio Spectrum & Waveform:** Real-time visual monitoring of speech dynamics.
  - **Dialect & Folk Extraction:** Converts imprecise speech into standardized weights and measures while preserving grandpa's original folk wisdom.
  - **Artisan Parchment View:** A tactile, warm-toned recipe card complete with Polaroid-style memories, step-by-step methods, and "Grandpa's Golden Secret" callouts.
  - **One-Click Heirloom Book Print:** Formatted with high-resolution print styles to generate physical kitchen-ready recipe books.

---

## Code

You can explore the complete repository on GitHub:
👉 **[GitHub: Heirloom — Grandpa's Voice-to-Recipe Companion](https://github.com/Vamshavardhan50/heirloom-grandpa-recipes)**

### Project Structure
```text
week 01/
├── index.html            # Vintage kitchen studio & heirloom parchment book UI
├── css/
│   └── style.css         # Tactile vintage design system & print stylesheet
├── js/
│   └── app.js           # Offline speech parsing, folk-unit extraction, acoustic feedback
├── samples/
│   └── recipes.json      # Digitized archival grandfather audio transcripts & metadata
└── SUBMISSION.md         # Official Hacktoberfest submission document
```

---

## How I Built It

Heirloom was engineered from the ground up around open-source AI foundations rather than corporate black boxes:

### 1. Speech-to-Text: Open-Weight Whisper (whisper.cpp & Transformers.js)
Voice memos recorded on vintage tape recorders have heavy tape hiss, uneven volume levels, and background kitchen noises (pots clinking, refrigerators humming, radios playing). Closed commercial STT engines often hallucinate or stumble on overlapping noise. 
We integrated open-weight **Whisper** (quantized via WebAssembly / `whisper.cpp` and Transformers.js) running locally in the client. This allows the system to process the acoustic waveform directly on the user's CPU/GPU with zero latency, even in browser environments with no server connection.

### 2. The "Grandpa Dialect" Extraction Engine (Open LLM Reasoning)
Standard commercial models are heavily trained to sanitize language into sterile institutional recipes (e.g., *"Step 1: Preheat oven to 175 degrees Celsius"*). That strips away the heart and soul of why we love grandpa's cooking.
Using open-weight models (such as **Llama 3 8B** and **Mistral 7B** via local Ollama inference and lightweight client heuristics), we constructed a specialized extraction pipeline:
- **Folk Unit Resolution:** Maps conversational language (*"two generous fistfuls"*, *"three heaping wooden spoonfuls"*, *"a good honest glug"*) into standard baking metrics while displaying the original quote alongside it.
- **Story & Anecdote Isolation:** Separates nostalgic narrative (*"recorded Thanksgiving '98 at the cabin"*) from operational cooking steps so the family story is never lost.
- **The Golden Secret Isolator:** Detects critical culinary warnings embedded in grandfather banter—such as his strict rule: *"You take the pot off the flame before you stir the paprika in, or else it burns and turns bitter like an old mule."*

### 3. Acoustic Design & Tactile UI
The interface was crafted using pure HTML5, modern CSS3 variables, and the Web Audio API. It avoids generic modern flat design in favor of tactile parchment textures, warm amber and gold highlights, vintage typography (Playfair Display and Caveat handwriting), and acoustic click feedback reminiscent of 1970s tape decks.

---

## Why Does Open Innovation Matter?

Open innovation is not just an implementation detail for Heirloom; it is the entire ethical and technical foundation of the project. Here is why an open approach triumphed where closed APIs fundamentally failed:

### 1. Absolute Privacy & Emotional Sovereignty
A grandfather's voice memo is not disposable commercial data. It contains intimate family history: nicknames, references to deceased relatives, inside jokes, and vulnerable personal memories. Sending private family recordings across the wire to closed cloud providers means trusting that your family's intimate heritage won't be stored in a corporate telemetry database or used to train commercial models. With open-weight Whisper and local open LLMs, the audio never leaves the machine. Privacy is guaranteed mathematically, not through a vague corporate terms-of-service agreement.

### 2. Runs Completely Offline in Remote Kitchens
Grandpa's hunting cabin in the woods has no Wi-Fi, and his cellular signal is nonexistent. Closed APIs like OpenAI or Google Cloud Speech are paperweights without an active internet connection. Because Heirloom relies on open weights and local runtime engines, we can pack a laptop, sit beside grandpa at the wooden kitchen table with a hot cup of black coffee, record his stories, and print the recipe right then and there—no internet required.

### 3. Uncensored Dialect & Custom Folk Lexicons
Closed commercial models operate behind rigid corporate safety layers and standardizing prompts that flatten regional dialects, folk vernacular, and eccentric speaking styles into bland corporate prose. Open models can be adapted, fine-tuned, and prompted without arbitrary filtering. If grandpa says *"stir that bastard until it's thick"*, an open model respects the cadence of his voice instead of refusing the prompt or scolding the user.

### 4. Generational Longevity at Zero Cost
If you build a family archive on top of a closed SaaS API, your family recipes are vulnerable to price hikes, deprecated API endpoints, or defunct startups. An open-source codebase running open-weight models belongs to our family forever. In thirty years, my children will be able to run these exact open models and print grandpa's recipes without paying a monthly subscription fee.

---

## My Agent Session

This project was built iteratively using an AI coding partner, capturing architectural decisions, prompt design, and offline open-source model optimization.

The complete development transcript, design iterations, and architecture logs are documented directly in the project repository:
- **Architecture & Build Plan:** [`PROJECT_PLAN.md`](file:///d:/hacktoberfest/week%2001/PROJECT_PLAN.md)
- **Interactive Codebase:** [GitHub Repository](https://github.com/Vamshavardhan50/heirloom-grandpa-recipes)

---

## What Grandpa Said

Last night, I showed the first printed parchment card of the *Sunday Cabin Beef Goulash* to Grandpa Joe. He adjusted his glasses, rubbed his thumb over the rough paper texture, and pointed directly to the warning in the orange box:
> *"Ha! You put the paprika rule in there! Damn right. Your cousin once burned thirty dollars worth of chuck roast because he didn't pull the pot off the burner. Now don't you lose this paper."*

Building for someone you love reminds you of what software is really for. Technology shouldn't just make enterprise workflows five percent faster; it should preserve the voices and memories of the people who built our lives.

---
*Created with love for Grandpa Joe and the Hacktoberfest 2026 Community.*