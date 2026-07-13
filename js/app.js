// Application entry point: builds the shell, wires routing, and orchestrates
// lookups across the search box, preview card, history and favorites panels.
import { h, mount, $ } from "./dom.js";
import { initTheme } from "./ui/theme.js";
import { renderHeader } from "./ui/header.js";
import { renderFooter } from "./ui/footer.js";
import { renderSearch } from "./ui/search-view.js";
import { renderSamples } from "./ui/samples.js";
import { renderHistoryPanel } from "./ui/history-panel.js";
import { renderFavoritesPanel } from "./ui/favorites-panel.js";
import { renderPreviewCard, renderLoading, renderError } from "./ui/preview-view.js";
import { fetchBlob, BlobFetchError } from "./fetcher.js";
import { addHistory } from "./storage/history.js";
import { parseHash, goToBlob, onRouteChange } from "./router.js";
import { initShortcuts } from "./ui/shortcuts.js";
import { toast } from "./ui/toast.js";
import { t, initLang } from "./i18n.js";

let currentController = null;

async function loadBlob(blobId, { previewSlot, panels }) {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  mount(previewSlot, renderLoading());
  try {
    const result = await fetchBlob(blobId, { signal: currentController.signal });
    const card = await renderPreviewCard(result, blobId);
    mount(previewSlot, card);
    addHistory({ blobId, contentType: result.contentType, size: result.size });
    panels.history.refresh();
    panels.favorites.refresh();
  } catch (err) {
    if (err && err.name === "AbortError") return;
    const msg =
      err instanceof BlobFetchError ? t(`error.${err.code}`, err.params) : t("error.unexpected");
    mount(previewSlot, renderError(msg));
    toast(msg, "error");
  }
}

export async function boot(samples = []) {
  initTheme();
  initLang();

  const root = $("#app");
  const previewSlot = h("div", { id: "preview-slot" });

  const open = (blobId) => goToBlob(blobId);

  const search = renderSearch({ onLookup: open });
  const history = renderHistoryPanel({ onOpen: open });
  const favorites = renderFavoritesPanel({ onOpen: open });
  const panels = { history, favorites };

  const main = h(
    "main",
    { class: "container" },
    search.el,
    previewSlot,
    favorites.el,
    history.el,
    renderSamples(samples, { onOpen: open }),
  );

  mount(root, renderHeader(), main, renderFooter());

  function handleRoute(state) {
    if (state.route === "blob") {
      search.setValue(state.blobId);
      loadBlob(state.blobId, { previewSlot, panels });
    } else {
      mount(previewSlot);
      search.focus();
    }
  }

  initShortcuts({ focusSearch: () => search.focus() });
  onRouteChange(handleRoute);
  handleRoute(parseHash());
}
