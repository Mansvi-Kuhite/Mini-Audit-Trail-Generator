Mini Audit Trail Generator
A modern web-based version tracking system that records every change you make to text, highlights differences, and maintains a full audit trail.

🔗 Live Demo:
👉 https://mini-audit-trail-generator-iami.onrender.com

🚀 Features
✔ Save multiple versions of text
✔ Track added and removed words
✔ Highlight changes (GitHub-style)
✔ Delete individual versions
✔ Download logs as CSV and JSON
✔ Print or Save as PDF
✔ Light & Dark mode
✔ Clean modern UI
✔ Persistent storage using JSON file
✔ Fully functional REST API

🛠 Tech Stack
Next.js (Pages Router)
React.js
Node.js
File system JSON storage
Render Web Service
Custom diff algorithm

Folder Structure
src/
 ├── components/
 │   ├── Navbar.js
 │   └── DiffViewer.js
 ├── lib/
 │   └── diff.js
 ├── pages/
 │   ├── _app.js
 │   ├── index.js
 │   └── api/
 │       ├── save-version.js
 │       ├── versions.js
 │       └── delete-version.js
 ├── styles/
 │   └── global.css
 └── utils/
     └── downloads.js

data/
 └── versions.json

Local Setup
Clone the repo:
git clone https://github.com/Mansvi-Kuhite/Mini-Audit-Trail-Generator.git
cd Mini-Audit-Trail-Generator
npm install
npm run dev

🌐 Deployment (Render)
Your app uses:
render-build.sh (custom build script)
Node version 20.x

Render Build Command:
./render-build.sh

Render Start Command:
npm start

📡 API Endpoints
POST /api/save-version
Save a new version.
GET /api/versions
Fetch all versions.
DELETE /api/delete-version?id=UUID
Delete a specific version.

🧠 Diff Algorithm
Your diff logic:

Normalize words
Split content into tokens
Compare old vs new
Compute:
Added words
Removed words
Save details in JSON file

📄 Data Storage
Stored in:
data/versions.json


Each version:
{
  "id": "uuid",
  "timestamp": "",
  "addedWords": [],
  "removedWords": [],
  "oldLength": 0,
  "newLength": 0,
  "contentSnapshot": ""
}
