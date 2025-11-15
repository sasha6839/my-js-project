// Minimal interactive behaviour extracted from index.html
const form = document.getElementById('menuForm');
const presetRadios = Array.from(document.querySelectorAll('input[name="preset"]'));
const customInputs = document.getElementById('customInputs');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const minesInput = document.getElementById('mines');

function updateCustomVisibility(){
    const customSelected = document.querySelector('input[name="preset"]:checked')?.value === 'custom';
    customInputs.style.display = customSelected ? 'grid' : 'none';
}
presetRadios.forEach(r => r.addEventListener('change', updateCustomVisibility));
updateCustomVisibility();

// Client-side validation and setting defaults for presets before submitting
form.addEventListener('submit', (e) => {
    const preset = document.querySelector('input[name="preset"]:checked')?.value;
    if (preset === 'beginner') {
        rowsInput.value = 9; colsInput.value = 9; minesInput.value = 10;
    } else if (preset === 'intermediate') {
        rowsInput.value = 16; colsInput.value = 16; minesInput.value = 40;
    } else if (preset === 'expert') {
        rowsInput.value = 16; colsInput.value = 30; minesInput.value = 99;
    } else if (preset === 'custom') {
        // validate custom: mines < rows*cols
        const r = Math.max(5, Math.min(60, parseInt(rowsInput.value) || 9));
        const c = Math.max(5, Math.min(60, parseInt(colsInput.value) || 9));
        const maxMines = Math.max(1, r*c - 1);
        let m = Math.max(1, parseInt(minesInput.value) || 10);
        m = Math.min(m, maxMines);
        rowsInput.value = r; colsInput.value = c; minesInput.value = m;
    }
    // The form will submit with rows, cols, mines query parameters to /game
});

// Example handlers for auxiliary buttons
if (document.getElementById('tutorialBtn')) {
    document.getElementById('tutorialBtn').addEventListener('click', () => {
        alert('Objective: clear the board without detonating bombs.\nClick a cell to reveal. Right-click to flag.\nNumbers show how many adjacent mines exist.');
    });
}
if (document.getElementById('leaderboardBtn')) {
    document.getElementById('leaderboardBtn').addEventListener('click', () => {
        // navigate to leaderboard route if implemented
        window.location.href = '/leaderboard';
    });
}

// Accessibility: allow toggling custom options with keyboard when custom label focused
if (document.getElementById('customLabel')) {
    document.getElementById('customLabel').addEventListener('keydown', (ev) => {
        if(ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            document.querySelector('input[name="preset"][value="custom"]').checked = true;
            updateCustomVisibility();
        }
    });
}
