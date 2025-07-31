// DOM元素选择器
const difficultySelect = document.getElementById('difficulty');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-button');
const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const scoreDisplay = document.getElementById('score');
//游戏结束
const gameOverModal = document.getElementById("gameover-box");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// 变量
let leftTime;
let timeID;
let score = 0;
let playing = false;

// 单词库
const words = [
    'hello', 'world', 'javascript', 'programming', 'computer', 'internet',
    'website', 'developer', 'coding', 'software', 'application', 'database',
    'network', 'server', 'client', 'springboot', 'function', 'variable',
    'array', 'object', 'string', 'number', 'boolean', 'null'
]

// 随机单词
function showRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    wordDisplay.textContent = words[randomIndex]
}

//比对单词检查输入
wordInput.addEventListener('input', () => {
    if (playing) {
        if (wordInput.value === wordDisplay.textContent) {
            score++;
            scoreDisplay.textContent = score;
            wordInput.value = '';
            showRandomWord();
        }
    }
})

// 根据选择难度设定时间
function setTimeByDifficulty() {
    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            return 30;
        case 'medium':
            return 20;
        case 'hard':
            return 10;
        default:
            return 20;
    }
}

// 更新倒计时显示
function updateTime() {
    timeDisplay.textContent = leftTime;
}

// 初始化时间显示
function initTimeDisplay() {
    leftTime = setTimeByDifficulty();
    updateTime();
}

// 倒计时功能
function countdown() {
    if (leftTime > 0 && playing) {
        leftTime--;
        updateTime();
        timeID = setTimeout(countdown, 1000);
    } else if (leftTime <= 0) {
        endGame();
    }
}

// 结束游戏
function endGame() {
    playing = false;
    clearTimeout(timeID);
    wordInput.disabled = true;
    wordInput.value = '';
    showGameOver();
}

// 开始游戏
function startGame() {
    if (timeID) {
        clearTimeout(timeID);
    }
    playing = true;
    score = 0;
    scoreDisplay.textContent = score;
    leftTime = setTimeByDifficulty();
    updateTime();
    showRandomWord();
    countdown();
    wordInput.disabled = false;
    wordInput.focus();
}

// 难度改变时重置时间显示
difficultySelect.addEventListener('change', function () {
    if (playing) {
        clearTimeout(timeID);
    }
    leftTime = setTimeByDifficulty();
    updateTime();
});

// 开始按钮点击事件
startButton.addEventListener('click', startGame);

//结束游戏，弹窗显示
function showGameOver() {
    finalScoreDisplay.textContent = score;
    gameOverModal.style.display = "flex";
}

// 关闭弹窗并重新开始游戏
restartButton.addEventListener("click", function () {
    gameOverModal.style.display = "none";
    startGame();
});

// 页面加载时初始化时间显示
window.addEventListener('load', initTimeDisplay);