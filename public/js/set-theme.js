(function () {
  try {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (theme) {
      document.documentElement.className = theme.mode;
      document.documentElement.setAttribute('data-theme', theme.color);
    }
  } catch (e) {
    // fallback to defaults
    document.documentElement.className = 'light';
    document.documentElement.setAttribute('data-theme', 'base');
  }
})();
