let leftInput = document.getElementById('playerX_name');
let leftWrapper = document.querySelector('.playerX_wrapper');
let rightInput = document.getElementById('player0_name');
let rightWrapper = document.querySelector('.player0_wrapper');
let startBtn = document.getElementById('start_btn');

let animation = {
    inputAnimation() {
        function syncRight() {
            if ((leftInput.value.trim() !== "") 
                && (rightInput.value.trim() !== "")) {
                animation.animateStartBtn();
            }
            if (rightInput.value.trim() === "") {
              rightWrapper.classList.add("input-empty");
              animation.setStartBtnDisabled();
            } else {
              rightWrapper.classList.remove("input-empty");
            }
        }
        function syncLeft() {
            if (leftInput.value.trim() === "") {
              leftWrapper.classList.add("input-empty");
              animation.setStartBtnDisabled();
            } else {
              leftWrapper.classList.remove("input-empty");
              syncRight();
            }
        }
        syncLeft();
        leftInput.addEventListener("input", syncLeft);
        rightInput.addEventListener("input", syncRight);
    },

    setStartBtnDisabled() {
        startBtn.disabled = true;
        startBtn.classList.remove("animatedBtn");
    },

    animateStartBtn(){
        startBtn.disabled = false;
        startBtn.classList.add("animatedBtn");
    },
    removeStartBtnAnimation(){
        startBtn.classList.remove("animatedBtn");
    },
    showConfetti(){
      const duration = 2000;
      const end = Date.now() + duration;

      (function frame() {
        // два источника по краям, имитация взрывов
        confetti({ particleCount: 2, angle: 60, spread: 75, origin: { x: 0 } });
        confetti({ particleCount: 2, angle: 120, spread: 75, origin: { x: 1 } });

        // случайные “взрывы” вверху
        confetti({
          particleCount: 30,
          spread: 60,
          startVelocity: 45,
          ticks: 120,
          origin: { x: Math.random(), y: Math.random() * 0.3 }
        });

        if (Date.now() < end) requestAnimationFrame(frame);
        })();
    }
}

export default animation;