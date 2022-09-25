const arrColors: string[] = ["#C0ECCC", "#F9F0C1", "#A5C8E4", "#F6A8A6"]; // green yellow blue red
const hoverColors: string[] = ["#007f00", "#877800", "#00007F", "#610d0a"]; // green yellow blue red
const fillColors: string[] = ["#C0ECCC", "#F9F0C1", "#A5C8E4", "#F6A8A6"]; // green yellow blue red

const CURRENT_COLOR_NUMBER_LOCAL_STORAGE_ITEM = "currentColorNumber";

let currentColor = 0;
let nextColor = 1;

function setStoredColor() {
  const storedColor = localStorage.getItem(
    CURRENT_COLOR_NUMBER_LOCAL_STORAGE_ITEM
  );

  if (typeof storedColor === "string") {
    // 1. set currentColor as storedColor
    // 2. update nextColor as storedColor + 1
    updateCurrentAndNextColor(Number(storedColor));
    // 3. paint DOM
    const backgroundColor = arrColors[currentColor] as string;
    const nextBackgroundColor = fillColors[nextColor] as string;
    const hoverColor = hoverColors[currentColor] as string;

    updateDOMcolors({ backgroundColor, nextBackgroundColor, hoverColor });
  }
}

function storeColor(currentColorNumber: number) {
  localStorage.setItem(
    CURRENT_COLOR_NUMBER_LOCAL_STORAGE_ITEM,
    currentColorNumber.toString()
  );
}

function updateDOMcolors({
  backgroundColor,
  nextBackgroundColor,
  hoverColor,
}: {
  backgroundColor: string;
  nextBackgroundColor: string;
  hoverColor: string;
}) {
  if (typeof window !== "undefined" && document) {
    console.log("🍕", {
      currentColor,
      nextColor,
      backgroundColor,
      nextBackgroundColor,
      hoverColor,
    });

    document.body.style.setProperty("--tintColor", backgroundColor);
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
    storeColor(currentColor);
  }
}
function updateCurrentAndNextColor(newColorNumber?: number) {
  if (typeof newColorNumber === "number") {
    currentColor = newColorNumber;
    nextColor = newColorNumber + 1;
    if (nextColor > 4) {
      nextColor = 0;
    }
    return;
  }

  currentColor = nextColor;
  nextColor = nextColor + 1;
  if (nextColor > 4) {
    nextColor = 0;
  }
}

function handleClickOnColor() {
  updateCurrentAndNextColor();

  const backgroundColor = arrColors[currentColor] as string;
  const nextBackgroundColor = fillColors[nextColor] as string;
  const hoverColor = hoverColors[currentColor] as string;

  updateDOMcolors({ backgroundColor, nextBackgroundColor, hoverColor });
}

function addListener() {
  if (typeof window !== "undefined") {
    setStoredColor();
    document
      .querySelector("#circle-container")
      ?.addEventListener("click", function () {
        handleClickOnColor();
      });

    // clearInterval(addListenerInterval);
  }
}

// const addListenerInterval = setInterval(() => {
addListener();
// }, 100);

export {};
