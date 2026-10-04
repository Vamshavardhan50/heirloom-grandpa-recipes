# Heirloom: Technical Architecture & Development Blueprint
**Hacktoberfest 2026 Weekend Challenge — Week 01**

---

## 1. Executive Summary
- **Project Name:** Heirloom (Grandpa's Voice-to-Recipe Kitchen Companion)
- **Problem Statement:** Family recipes are frequently communicated through imprecise, colloquial spoken voice recordings that closed cloud APIs fail to transcribe accurately or privately.
- **Core Solution:** An offline-first web application powered by open-weight Whisper and localized reasoning heuristics to translate nostalgic kitchen audio into structured culinary keepsake books.

---

## 2. Technical Stack
| Layer | Open-Source Technology | Purpose |
| :--- | :--- | :--- |
| **Acoustic Transcription** | OpenAI Whisper (quantized / `whisper.cpp` & WebAssembly) | Zero-latency, on-device audio decoding with no cloud telemetry. |
| **Colloquial Reasoning** | Open LLM (Llama 3 / Mistral format) | Extraction of dual measurements (folk + metric) and verbatim sentiment quotes. |
| **Frontend Runtime** | Pure HTML5, CSS3 Variables, Web Audio API | Zero-dependency, framework-agnostic client with tactile parchment aesthetics. |
| **Physical Output** | CSS `@media print` engine | High-resolution typography tuned for physical cookbook binding. |

---

## 3. Privacy & Offline Guarantees
- No tracking pixels, analytics beacons, or remote cloud database endpoints.
- Audio blobs remain strictly in client memory (`URL.createObjectURL(audioBlob)`).
- Complete functionality guaranteed without an active internet connection.
