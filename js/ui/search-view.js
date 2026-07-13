// The main search box: input + validation + lookup trigger + aggregator select.
import { h } from "../dom.js";
import { icons } from "./icons.js";
import { isValidBlobId, normalizeBlobInput } from "../utils/validate-blob-id.js";
import { renderAggregatorSelect } from "./aggregator-select.js";

export function renderSearch({ initialValue = "", onLookup } = {}) {
  const input = h("input", {
    class: "input",
    type: "text",
    spellcheck: "false",
    autocapitalize: "off",
    autocomplete: "off",
    placeholder: "Paste a Walrus Blob ID (43 chars) or aggregator URL…",
    value: initialValue,
    "aria-label": "Walrus Blob ID",
  });

  const button = h(
    "button",
    { class: "btn btn--primary", type: "submit" },
    icons.search({ size: 16 }),
    "Look up",
  );

  function submit() {
    const blobId = normalizeBlobInput(input.value);
    input.value = blobId;
    if (!isValidBlobId(blobId)) {
      input.classList.add("input--invalid");
      return;
    }
    input.classList.remove("input--invalid");
    onLookup?.(blobId);
  }

  input.addEventListener("input", () => input.classList.remove("input--invalid"));

  const form = h(
    "form",
    { class: "search", onsubmit: (e) => (e.preventDefault(), submit()) },
    h("div", { class: "search__label" }, "Explore a Walrus blob"),
    h(
      "div",
      { class: "search__hint" },
      "Read any blob from a public Walrus aggregator and preview it below.",
    ),
    h("div", { class: "search__field" }, input, button),
    h(
      "div",
      { class: "search__meta" },
      renderAggregatorSelect(),
      h("span", { class: "spacer" }),
      h("span", { class: "badge badge--brand" }, h("span", { class: "badge__dot" }), "read-only"),
    ),
  );

  return { el: form, focus: () => input.focus(), setValue: (v) => (input.value = v) };
}
