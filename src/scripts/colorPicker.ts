import type { ColorTheme } from "../types/theme";
import { getColorFromTheme } from "./getColorFromTheme";

const COLOR_THEME = "colorTheme";

function setStoredColor() {
  const storedTheme = localStorage.getItem(COLOR_THEME) as ColorTheme | null;

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
    updateMetaThemeColor(storedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "green");
    updateMetaThemeColor("green");
  }
}

function updateMetaThemeColor(theme: ColorTheme) {
  const currentMetaTag = document.querySelector('meta[name="theme-color"]');
  const color = getColorFromTheme(theme);
  if (currentMetaTag) {
    currentMetaTag.setAttribute("content", color);
  }
}

function handleClickOnColor() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // order : green yellow blue red
  let nextTheme: ColorTheme = "green";
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

  updateMetaThemeColor(nextTheme);

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
  }
}

addListener();

export {};
