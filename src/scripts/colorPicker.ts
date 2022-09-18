const arrColors: string[] = ["#C0ECCC", "#F9F0C1", "#A5C8E4", "#F6A8A6"]; // green yellow blue red
const hoverColors: string[] = ["#007f00", "#877800", "#00007F", "#610d0a"]; // green yellow blue red
let currentColor = 0;
let nextColor = 1;

function updateDOMcolors() {
  if (typeof window !== "undefined" && document) {
    const backgroundColor = arrColors[currentColor] as string;
    const nextBackgroundColor = hoverColors[nextColor] as string;
    const hoverColor = hoverColors[currentColor] as string;

    // console.log("🍕", {
    //   currentColor,
    //   nextColor,
    //   backgroundColor,
    //   nextBackgroundColor,
    //   hoverColor,
    // });

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.setProperty("--hoverColor", hoverColor);
    (document.getElementById("circle") as HTMLElement).style.fill =
      nextBackgroundColor;

    if (currentColor === 0) {
      document.body.style.setProperty("--filterEffect", "none");
    }
    if (currentColor === 1) {
      // yellow
      document.body.style.setProperty("--filterEffect", "hue-rotate(300deg)");
    }
    if (currentColor === 2) {
      // blue
      document.body.style.setProperty("--filterEffect", "hue-rotate(90deg)");
    }
    if (currentColor === 3) {
      console.log("RED");
      // red
      document.body.style.setProperty("--filterEffect", "hue-rotate(220deg)");
    }
  }
}

function handleClickOnColor() {
  currentColor = nextColor;
  nextColor = nextColor + 1;
  if (nextColor === 4) {
    nextColor = 0;
  }
  updateDOMcolors();
}

function addListener() {
  if (typeof window !== "undefined") {
    document
      .querySelector("#circle-container")
      ?.addEventListener("click", function () {
        handleClickOnColor();
      });
    // updateDOMcolors();
    clearInterval(addListenerInterval);
  }
}

const addListenerInterval = setInterval(() => {
  addListener();
}, 100);

export {};
