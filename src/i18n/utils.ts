import { ui, defaultLang } from "./ui";


export function useTranslations() {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui["fr"][key] || ui[defaultLang][key];
  };
}


