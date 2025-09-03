let leftInput = document.getElementById('playerX_name') as HTMLInputElement;
let leftWrapper = document.querySelector('.playerX_wrapper') as HTMLElement;
let rightInput = document.getElementById('player0_name') as HTMLInputElement;
let rightWrapper = document.querySelector('.player0_wrapper') as HTMLElement;
let startBtn = document.getElementById('start_btn') as HTMLButtonElement;

let animation = {
    inputAnimation(): void {
        function syncRight(): void {
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
        function syncLeft(): void {
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

    setStartBtnDisabled(): void {
        startBtn.disabled = true;
        startBtn.classList.remove("animatedBtn");
    },

    animateStartBtn(): void {
        startBtn.disabled = false;
        startBtn.classList.add("animatedBtn");
    },

    removeStartBtnAnimation(): void {
        startBtn.classList.remove("animatedBtn");
    },

    showConfetti(): void {
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