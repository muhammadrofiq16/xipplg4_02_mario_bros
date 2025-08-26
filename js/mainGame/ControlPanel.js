// Control Panel Functions
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
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
        pauseBtn.innerHTML = '<span class="btn-icon">▶️</span> RESUME';
        
        // Tampilkan pesan pause (opsional)
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
        pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span> PAUSE';
        
        // Sembunyikan pesan pause
        hidePauseMessage();
        
        // Mulai kembali game loop
        if (typeof gameLoop === 'function') {
            gameLoopId = requestAnimationFrame(gameLoop);
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
        document.querySelector('.main-wrapper').appendChild(pauseMessage);
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

// Pastikan game loop dapat dihentikan dengan memodifikasi fungsi gameLoop
// Di file MarioGame.js, pastikan game loop menggunakan requestAnimationFrame
// dan menyimpan ID-nya:
// function gameLoop(timestamp) {
//     if (!isGamePaused) {
//         // Logika game loop
//     }
//     gameLoopId = requestAnimationFrame(gameLoop);
// }

function restartGame() {
    if (typeof marioGame !== 'undefined' && marioGame && confirm("Are you sure you want to restart the game?")) {
        marioGame.restartLevel();
    }
}

function openSettings() {
    document.getElementById('settingsModal').style.display = "flex";
}

function openCharacterSelect() {
    document.getElementById('characterModal').style.display = "flex";
}

function openLeaderboard() {
    document.getElementById('leaderboardModal').style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function selectCharacter(element) {
    document.querySelectorAll('.character').forEach(char => {
        char.classList.remove('selected');
    });

    element.classList.add('selected');

    // Change character logic here
    const characterEmoji = element.textContent;
    let characterName = "Mario";

    switch (characterEmoji) {
        case "👨": characterName = "Mario"; break;
        case "👨‍🔧": characterName = "Luigi"; break;
        case "👸": characterName = "Princess"; break;
        case "🍄": characterName = "Toad"; break;
    }

    // Update game character
    if (typeof marioGame !== 'undefined' && marioGame && marioGame.mario) {
        // Add character change logic here
        console.log(`Character changed to ${characterName}`);
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullScreenChange);
document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
document.addEventListener('msfullscreenchange', handleFullScreenChange);

function handleFullScreenChange() {
    // You can add logic to handle UI changes when fullscreen mode changes
    const isFullScreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );

    console.log(`Fullscreen mode: ${isFullScreen ? 'ON' : 'OFF'}`);
}