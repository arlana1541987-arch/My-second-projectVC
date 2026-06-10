const THEME_KEY = "budgetTheme";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.title = theme === "dark"
        ? "Включить светлую тему"
        : "Включить тёмную тему";
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(saved);
}

initTheme();
