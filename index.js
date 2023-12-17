// איתור אלמנטים ב DOM
const playerElement = document.getElementById("player");
let btns = document.querySelectorAll(".btn");

// משתנים לניהול מצב המשחק
let currentPlayer = 'X';
let timeoutId;
let timeLeft = 30;
let gameOver = false;
let gameStarted = false;

// עדכון טקסט נוכחי/התחל משחק
function setPlayerText() {
    playerElement.textContent = gameStarted ? `Current Player: ${currentPlayer === 'X' ? 'Player 2' : 'Player 1'}` : 'Starting Game - Player 1';
}

function checkWinner() {
    const lines = [
        [0, 1, 2], // שורה ראשונה
        [3, 4, 5], //  שנייה
        [6, 7, 8], //  שלישית
        [0, 3, 6], // עמודה ראשונה
        [1, 4, 7], //  שנייה
        [2, 5, 8], //  שלישית
        [0, 4, 8], // אלכסון ראשי
        [2, 4, 6], // אלכסון משני
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            btns[a].textContent &&
            btns[a].textContent === btns[b].textContent &&
            btns[a].textContent === btns[c].textContent
        ) {
            gameOver = true;
            clearInterval(timeoutId); // ביטול הטיימר 
            return btns[a].textContent;
        }
    }
    
    return null;
}

// הצגת ניצחון
function displayWinner(winner) {
    playerElement.textContent = `Player ${winner === 'X' ? '1' : '2'} wins!`;
    clearInterval(timeoutId);
}

// בדיקת תיקו
function isDraw() {
    return [...btns].every(btn => btn.textContent !== "");
}

// הצגת תיקו
function displayDraw() {
    playerElement.textContent = "It's a draw!";
    clearInterval(timeoutId);
}



// עדכון הטיימר
function updateTimerDisplay() {
    document.getElementById("timer").textContent = timeLeft;
}


// התחלת הטיימר
function startTurnTimer() {
    clearInterval(timeoutId); // מבטל את הטיימר הקודם
    timeLeft = 30; // איתחול 
    updateTimerDisplay(); // עדכון ל-30 שניות

    timeoutId = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(); // עדכון התצוגה בכל שנייה

        if (timeLeft <= 0) {
            clearInterval(timeoutId); // ביטול הטיימר
            playerElement.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'} loose!`; // עדכון ההודעה
            gameOver = true;
        }
    }, 1000); // מעדכן את הטיימר בכל שנייה
}

//   כאשר הכפתור נלחץ
function btnClick() {
    if (this.textContent !== "" || gameOver) return;

    this.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        displayWinner(winner);
        gameOver = true;
    } else if (isDraw()) {
        displayDraw();
        gameOver = true;
    } else {
        setPlayerText();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        startTurnTimer();
    }
}

//  לחיצה על כפתור האיתחול
document.getElementById("Restart").addEventListener("click", BtnRestart);

//  איתחול משחק חדש
function BtnRestart() {
    btns.forEach(b => {
        b.textContent = "";
    });
    currentPlayer = 'X';
    gameOver = false;
    gameStarted = false;
    setPlayerText();
    startTurnTimer(); 
}

// אירועים לכל הכפתורים בלוח
btns.forEach(b => {
    b.addEventListener("click", function() {
        if (!gameStarted) {
            gameStarted = true;
            currentPlayer = 'X'; //  איפוס השחקן הנוכחי
            setPlayerText();
        }
        btnClick.apply(this);
    });
});


setPlayerText();
