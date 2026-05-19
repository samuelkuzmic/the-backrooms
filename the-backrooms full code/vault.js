(function() {
    const target = "https://www.google.com";

    // 1. Kill the page and go to Google
    function goAway() {
        window.location.replace(target);
    }

    // 2. Keyboard Shortcut Block (F12, Ctrl+U, Ctrl+Shift+I/J/C)
    // Now triggers goAway() for all attempts
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 123 || // F12
           (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Inspect
           (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (View Source)
           (e.ctrlKey && e.keyCode === 83) || // Ctrl+S (Save)
           (e.ctrlKey && e.shiftKey && e.keyCode === 85)) { // Ctrl+Shift+U
            e.preventDefault();
            goAway();
        }
    }, true);

    // 3. Right-Click Block (View Page Source / View Frame Source)
    // Redirects to Google immediately if they try to right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        goAway();
    }, true);

    // 4. Inspect Element Window Detection
    // If the window shrinks (because DevTools opened), it kicks them
    setInterval(() => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            goAway();
        }
    }, 500);

    // 5. Anti-Source Code Loop
    setInterval(() => {
        (function() { return false; }['constructor']('debugger')['call']());
    }, 100);
})();
