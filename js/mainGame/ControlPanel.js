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

function togglePause() {
    if (typeof marioGame !== 'undefined' && marioGame) {
        if (marioGame.isPaused) {
            marioGame.resumeGame();
            document.getElementById('pauseBtn').innerHTML = '<span class="btn-icon">⏸️</span> PAUSE';
        } else {
            marioGame.pauseGame();
            document.getElementById('pauseBtn').innerHTML = '<span class="btn-icon">▶️</span> RESUME';
        }
    }
}

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