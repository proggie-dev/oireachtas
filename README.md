# Houses of the Oireachtas – React/TypeScript Demo

## 📖 About the Project
This is a small demonstration project showcasing a **React + TypeScript development environment**.  
The application is bootstrapped with [Vite](https://vitejs.dev/) and uses several modern libraries and tools, including:

- [MUI](https://mui.com/) for UI components  
- [Sass](https://sass-lang.com/) for styling  
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management  
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing  
- [i18next](https://www.i18next.com/) for internationalization  

👉 **Live Demo:** [View here](https://https://oireachtas-khaki.vercel.app/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (>= 18 recommended)  
- **npm** (comes with Node.js)  

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/proggie-dev/oireachtas.git
cd oireachtas
npm install
```

### Development
Start the local development server:
```bash
npm run dev
```

---

## 🛠️ Available Scripts

- **Start dev server**  
  Starts the Vite development server with hot module replacement.  
  ```bash
  npm run dev
  ```

- **Lint check**  
  Runs ESLint with rules configured in `eslint.config.ts`.  
  Useful for ensuring consistent code style.  
  ```bash
  npm run lint
  ```

- **Code formatting**  
  Uses Prettier with settings from `.prettierrc` to automatically format code.  
  ```bash
  npm run format
  ```

- **Build project**  
  Creates an optimized production build inside the `dist/` folder.  
  ```bash
  npm run build
  ```

- **Run tests**  
  Executes the unit test suite with React Testing Library and Jest.  
  ```bash
  npm run test
  ```

---

## 📂 Project Structure
```
houses-of-the-oireachtas/
│── src/               # Application source code
│── public/            # Static assets
│── eslint.config.ts   # ESLint configuration
│── .prettierrc        # Prettier configuration
│── vite.config.ts     # Vite configuration
```

---

## 🌍 Internationalization
The project uses **i18next** to handle multiple languages.  
Translation resources can be extended by adding new locale files inside the `locales/` directory.

---

## ✅ Roadmap / Future Improvements
- Improve unit tests coverage,
- Add more CRUD functionality, 
- Improve i18n coverage, and possibly, consider more languages to support  

---

## 📜 License
This is a test project — feel free to play around, experiment, and have fun! No formal license applied.
