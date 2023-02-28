"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) => {
      el.addEventListener("click", toggleTheme);
    });
    if (typeof window !== "undefined") {
      (function (theme = localStorage.getItem("theme")) {
        if (theme) {
          document.documentElement.setAttribute("data-theme", theme);
          const toggleElt = document.querySelector("[data-toggle-theme]");
          if (toggleElt) {
            (toggleElt as HTMLInputElement).checked = theme != "light";
          }
        }
      })();
    }

    return () =>
      [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) =>
        el.removeEventListener("click", toggleTheme)
      );
  }, []);

  return null;
}

function toggleTheme(evt: any) {
  var themesList = evt.target.getAttribute("data-toggle-theme");
  if (themesList) {
    var themesArray = themesList.split(",");
    if (document.documentElement.getAttribute("data-theme") == themesArray[0]) {
      if (themesArray.length == 1) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("theme");
      } else {
        document.documentElement.setAttribute("data-theme", themesArray[1]);
        localStorage.setItem("theme", themesArray[1]);
      }
    } else {
      document.documentElement.setAttribute("data-theme", themesArray[0]);
      localStorage.setItem("theme", themesArray[0]);
    }
  }
}
