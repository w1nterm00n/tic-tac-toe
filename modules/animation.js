let leftInput = document.getElementById('playerX_name');
let leftWrapper = document.querySelector('.playerX_wrapper');
let rightInput = document.getElementById('player0_name');
let rightWrapper = document.querySelector('.player0_wrapper');

//поменять чтобы стили привязывались к label
let animation = {
    inputAnimation() {
        function syncRight() {
            if (rightInput.value.trim() === "") {
              rightWrapper.classList.add("input-empty");
            } else {
              rightWrapper.classList.remove("input-empty");
            }
        }
        function syncLeft() {
            if (leftInput.value.trim() === "") {
              leftWrapper.classList.add("input-empty");
            } else {
              leftWrapper.classList.remove("input-empty");
              syncRight();
            }
        }
        syncLeft();
        leftInput.addEventListener("input", syncLeft);
        rightInput.addEventListener("input", syncRight);
    }
}

export default animation;