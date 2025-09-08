// Control Panel Functions
let selectedCharacter = 'mario';
let currentGameInstance = null;

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
    // Dapatkan instance game yang sedang berjalan
    const marioMakerInstance = MarioMaker.getInstance();
    if (marioMakerInstance && marioMakerInstance.currentGame) {
        const gameInstance = marioMakerInstance.currentGame;
        if (gameInstance.togglePause) {
            gameInstance.togglePause();
            
            const pauseBtn = document.getElementById('pauseBtn');
            if (pauseBtn) {
                if (gameInstance.isPaused) {
                    pauseBtn.innerHTML = '<span class="btn-icon">▶️</span> RESUME';
                } else {
                    pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span> PAUSE';
                }
            }
        }
    }
}

function restartGame() {
    if (confirm("Are you sure you want to restart the game?")) {
        const marioMakerInstance = MarioMaker.getInstance();
        if (marioMakerInstance && marioMakerInstance.currentGame) {
            marioMakerInstance.currentGame.restartLevel();
        }
    }
}

function openSettings() {
    document.getElementById('settingsModal').style.display = "flex";
}

function openCharacterSelect() {
    document.getElementById('characterModal').style.display = "flex";
    updateCharacterPreview();
}

function openLeaderboard() {
    document.getElementById('leaderboardModal').style.display = "flex";
    populateLeaderboard();
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function selectCharacter(element, characterName) {
    // Remove selected class from all characters
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked character
    element.classList.add('selected');
    selectedCharacter = characterName;
    
    updateCharacterPreview();
}

function updateCharacterPreview() {
    const previewIcon = document.getElementById('previewIcon');
    const previewName = document.getElementById('previewName');
    const previewAbility = document.getElementById('previewAbility');
    
    const characterData = {
        mario: { icon: '👨', name: 'Mario', ability: 'All-Around Abilities' },
        luigi: { icon: '👨‍🔧', name: 'Luigi', ability: 'Higher Jump Abilities' },
        peach: { icon: '👸', name: 'Princess Peach', ability: 'Floating Abilities' },
        toad: { icon: '🍄', name: 'Toad', ability: 'Faster Running Abilities' }
    };
    
    const data = characterData[selectedCharacter];
    if (data) {
        previewIcon.textContent = data.icon;
        previewName.textContent = data.name;
        previewAbility.textContent = data.ability;
    }
}

function confirmCharacter() {
    // Set global character variable
    if (typeof setCharacter === 'function') {
        setCharacter(selectedCharacter);
    }
    
    // Update current character if game is running
    currentCharacter = selectedCharacter;
    
    showToast(`Character changed to ${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)}`);
    closeModal('characterModal');
}

function saveSettings() {
    const soundVolume = document.getElementById('soundVolume').value;
    const musicVolume = document.getElementById('musicVolume').value;
    const controlType = document.getElementById('controlType').value;
    const difficulty = document.getElementById('difficulty').value;
    
    // Save settings to localStorage
    localStorage.setItem('gameSettings', JSON.stringify({
        soundVolume,
        musicVolume,
        controlType,
        difficulty
    }));
    
    showToast('Settings saved successfully!');
    closeModal('settingsModal');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function changeLeaderboardTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    populateLeaderboard(tab);
}

function populateLeaderboard(tab = 'global') {
    const leaderboardList = document.getElementById('leaderboardList');
    
    // Sample leaderboard data
    const leaderboardData = {
        global: [
            { rank: 1, player: 'SuperMario64', score: '50,420', level: '8-4' },
            { rank: 2, player: 'PrincessSaver', score: '48,220', level: '8-3' },
            { rank: 3, player: 'KoopaKiller', score: '45,890', level: '8-2' },
            { rank: 4, player: 'CoinMaster', score: '43,560', level: '7-4' },
            { rank: 5, player: 'FireFlowerFan', score: '41,200', level: '7-3' }
        ],
        friends: [
            { rank: 1, player: 'Luigi_Bro', score: '12,340', level: '4-2' },
            { rank: 2, player: 'Peach_Player', score: '11,820', level: '4-1' },
            { rank: 3, player: 'Toad_Runner', score: '10,950', level: '3-4' }
        ],
        weekly: [
            { rank: 1, player: 'WeeklyChamp', score: '25,670', level: '6-3' },
            { rank: 2, player: 'SpeedRunner92', score: '24,440', level: '6-2' },
            { rank: 3, player: 'ClassicGamer', score: '23,120', level: '6-1' }
        ]
    };
    
    const data = leaderboardData[tab] || leaderboardData.global;
    
    leaderboardList.innerHTML = '';
    data.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <span>#${entry.rank}</span>
            <span>${entry.player}</span>
            <span>${entry.score}</span>
            <span>${entry.level}</span>
        `;
        leaderboardList.appendChild(item);
    });
}

// Load settings on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        document.getElementById('soundVolume').value = settings.soundVolume || 80;
        document.getElementById('musicVolume').value = settings.musicVolume || 70;
        document.getElementById('controlType').value = settings.controlType || 'Keyboard';
        document.getElementById('difficulty').value = settings.difficulty || 'normal';
        
        // Update display values
        document.getElementById('soundValue').textContent = (settings.soundVolume || 80) + '%';
        document.getElementById('musicValue').textContent = (settings.musicVolume || 70) + '%';
    }
    
    // Add slider event listeners
    const soundSlider = document.getElementById('soundVolume');
    const musicSlider = document.getElementById('musicVolume');
    
    if (soundSlider) {
        soundSlider.addEventListener('input', function() {
            document.getElementById('soundValue').textContent = this.value + '%';
        });
    }
    
    if (musicSlider) {
        musicSlider.addEventListener('input', function() {
            document.getElementById('musicValue').textContent = this.value + '%';
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
});

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