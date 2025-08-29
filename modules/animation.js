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
    }
    //сделать как-то так, чтобы в случае если 
    //оба input-а были заполненны - кнопка play например
    //становилась красного цвета
}

export default animation;