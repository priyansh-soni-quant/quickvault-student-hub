# QuickVault
> **Student Resource & Code Snippet Management Hub**  
> *Submitted for FALLING SUN 2026 – Web Development Track*

QuickVault is a lightweight, responsive web application engineered to help students and developers aggregate, organize, and query study notes, web resources, and code snippets within a single unified dashboard.

---

## Key Features

- **Real-Time Client-Side Search:** Instant multi-field filtering by title, summary, or keyword.
- **Categorization Engine:** Filter items by distinct categories (*Code*, *Notes*, *Tool*) with dynamic visual tagging.
- **Persistent Local State:** Utilizes the browser's `localStorage` API to ensure saved data persists across sessions without requiring complex database infrastructure.
- **Responsive Dark Mode Dashboard:** Clean, modern interface styled using utility-first Tailwind CSS for seamless viewing across mobile, tablet, and desktop viewports.
- **Full CRUD Capabilities:** Add new resources dynamically or delete existing entries with immediate DOM UI updates.

---

## Technology Stack and Architecture

- **Frontend Structure:** HTML5 (Semantic Layout)
- **Styling & UI:** Tailwind CSS (via CDN) & Custom CSS (`style.css`)
- **Icons & Typography:** FontAwesome 6
- **Scripting & Logic:** Vanilla JavaScript ES6+ (`script.js`)
- **Data Persistence:** Browser `localStorage`

### Project Directory Layout
```text
quickvault-student-hub/
│
├── index.html        # App structure, layout containers, and modal forms
├── style.css         # Custom animations and active filter state classes
├── script.js         # State management, event handling, and DOM manipulation
└── README.md         # Project documentation and submission overview
