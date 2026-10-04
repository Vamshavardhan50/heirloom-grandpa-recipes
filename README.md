# 📻 Heirloom — Grandpa's Voice-to-Recipe Kitchen Companion
> **Hacktoberfest 2026 Weekend Challenge:** *Build for a Friend (or Family)*  
> Turning crackling kitchen voice memos, old cassette tapes, and fuzzy folk measurements into a beautiful, printable family recipe book using offline open-source AI.

---

## 📖 The Story
Grandpa Joe never wrote down a recipe. If you asked him how much salt or paprika to put in his famous Sunday Cabin Beef Goulash, he would tell you: *"Two generous fistfuls of flour, a good honest glug of red wine, and a pinch of salt until your fingers smell like the spice rack."*

When our family digitized a box of his old micro-cassette tapes from the late 1990s, we had dozens of hours of rambling kitchen banter, family anecdotes, and clattering cast-iron skillets. 

**Heirloom** is an offline-first tool that uses open-source speech recognition (Whisper) and local language modeling (Llama 3 / Mistral) to translate grandfather colloquialisms into clear, structured culinary recipe cards—preserving his exact spoken quotes, his secret kitchen rules, and typesetting everything into an artisan parchment book ready to print and keep forever.

---

## 🚀 Key Features
- **🎙️ Audio Kitchen Deck:** Drop voice memo files (`.mp3`, `.wav`, `.m4a`) or record directly into the browser.
- **⚡ 100% Offline Inference:** Runs on-device with zero external API calls. Your family's intimate voices and memories never leave your laptop.
- **🧂 Folk-Unit Converter:** Understands colloquial measurements (*"fistful"*, *"heaping wooden spoon"*, *"good glug"*, *"knuckle deep"*) and provides estimated culinary equivalents while keeping the original quote intact.
- **📜 Parchment Heirloom Typesetting:** Warm, vintage aesthetic with handwritten annotations, quotes, and "Grandpa's Golden Secret" callout boxes.
- **🖨️ Print & PDF Ready:** Built-in high-resolution print styles to generate a physical keepsake cookbook.

---

## 🛠️ Open Innovation & Technology Stack
- **Speech-to-Text:** Open-weight Whisper via WebAssembly / `whisper.cpp` & Transformers.js.
- **Reasoning & Extraction:** Open-weight LLMs (Llama 3 / Mistral via local Ollama & client heuristics).
- **Frontend:** Pure HTML5, CSS3 Custom Properties (Parchment Design System), Web Audio API for vintage tactile feedback.
- **Agent Session Tracking:** [DevRelay](https://devrelay.dev) for session provenance and hackathon submission.

---

## 🏃 Quick Start
Simply open `index.html` in any modern web browser:
```bash
# In the project directory:
start index.html
```
No complex build steps or node dependencies required!

---

## 📄 Submission Details
See [`SUBMISSION.md`](file:///d:/hacktoberfest/week%2001/SUBMISSION.md) for the complete DEV.to hackathon post, including the backstory, architectural breakdown, and grandpa's reaction.
