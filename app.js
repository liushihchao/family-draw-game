// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
};

const ui = {
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),
    topic: document.getElementById('current-topic'),
    finalScore: document.getElementById('final-score-display'),
    canvas: document.getElementById('drawing-board'),
    topicBtn: document.getElementById('btn-toggle-topic')
};

const buttons = {
    start: document.getElementById('btn-start'),
    restart: document.getElementById('btn-restart'),
    home: document.getElementById('btn-home'),
    clear: document.getElementById('btn-clear'),
    eraser: document.getElementById('btn-eraser'),
    skip: document.getElementById('btn-skip'),
    correct: document.getElementById('btn-correct'),
    colors: document.querySelectorAll('.color-btn')
};

// Game State
const GAME_DURATION = 60; // seconds per round
const TOTAL_ROUNDS = 5;   // optional limit, or just endless
let state = {
    score: 0,
    timeLeft: GAME_DURATION,
    timerInterval: null,
    isDrawing: false,
    currentWord: '',
    ctx: null,
    lastX: 0,
    lastY: 0,
    brushColor: '#000000',
    brushSize: 5,
    mode: 'draw' // 'draw' or 'erase'
};

// --- Initialization ---
function init() {
    setupCanvas();
    setupEventListeners();
}

function setupCanvas() {
    state.ctx = ui.canvas.getContext('2d');

    // Set canvas resolution to match display size for sharp rendering
    const resizeCanvas = () => {
        const parent = ui.canvas.parentElement;
        ui.canvas.width = parent.clientWidth;
        ui.canvas.height = parent.clientHeight;

        // Reset context properties after resize
        state.ctx.lineCap = 'round';
        state.ctx.lineJoin = 'round';
        restoreBrush();
    };

    window.addEventListener('resize', resizeCanvas);
    // Initial size setup with a small delay to ensure layout is ready
    setTimeout(resizeCanvas, 100);
}

function restoreBrush() {
    if (state.mode === 'erase') {
        state.ctx.globalCompositeOperation = 'destination-out';
        state.ctx.lineWidth = 20; // Eraser is bigger
    } else {
        state.ctx.globalCompositeOperation = 'source-over';
        state.ctx.strokeStyle = state.brushColor;
        state.ctx.lineWidth = state.brushSize;
    }
}

function setupEventListeners() {
    // Navigation
    buttons.start.addEventListener('click', startGame);
    buttons.restart.addEventListener('click', startGame);
    buttons.home.addEventListener('click', () => showScreen('start'));

    // Game Actions
    buttons.skip.addEventListener('click', () => nextRound(false));
    buttons.correct.addEventListener('click', () => nextRound(true));
    buttons.clear.addEventListener('click', clearCanvas);

    // Eraser
    buttons.eraser.addEventListener('click', () => {
        state.mode = 'erase';
        buttons.colors.forEach(b => b.classList.remove('active'));
        buttons.eraser.classList.add('active');
        restoreBrush();
    });

    // Topic Reveal
    ui.topicBtn.addEventListener('click', toggleTopicReveal);
    ui.topic.addEventListener('click', toggleTopicReveal);

    // Drawing Tools
    buttons.colors.forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.mode = 'draw';
            // Remove active class from all including eraser
            buttons.colors.forEach(b => b.classList.remove('active'));
            buttons.eraser.classList.remove('active');

            // Add to clicked
            e.target.classList.add('active');
            // Set color
            state.brushColor = e.target.dataset.color;
            restoreBrush();
        });
    });

    // Drawing Events (Mouse)
    ui.canvas.addEventListener('mousedown', startDrawing);
    ui.canvas.addEventListener('mousemove', draw);
    ui.canvas.addEventListener('mouseup', stopDrawing);
    ui.canvas.addEventListener('mouseout', stopDrawing);

    // Drawing Events (Touch)
    ui.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Stop scrolling
        startDrawing(e.touches[0]);
    }, { passive: false });

    ui.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    }, { passive: false });

    ui.canvas.addEventListener('touchend', stopDrawing);
}

// --- Navigation ---
function showScreen(screenName) {
    Object.values(screens).forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });

    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

// --- Game Logic ---
function startGame() {
    state.score = 0;
    updateUI();
    showScreen('game');
    // Ensure canvas is sized correctly after showing screen
    setTimeout(() => {
        const parent = ui.canvas.parentElement;
        ui.canvas.width = parent.clientWidth;
        ui.canvas.height = parent.clientHeight;
        state.ctx.lineCap = 'round';
        state.ctx.lineJoin = 'round';
        restoreBrush();
    }, 50);

    nextRound(null); // Start first round
}

function nextRound(info) {
    // Info: true (correct), false (skip), null (start)
    if (info === true) {
        state.score += 10;
        // Visual feedback could go here
    }

    // Pick new word
    const randomIndex = Math.floor(Math.random() * GAME_WORDS.length);
    state.currentWord = GAME_WORDS[randomIndex];

    // Reset Round State
    state.timeLeft = GAME_DURATION;
    clearCanvas();
    resetTopicReveal();
    updateUI();

    // Restart Timer
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(timerTick, 1000);
}

function timerTick() {
    state.timeLeft--;
    updateUI();

    if (state.timeLeft <= 0) {
        // Time's up!
        // Allow playing until 'Skip' or 'Correct' is pressed? 
        // Or auto-skip? Let's just flash red and wait for user action to keep flow smooth.
        ui.timer.style.color = 'red';
    } else {
        ui.timer.style.color = 'inherit';
    }
}

function endGame() {
    clearInterval(state.timerInterval);
    showScreen('result');
    ui.finalScore.textContent = state.score;
}

function updateUI() {
    ui.score.textContent = state.score;
    ui.timer.textContent = state.timeLeft;
    ui.topic.textContent = state.currentWord;
}

function resetTopicReveal() {
    ui.topic.classList.add('blur-reveal');
    ui.topic.classList.remove('revealed');
}

function toggleTopicReveal() {
    ui.topic.classList.toggle('blur-reveal');
    ui.topic.classList.toggle('revealed');
}

// --- Drawing Logic ---
function getPos(e) {
    const rect = ui.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startDrawing(e) {
    state.isDrawing = true;
    const pos = getPos(e);
    state.lastX = pos.x;
    state.lastY = pos.y;
}

function draw(e) {
    if (!state.isDrawing) return;

    const pos = getPos(e);

    state.ctx.beginPath();
    state.ctx.moveTo(state.lastX, state.lastY);
    state.ctx.lineTo(pos.x, pos.y);
    state.ctx.stroke();

    state.lastX = pos.x;
    state.lastY = pos.y;
}

function stopDrawing() {
    state.isDrawing = false;
    state.ctx.beginPath(); // Reset path to prevent lines connecting to new start
}

function clearCanvas() {
    state.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
}

// Start
init();
