const COLOR_THEME = "colorTheme";

function setStoredColor() {
  const storedTheme = localStorage.getItem(COLOR_THEME);

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "green");
  }
}

function handleClickOnColor() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  // green yellow blue red
  let nextTheme = "green";
  if (!currentTheme || currentTheme === "green") {
    nextTheme = "yellow";
  }
  if (currentTheme === "yellow") {
    nextTheme = "blue";
  }
  if (currentTheme === "blue") {
    nextTheme = "red";
  }
  if (currentTheme === "red") {
    nextTheme = "green";
  }

  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(COLOR_THEME, nextTheme);
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
