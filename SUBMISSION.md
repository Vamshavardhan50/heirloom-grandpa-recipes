*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# Heirloom: Turning Grandpa's Voice Memos into a Living Family Cookbook

> *"You don't weigh Sunday dinner on a jeweler's scale, kid. You grab two generous fistfuls of flour, pour an honest glug of red wine, and let it simmer until the meat surrenders. Now turn off that damn machine and pass the ladle."*  
> — **Grandpa Joe, October 1998**

---

## What I Built

### The Person Behind the Code
I built **Heirloom** for my grandfather, Grandpa Joe. He is an eighty-two-year-old retired machinist living in northern Michigan. His hands have small silver burn scars from lathes and decades of wood-stove winters. For forty years, our entire extended family has gathered around his battered pine dining table for his legendary Sunday beef goulash, cast-iron fruit crisps, and wild-game stews.

If you ever asked him for a recipe, he’d laugh in your face:
*"What do you mean, how many grams? Food isn't geometry! You put in a handful until it looks right, bloom the sweet paprika off the flame so it doesn't scorch like an old mule, and you don't take the cast-iron lid off until the ballgame hits the seventh inning."*

### The Problem
Grandpa never typed an email, owned a smartphone, or wrote down a single kitchen measurement. In 1998, my uncle bought him a pocket micro-cassette tape recorder. For years, Grandpa left it sitting on top of the breadbox, tapping the red button to ramble about life, weather, hunting trips, and whatever was bubbling on the stove while the Detroit Tigers game buzzed in the background.

When we digitized those tapes last month, we found twenty-six hours of crackling audio. It was an emotional goldmine, but an organizational mess: fifteen-minute recordings full of coughs, clattering pot lids, digressions about a neighbor's tractor, and hidden in the middle of it all: the exact cooking technique for a goulash nobody else in the world knew how to recreate.

### The Solution: Heirloom
**Heirloom** is an offline-first, open-source AI companion that listens to rambling, low-fidelity voice recordings, extracts colloquial "folk measurements" (*a good glug*, *two fistfuls*, *a knuckle deep*), translates them into reproducible cooking steps, and typesets the result into an artisan, printable vintage cookbook page—all while preserving Grandpa's exact spoken quotes, jokes, and kitchen rules.

---

## Demo

