// Dropdown to pick the active aggregator, with a "custom endpoint" option.
import { h } from "../dom.js";
import {
  listAggregators,
  getActiveAggregatorId,
  setActiveAggregatorId,
  setCustomAggregator,
} from "../aggregator.js";
import { openModal } from "./modal.js";
import { toast } from "./toast.js";

export function renderAggregatorSelect(onChange) {
  const select = h("select", { class: "input", style: "flex:0 0 auto;width:auto" });

  function repaint() {
    select.replaceChildren();
    for (const agg of listAggregators()) {
      const opt = h("option", { value: agg.id }, agg.label);
      if (agg.id === getActiveAggregatorId()) opt.selected = true;
      select.appendChild(opt);
    }
    select.appendChild(h("option", { value: "__custom__" }, "Custom endpoint…"));
  }
  repaint();

  select.addEventListener("change", () => {
    if (select.value === "__custom__") {
      promptCustom(() => {
        repaint();
        onChange?.();
      });
      return;
    }
    setActiveAggregatorId(select.value);
    onChange?.();
  });

  return h(
    "label",
    { class: "row", style: "gap:6px" },
    h("span", { class: "search__hint" }, "Aggregator"),
    select,
  );
}

function promptCustom(done) {
  const input = h("input", {
    class: "input",
    placeholder: "https://my-aggregator.example",
    value: "",
  });
  openModal({
    title: "Custom aggregator endpoint",
    body: h(
      "div",
      { class: "stack" },
      h("p", { class: "search__hint" }, "Base URL of a Walrus aggregator (no trailing /v1)."),
      input,
    ),
    actions: [
      { label: "Cancel", onClick: (close) => close() },
      {
        label: "Save",
        variant: "primary",
        onClick: (close) => {
          const url = input.value.trim();
          if (!/^https?:\/\//.test(url)) {
            toast("Enter a valid http(s) URL.", "error");
            return;
          }
          setCustomAggregator(url);
          setActiveAggregatorId("custom");
          toast("Custom aggregator saved.", "success");
          close();
          done?.();
        },
      },
    ],
  });
}
