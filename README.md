# Community Resource & Guest Dashboard Prototype

An automated resource allocation and guest log management system prototype built with React and Tailwind CSS. This application tracks real-time facilities utilisation, assigns active workspace environments, formats relative duration parameters, and utilizes local client storage for tracking history lifecycle persistence.

## 🚀 Active Production Deployment
* **Live Demo URL:** [https://community-dashboard-dzunwo9vh-korirdarius-9534s-projects.vercel.app/]
* **Environment:** Production Vercel Serverless

## ✨ Key Functionalities
* **Dynamic Resource Toggling:** Automated space booking constraints instantly update available desks and rooms upon check-in registration.
* **Smart Timing Metrics:** Integrated helper utilities analyze incoming time elements to output precise relative time display tags (e.g., "Just now", "24m ago").
* **Client Data Cache:** Built-in hooks automatically push and pull updates to `localStorage` to keep data alive across browser updates.
* **Filter Control Matrix:** Real-time character substring matching filters active records by guest name, purpose, or registration state simultaneously.

## 🛠️ Folder Architecture Map
```text
my-dashboard-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Identity banner
│   │   ├── MetricCards.jsx     # Live data counters
│   │   ├── RegistrationForm.jsx# Check-in validation controls
│   │   └── RegistryTable.jsx   # Modern registry view & time tags
│   ├── utils/
│   │   └── timeHelpers.js      # Relational duration utility formulas
│   ├── App.jsx                 # Core orchestrator file
│   └── main.jsx
└── package.json
```

## ⚙️ Steps to Run Locally
Follow these steps to spin up the application on your computer:

1. **Clone the Repository:**
   ```bash
   git clone [Insert your repository link here]
   cd my-dashboard-app
   ```

2. **Install Code Packages:**
   ```bash
   npm install
   ```

3. **Start Development Engine:**
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` in your browser window.*

## 📐 System Specifications & Engineering Focus
* **UI Stack:** Tailwind CSS framework featuring custom flexbox/grid layout splitter adapters.
* **State Operations:** Hooks (`useState`, `useEffect`) manage real-time structural calculations.
* **Component Engineering:** Pure structural components minimize unnecessary virtual tree rendering.
