let leftInput = document.getElementById('playerX_name');
let leftSpanPH = document.querySelector('.fp-l');
let rightInput = document.getElementById('player0_name');
let rightSpanPH = document.querySelector('.fp-r');


let animation = {
    inputAnimation() {
        function syncRight() {
            if (rightInput.value.trim() === "") {
              rightSpanPH.classList.add("input-empty");
            } else {
              rightSpanPH.classList.remove("input-empty");
            }
        }
        function syncLeft() {
            if (leftInput.value.trim() === "") {
              leftSpanPH.classList.add("input-empty");
            } else {
              leftSpanPH.classList.remove("input-empty");
              syncRight();
            }
        }
        syncLeft();
        leftInput.addEventListener("input", syncLeft);
        rightInput.addEventListener("input", syncRight);
    }
}

export default animation;