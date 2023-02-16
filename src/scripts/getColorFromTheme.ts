import type { ColorTheme } from "../types/theme";

export function getColorFromTheme(theme: ColorTheme) {
  switch (theme) {
    case "green":
      return "#007f00";
    case "yellow":
      return "#877800";
    case "blue":
      return "#00007f";
    case "red":
      return "#610d0a";
  }
}
