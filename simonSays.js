let h4 = document.querySelector('h4');
let btn = document.querySelectorAll('.div');

let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let h2 = document.createElement('h2');
document.querySelector('body').prepend(h2);

let started = false;
let level = 0;

let btns = ['red', 'green', 'yellow', 'purple'];


document.addEventListener("keypress", function (event) {
    if(started == false) {
        console.log("Game is Stated");
        started = true;
        levelUp();
    }
    
});

function buttonFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove('flash')
    },250);
}


function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove('userFlash')
    },200)
}


function levelUp() {
    userSeq = [];
    level = level+1
    h4.innerText = `Level ${level}`;
    
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    buttonFlash(randomBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else {
        if(started == true) {
            let score = level;
            if(highestScore > level) {
                h2.innerText = `Highest Score: ${highestScore}`
            }else {
                highestScore = level;
                h2.innerText = `Highest Score: ${score}`;
            }
        }
        h4.innerHTML = `Game Over! Your Score is <b>${level}</b> Press any key to restart game.`;
        let body = document.querySelector('body');
        body.classList.add('gameOver');
        setTimeout(function () {
            body.classList.remove('gameOver')
        },200);
        reset();
    };
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute('id')
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll('.div');
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}