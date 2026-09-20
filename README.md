# Adam Mohamed - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing **Adam Mohamed**, a Flutter & Dart Developer and Engineering track student. The website features a vibrant Flutter-inspired color palette (Electric Teal, Sky Blue, and Dark Blue), a persistent Light/Dark theme switcher, responsive layout, an interactive skills matrix, client-side contact validation, and an interactive **live Flutter-style smartphone simulator** running the featured To-Do App.

---

## 🚀 Live Demo & Preview

You can view the portfolio by simply opening `index.html` in any modern web browser:

1. **Direct Double-Click**: Double-click [`index.html`](./index.html) in File Explorer.
2. **VS Code Live Server**: Right-click `index.html` in VS Code and select **"Open with Live Server"**.
3. **Local Python Server**:
   ```bash
   python -m http.server 8080
   ```
   Then open `http://localhost:8080` in your browser.

---

## 🎨 Design & Features

- **Flutter-Themed Identity**:
  - Electric Teal (`#00D2B5`), Flutter Sky Blue (`#0175C2`), Deep Blue (`#02569B`), and Vibrant Action Blue (`#027DFD`).
  - Seamless Light and Dark mode with `localStorage` persistence and automatic system preference detection.
- **Interactive Flutter Smartphone Simulator**:
  - Live interactive demo of the featured **To-Do App** running in a realistic smartphone frame.
  - **Features demonstrated**: Add tasks, toggle completion with animated strikethrough, edit tasks, delete tasks, filter tasks (All / Active / Completed), input validation, remaining task counter, and local storage persistence simulating SQLite.
- **Interactive Skills Matrix**:
  - Categorized into **Programming**, **Mobile Development**, **Web Development**, and **Tools & Workflows**.
  - Category filter tabs with instant filtering.
- **Modern Responsive Layout**:
  - Mobile-first architecture tested across desktop, tablet, and mobile screens.
  - Sticky glassmorphic navigation bar with active section scroll-spy indicator.
  - Mobile hamburger drawer navigation.
- **Contact Form**:
  - Name, Email, and Message fields.
  - Client-side validation for required fields, email format, and message length with character counter.
  - Animated submit state and success toast.
- **GitHub Integration**:
  - Prominent links to GitHub profile.

---

## 📂 Project Structure

```
Portfolio/
├── index.html        # Semantic HTML5 markup with accessible components & SVG icons
├── style.css         # Flutter-inspired CSS design system, responsive grid, light/dark themes
├── app.js            # Theme manager, scroll-spy, skills filter, To-Do simulator, contact validation
└── README.md         # Project documentation and guide
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags, accessible landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), ARIA attributes.
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox, Glassmorphism (`backdrop-filter`), animations.
- **JavaScript (ES6+)**: Zero-dependency vanilla JavaScript for speed, reliability, and ease of hosting.
- **Flutter Design Principles**: Material 3 inspired components, Flutter color tokens, SnackBar toasts.

---

## 🌐 Deploying to GitHub Pages

1. Initialize a git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Adam Mohamed portfolio"
   ```
2. Push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository settings, go to **Pages** > **Build and deployment** > Source: **Deploy from a branch** (`main` / root).
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.
