// The main search box: input + validation + lookup trigger + aggregator select.
import { h } from "../dom.js";
import { icons } from "./icons.js";
import { isValidBlobId, normalizeBlobInput } from "../utils/validate-blob-id.js";
import { renderAggregatorSelect } from "./aggregator-select.js";
import { t } from "../i18n.js";

export function renderSearch({ initialValue = "", onLookup } = {}) {
  const input = h("input", {
    class: "input",
    type: "text",
    spellcheck: "false",
    autocapitalize: "off",
    autocomplete: "off",
    placeholder: t("search.placeholder"),
    value: initialValue,
    "aria-label": "Walrus Blob ID",
  });

  const button = h(
    "button",
    { class: "btn btn--primary", type: "submit" },
    icons.search({ size: 16 }),
    t("search.button"),
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
    h("div", { class: "search__label" }, t("search.title")),
    h("div", { class: "search__hint" }, t("search.hint")),
    h("div", { class: "search__field" }, input, button),
    h(
      "div",
      { class: "search__meta" },
      renderAggregatorSelect(),
      h("span", { class: "spacer" }),
      h(
        "span",
        { class: "badge badge--brand" },
        h("span", { class: "badge__dot" }),
        t("search.readonly"),
      ),
    ),
  );

  return { el: form, focus: () => input.focus(), setValue: (v) => (input.value = v) };
}