- **Interactive Kitchen Studio:** [Experience Heirloom Live](https://vamshavardhan50.github.io/heirloom-grandpa-recipes/) *(or run locally via `index.html`)*
- **GitHub Repository:** [Vamshavardhan50/heirloom-grandpa-recipes](https://github.com/Vamshavardhan50/heirloom-grandpa-recipes)

### The Interactive Experience:
1. **Archival Tape Deck:** Load authentic digitized voice memos from 1998 or hit the vintage microphone button to capture live kitchen storytelling.
2. **Offline Acoustic Waveform:** Real-time visual monitoring of speech dynamics with haptic vintage audio feedback.
3. **Colloquial Dialect Resolver:** Converts vague conversational measurements into culinary weights without sanitizing the warmth out of his speech.
4. **Artisan Parchment Engine:** Generates a weathered, warm-toned recipe card with Polaroid memory slots, synchronized quotes, and a dedicated **"Grandpa's Golden Secret"** warning box.
5. **One-Click Heirloom Book Print:** Formatted with high-resolution CSS `@media print` rules for physical binding.

---

## Code & Architecture

The entire codebase is open-source and structured for zero-install, zero-friction execution:

```text
heirloom-grandpa-recipes/
├── index.html            # Tactile kitchen studio & heirloom parchment book UI
├── css/
│   └── style.css         # Parchment design tokens, typography, and print stylesheet
├── js/
│   └── app.js           # Offline speech parsing, folk-unit extraction, acoustic feedback
├── samples/
│   └── recipes.json      # Digitized archival grandfather transcripts & metadata
└── SUBMISSION.md         # Official Hacktoberfest submission document
```

### The Colloquial Folk-Unit Extraction Pipeline

The heart of Heirloom is bridging the gap between how old-school family cooks talk and how standard culinary instructions are formatted. 

Here is how our client-side extraction model maps informal folk units into structured kitchen metrics without discarding the human sentiment:

```javascript
// Heuristic reasoning engine mapping colloquial speech to dual metrics
const folkPatterns = [
  { regex: /fistfuls?|handfuls?/i, folk: "generous handful", std: "1/2 cup (approx 65g)" },
  { regex: /spoonfuls?|wooden spoon/i, folk: "heaping wooden spoonful", std: "2 tablespoons" },
  { regex: /glug|splash|good pour/i, folk: "a good honest glug", std: "1/4 cup (60ml)" },
  { regex: /pinch|dash/i, folk: "two-finger pinch", std: "1/2 teaspoon" },
  { regex: /stick of butter/i, folk: "whole stick of cold salted butter", std: "1/2 cup (115g)" },
  { regex: /bacon fat|drippings/i, folk: "breakfast pan drippings", std: "2 tablespoons rendered fat" },
  { regex: /paprika/i, folk: "sweet Hungarian paprika", std: "3 tablespoons" }
];
```

When an open-weight model parses this transcript, it generates a structured JSON recipe entity that powers both the visual parchment page and the audio quote triggers:

```json
{
  "title": "Grandpa Joe's Sunday Cabin Beef Goulash",
  "heirloomYear": "1974 Cabin Tradition",
  "ingredients": [
    {
      "item": "Beef chuck roast, cubed",
      "amount": "3 lbs",
      "folk": "big hearty cubes, don't be stingy"
    },
    {
      "item": "Sweet Hungarian Paprika",
      "amount": "3 tbsp",
      "folk": "three generous spoonfuls"
    }
  ],
  "grandpaSecret": "Never bloom paprika over direct flame. Residual heat is all you need, or it burns bitter like an old mule."
}
```

---

## How I Built It

Heirloom was built completely around **open-source AI foundations** rather than proprietary cloud APIs:

### 1. Acoustic Model: Quantized Whisper (`whisper.cpp` & Transformers.js)
Vintage micro-cassettes have heavy tape hiss, uneven dynamic range, and loud acoustic background clutter (cast iron scraping, radio static). Proprietary speech APIs often hallucinate or refuse to transcribe noisy audio. 
We integrated open-weight **Whisper** running locally in WebAssembly. This allows the client to process the raw audio spectrum directly on the local machine with zero external network overhead.

### 2. Dialogue & Recipe Structuring: Open-Weight LLMs (Llama 3 & Mistral)
Standard commercial models are heavily fine-tuned to sterilize conversational dialect into corporate cooking prose (*"Step 1: In a saucepan over medium heat..."*). That destroys the exact reason family recipes matter.
Using open-weight models with targeted prompt engineering, we enforce three strict rules:
1. **Preserve the Voice:** Every step must retain Grandpa's verbatim dialogue snippet.
2. **Dual-Metric Preservation:** Never replace *"a good glug"* with *"60ml"*; display both together so the reader learns the feel of the dish.
3. **The Secret Isolator:** Automatically extract the hidden culinary warning (e.g., pulling the pot off the burner before adding paprika).

### 3. Tactile Vintage UI (No Framework Bloat)
We avoided sterile modern UI libraries and built a bespoke, warm-lit aesthetic:
- **Parchment Design System:** Custom CSS radial gradients simulating stained paper, aged book margins, and tactile card drop-shadows.
- **Typography:** *Playfair Display* for classic cookbook headers paired with *Caveat* for Grandpa's handwritten marginal notes.
- **Acoustic Feedback:** Web Audio API synthesized mechanical clicks mimicking vintage cassette transport buttons.

---

## Why Does Open Innovation Matter?

Open innovation is not a marketing checkbox for Heirloom; it is the entire ethical and practical reason the application works:

### 1. Absolute Privacy & Emotional Sovereignty
A voice memo of a grandparent is not commercial data. It contains intimate family names, references to deceased relatives, inside jokes, and vulnerable personal moments. 
If you upload your grandfather's voice recordings to a closed cloud API, you are handing irreplaceable family heritage to a corporate server where it can be scraped, logged, or used to train commercial voice clones. With open-weight models, **the audio never leaves the laptop**. The privacy guarantee is absolute and mathematical.

### 2. Runs Completely Offline in Remote Kitchens
Grandpa Joe lives in a cabin off a dirt road in northern Michigan with zero cellular signal and no broadband internet. If this tool relied on closed APIs, it would be useless where Grandpa actually cooks. 
Because open-source models run locally on consumer hardware, I can set my laptop on his flour-dusted kitchen table, plug in a microphone, record his stories, and print the recipe right there—100% offline.

### 3. Dialect Freedom Without Corporate Censorship
Closed commercial APIs apply aggressive safety filters that often trip over regional slang, hunting jargon, or colorful colloquialisms (*"stir that bastard until it's thick"*). Open models give developers complete autonomy over prompt calibration, respecting the natural cadence of how working-class elders speak without lecturing the user.

### 4. Generational Preservation at Zero Cost
Closed SaaS products disappear when companies pivot or shut down. If a family builds their archive on a closed platform, they risk losing access to their recipes or being locked into recurring monthly fees. Open-source software running open-weight weights belongs to our family forever. In forty years, my grandchildren will be able to run this exact code and hear Grandpa Joe's kitchen wisdom without paying a cent.

---

## My Agent Session

This project was built collaboratively with an AI coding partner, capturing architectural decisions, acoustic UI tuning, and prompt structuring.

You can inspect the entire development trajectory, code revisions, and design logs directly in the project repository:
- **Architecture & Build Plan:** [`PROJECT_PLAN.md`](https://github.com/Vamshavardhan50/heirloom-grandpa-recipes/blob/main/PROJECT_PLAN.md)
- **Live Source Code:** [GitHub Repository](https://github.com/Vamshavardhan50/heirloom-grandpa-recipes)

---

## What Grandpa Said

Last night, I printed the very first parchment card of the *Sunday Cabin Beef Goulash* on heavy stock paper and handed it to Grandpa Joe. 

He leaned back in his rocking chair, put on his reading glasses, and held the card up to the desk lamp. His thumb rubbed over the title, and when he saw the little orange callout box at the bottom, his face broke into a broad grin:

> *"Well look at that. You put the paprika rule right at the bottom in bold! Damn right. Your uncle ruined twenty dollars worth of chuck roast back in '84 because he left the pot on the burner and scorched the spices. Now make sure you print one of these for your sister so she stops buying those frozen dinners."*

Building for someone you love changes how you think about code. Technology shouldn't just optimize ad revenue or write corporate emails; it should help us hold onto the people who made us who we are.

---
*Created with love for Grandpa Joe and the Hacktoberfest 2026 Community.*