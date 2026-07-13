// Inline SVG icons returned as DOM nodes. Keeps the app asset-free.
function svg(paths, { size = 18, fill = "none", stroke = "currentColor" } = {}) {
  const ns = "http://www.w3.org/2000/svg";
  const el = document.createElementNS(ns, "svg");
  el.setAttribute("viewBox", "0 0 24 24");
  el.setAttribute("width", size);
  el.setAttribute("height", size);
  el.setAttribute("fill", fill);
  el.setAttribute("stroke", stroke);
  el.setAttribute("stroke-width", "2");
  el.setAttribute("stroke-linecap", "round");
  el.setAttribute("stroke-linejoin", "round");
  el.innerHTML = paths;
  return el;
}

export const icons = {
  search: (o) => svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', o),
  star: (o) =>
    svg('<path d="M12 2 15 9l7 .5-5.3 4.6L18.5 21 12 17l-6.5 4 1.8-6.9L2 9.5 9 9z"/>', o),
  starFilled: (o) =>
    svg('<path d="M12 2 15 9l7 .5-5.3 4.6L18.5 21 12 17l-6.5 4 1.8-6.9L2 9.5 9 9z"/>', {
      ...o,
      fill: "currentColor",
    }),
  copy: (o) =>
    svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>', o),
  download: (o) => svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>', o),
  external: (o) =>
    svg('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v7H3V3h7"/>', o),
  link: (o) =>
    svg('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>', o),
  trash: (o) => svg('<path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"/>', o),
  sun: (o) =>
    svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3-7-1.5 1.5M6.5 17.5 5 19m0-14 1.5 1.5M17.5 17.5 19 19"/>', o),
  moon: (o) => svg('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>', o),
  x: (o) => svg('<path d="M18 6 6 18M6 6l12 12"/>', o),
};
