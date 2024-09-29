import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getUrl({
  language,
  origin,
  pathname,
}: {
  language: string;
  origin: string;
  pathname: string;
}) {
  if (language === "fr") {
    if (pathname.includes("/fr/")) {
      return `${origin}${pathname.replace("/fr/", "/en/")}`;
    }

    if (pathname === "/fr" || !pathname) {
      return `${origin}`;
    }

    return `${origin}${pathname}`;
  }

  if (language === "en") {
    if (pathname.includes("/en/")) {
      return `${origin}${pathname.replace("/en/", "/fr/")}`;
    }

    if (pathname === "/" || !pathname) {
      return `${origin}/fr`;
    }

    return `${origin}/fr${pathname}`;
  }
}
