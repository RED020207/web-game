const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.2;
groundPosition = 3 * canvas.height / 4;
const jumpStrength = 6;
const maxJumps = 2;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

player = {x: 50, y: canvas.height / 2, width: 50, height: 50, speed: 3, image: new Image(), velocityY: 0, isGrounded: false, jumpsRemaining: 0};
fireball = {x: canvas.width - 70, y: player.y - (70 - player.height), width: 70, height: 70, speed: 3, image: new Image()};

keys = {ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false};
window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
    if (event.key === 'ArrowUp' && player.jumpsRemaining > 0){
        player.velocityY = -jumpStrength;
        player.jumpsRemaining--;
    }
    console.log('Key pressed:', event.key);
});

window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
});

let score = 0;
let level = 1;

function checkCollision(sprite1, sprite2) {
    return (sprite1.x < sprite2.x + sprite2.width && sprite1.x + sprite1.width > sprite2.x && sprite1.y < sprite2.y + sprite2.height && sprite1.y + sprite1.height > sprite2.y);
}

function update() {
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (keys.ArrowLeft) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight) {
        player.x += player.speed;
    }
    if (player.y < 0)
        player.y = 0;
    if (player.x < 0)
        player.x = 0;
    if (player.x + player.width > window.innerWidth)
        player.x -= player.speed;
    if (player.y + player.height >= groundPosition) {
        player.velocityY = 0;
        player.isGrounded = true;
        player.y = groundPosition - player.height;
        player.jumpsRemaining = maxJumps;
    }
    else
        player.isGrounded = false;
    if (checkCollision(player, fireball)) {
        player.x = 50;
        player.y = canvas.height / 2;
        player.velocityY = 0;
        player.isGrounded = true;
        player.jumpsRemaining = maxJumps;
        fireball.x = canvas.width - 70;
        fireball.y = groundPosition - 3 * Math.floor(Math.random() * (player.height + jumpStrength + 1));
        if (score > 0)
            score--;
    }
    else if (fireball.x < 0) {
        fireball.x = canvas.width - 70;
        fireball.y = groundPosition - 3 * Math.floor(Math.random() * (player.height + jumpStrength));
        score++;
        fireball.speed++;
    }
    else
        fireball.x -= fireball.speed;
    if (score >= 6)
        fireball.speed = 0;
    console.log('Updating position');
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
    ctx.drawImage(fireball.image, fireball.x, fireball.y, fireball.width, fireball.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.fillText('Score: ' + score, 5, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

player.image.onload = () => {
    gameLoop();
};

player.image.src = 'MCBIG.png';
fireball.image.src = 'FireBall.png';
