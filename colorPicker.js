var arrColors = ["#F9F0C1", "#C0ECCC", "#A5C8E4", "#F6A8A6"];
var currentColor = 0;
var nextColor = 1;

function updateDOMcolors() {
  document.body.style.backgroundColor = arrColors[currentColor];
  document.getElementById("circle").style.fill = arrColors[nextColor];
}

updateDOMcolors();

function generateColorPicker() {
  console.log("generateColorPicker");
}

function handleClickOnColor() {
  currentColor = nextColor;
  nextColor = nextColor + 1;
  if (nextColor === 4) {
    nextColor = 0;
  }
  updateDOMcolors();
}
