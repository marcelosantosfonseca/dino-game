const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let isGameOver = false;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
        jump();
        //console.log('Pressionou tecla espaço');
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 250) {
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 20);

        }else {    
        //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 10 /* <= Velocidade do salto*/    );
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1500;  //Posição de Surgimento de novos cactos. Ideal pega escalada tela.
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;
    
    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px'; //Novos cactos = 1500px;
    background.appendChild(cactus);

    let leftInterval = setInterval(() =>{
        cactusPosition -= 50;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -120) {
            clearInterval(leftInterval);
            background.removeChild(cactus);

        } else if (cactusPosition > 150 && cactusPosition < 200 && position < 200){

            //Game Over
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = '<h1 class = "game-over" > GAME OVER </h1>';




        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 100 /* <= Velocidade dos cactos*/ );
    setTimeout(createCactus, randomTime);//recursividade
    
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

console.log(dino);
