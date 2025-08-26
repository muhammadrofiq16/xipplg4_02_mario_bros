// Control Panel Functions
function toggleFullScreen() {
    // ... kode existing
}

// Variabel global untuk status pause
let isGamePaused = false;
let gameLoopId = null;

// Fungsi untuk menghentikan game loop
function stopGameLoop() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
}

// Fungsi untuk toggle status pause
function togglePause() {
    if (isGamePaused) {
        // Jika game sedang pause, lanjutkan
        resumeGame();
    } else {
        // Jika game sedang berjalan, pause
        pauseGame();
    }
}

// Fungsi untuk menghentikan game
function pauseGame() {
    if (!isGamePaused) {
        isGamePaused = true;
        stopGameLoop();
        
        // Update teks tombol
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.innerHTML = '<span class="btn-icon">▶️</span> RESUME';
        }
        
        // Tampilkan pesan pause
        showPauseMessage();
        
        console.log("Game paused");
    }
}

// Fungsi untuk melanjutkan game
function resumeGame() {
    if (isGamePaused) {
        isGamePaused = false;
        
        // Update teks tombol
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span> PAUSE';
        }
        
        // Sembunyikan pesan pause
        hidePauseMessage();
        
        // Mulai kembali game loop
        if (typeof marioGame !== 'undefined' && marioGame && typeof marioGame.startGame === 'function') {
            gameLoopId = requestAnimationFrame(marioGame.startGame);
        }
        
        console.log("Game resumed");
    }
}

// Fungsi untuk menampilkan pesan pause
function showPauseMessage() {
    // Cek apakah elemen pesan sudah ada
    let pauseMessage = document.querySelector('.pause-message');
    
    if (!pauseMessage) {
        // Buat elemen pesan jika belum ada
        pauseMessage = document.createElement('div');
        pauseMessage.className = 'pause-message';
        pauseMessage.innerHTML = 'GAME PAUSED<br><span style="font-size: 16px">Press PAUSE button to continue</span>';
        document.body.appendChild(pauseMessage);
    }
    
    pauseMessage.style.display = 'block';
}

// Fungsi untuk menyembunyikan pesan pause
function hidePauseMessage() {
    const pauseMessage = document.querySelector('.pause-message');
    if (pauseMessage) {
        pauseMessage.style.display = 'none';
    }
}

// ... fungsi lainnya tetap sama