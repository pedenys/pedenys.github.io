var arrColors = ["#C0ECCC", "#F9F0C1", "#A5C8E4", "#F6A8A6"];
var hoverColors = ["#610d0a", "#007f00", "#877800", "#00007F"];
var currentColor = 0;
var nextColor = 1;

function updateDOMcolors() {
  document.body.style.backgroundColor = arrColors[currentColor];
  document.getElementById("circle").style.fill = arrColors[nextColor];
  document.body.style.setProperty("--hoverColor", hoverColors[nextColor]);
}

updateDOMcolors();

function handleClickOnColor() {
  currentColor = nextColor;
  nextColor = nextColor + 1;
  if (nextColor === 4) {
    nextColor = 0;
  }
  updateDOMcolors();
}
