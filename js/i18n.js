// Lightweight i18n — EN (default) and TR dictionaries with {param} interpolation.
// The app deliberately opens in English; the header toggle persists the choice.
import { STORAGE_KEYS } from "./config.js";

export const LANGS = ["en", "tr"];
export const DEFAULT_LANG = "en";

export const dictionaries = {
  en: {
    "header.tag": "decentralized storage",
    "header.about": "About",
    "header.theme": "Toggle theme",
    "header.langLabel": "TR",
    "header.langTitle": "Türkçe'ye geç",

    "search.title": "Explore a Walrus blob",
    "search.hint": "Read any blob from a public Walrus aggregator and preview it below.",
    "search.placeholder": "Paste a Walrus Blob ID (43 chars) or aggregator URL…",
    "search.button": "Look up",
    "search.aggregator": "Aggregator",
    "search.readonly": "read-only",

    "agg.custom": "Custom endpoint…",
    "agg.modalTitle": "Custom aggregator endpoint",
    "agg.modalHint": "Base URL of a Walrus aggregator (no trailing /v1).",
    "agg.cancel": "Cancel",
    "agg.save": "Save",
    "agg.invalidUrl": "Enter a valid http(s) URL.",
    "agg.saved": "Custom aggregator saved.",

    "history.title": "Recent lookups",
    "history.empty": "No lookups yet — try a sample below.",
    "history.clear": "Clear history",
    "history.remove": "Remove",

    "fav.title": "Favorites",
    "fav.unpin": "Unpin",

    "samples.title": "Try a sample blob",

    "preview.title": "Preview",
    "preview.blobId": "Blob ID",
    "preview.type": "Type",
    "preview.size": "Size",
    "preview.aggregator": "Aggregator",
    "preview.favTitle": "Toggle favorite",
    "preview.copyId": "Copy Blob ID",
    "preview.copyLink": "Copy shareable link",
    "preview.openRaw": "Open raw",
    "preview.download": "Download",
    "preview.loading": "Fetching blob…",
    "preview.idCopied": "Blob ID copied.",
    "preview.linkCopied": "Shareable link copied.",
    "preview.copyFailed": "Copy failed.",
    "preview.pinned": "Pinned to favorites.",
    "preview.unpinned": "Removed from favorites.",
    "preview.textTooLarge": "Text is too large to preview inline ({size}). Use “Open raw”.",
    "preview.jsonTooLarge": "JSON is too large to preview ({size}).",
    "preview.noInline": "No inline preview for {type}.",
    "preview.useDownload": "{size} · use “Download” or “Open raw”.",

    "error.network": "Network error reaching {label} aggregator.",
    "error.notFound": "Blob not found on this aggregator.",
    "error.http": "Aggregator returned HTTP {status}.",
    "error.unexpected": "Unexpected error while loading the blob.",

    "about.title": "About Walrus Blob Explorer",
    "about.desc1": "A tiny, dependency-free client for reading blobs from ",
    "about.desc2": " decentralized storage.",
    "about.hint": "Paste a Blob ID, pick an aggregator, and preview the content.",
    "about.li1": "🔒 Read-only — never writes to Walrus.",
    "about.li2": "🧳 History & favorites stay in your browser.",
    "about.li3": "⌨️ Press “/” to focus search, “Esc” to go home.",
    "about.builtBy": "Built by",
    "about.copyHint": "(click to copy)",
    "about.suiCopied": "Sui address copied.",
    "about.close": "Close",

    "footer.tagline": "read-only client for Walrus storage",
    "footer.source": "source",
  },

  tr: {
    "header.tag": "merkeziyetsiz depolama",
    "header.about": "Hakkında",
    "header.theme": "Temayı değiştir",
    "header.langLabel": "EN",
    "header.langTitle": "Switch to English",

    "search.title": "Bir Walrus blob'unu keşfet",
    "search.hint": "Herkese açık bir Walrus aggregator'ından blob oku ve aşağıda önizle.",
    "search.placeholder": "Walrus Blob ID (43 karakter) veya aggregator URL'si yapıştır…",
    "search.button": "Ara",
    "search.aggregator": "Aggregator",
    "search.readonly": "salt-okunur",

    "agg.custom": "Özel uç nokta…",
    "agg.modalTitle": "Özel aggregator uç noktası",
    "agg.modalHint": "Bir Walrus aggregator'ının temel URL'si (sonda /v1 olmadan).",
    "agg.cancel": "İptal",
    "agg.save": "Kaydet",
    "agg.invalidUrl": "Geçerli bir http(s) URL'si gir.",
    "agg.saved": "Özel aggregator kaydedildi.",

    "history.title": "Son aramalar",
    "history.empty": "Henüz arama yok — aşağıdan bir örnek dene.",
    "history.clear": "Geçmişi temizle",
    "history.remove": "Kaldır",

    "fav.title": "Favoriler",
    "fav.unpin": "Sabitlemeyi kaldır",

    "samples.title": "Örnek bir blob dene",

    "preview.title": "Önizleme",
    "preview.blobId": "Blob ID",
    "preview.type": "Tür",
    "preview.size": "Boyut",
    "preview.aggregator": "Aggregator",
    "preview.favTitle": "Favorilere ekle/çıkar",
    "preview.copyId": "Blob ID'yi kopyala",
    "preview.copyLink": "Paylaşım linkini kopyala",
    "preview.openRaw": "Ham veriyi aç",
    "preview.download": "İndir",
    "preview.loading": "Blob getiriliyor…",
    "preview.idCopied": "Blob ID kopyalandı.",
    "preview.linkCopied": "Paylaşım linki kopyalandı.",
    "preview.copyFailed": "Kopyalama başarısız.",
    "preview.pinned": "Favorilere sabitlendi.",
    "preview.unpinned": "Favorilerden kaldırıldı.",
    "preview.textTooLarge": "Metin satır içi önizleme için çok büyük ({size}). “Ham veriyi aç”ı kullan.",
    "preview.jsonTooLarge": "JSON önizleme için çok büyük ({size}).",
    "preview.noInline": "{type} için satır içi önizleme yok.",
    "preview.useDownload": "{size} · “İndir” veya “Ham veriyi aç” kullan.",

    "error.network": "{label} aggregator'ına ulaşırken ağ hatası oluştu.",
    "error.notFound": "Blob bu aggregator'da bulunamadı.",
    "error.http": "Aggregator HTTP {status} döndürdü.",
    "error.unexpected": "Blob yüklenirken beklenmeyen bir hata oluştu.",

    "about.title": "Walrus Blob Explorer Hakkında",
    "about.desc1": "",
    "about.desc2": " merkeziyetsiz depolamasından blob okumak için minik, bağımlılıksız bir istemci.",
    "about.hint": "Bir Blob ID yapıştır, aggregator seç ve içeriği önizle.",
    "about.li1": "🔒 Salt-okunur — Walrus'a asla yazmaz.",
    "about.li2": "🧳 Geçmiş ve favoriler tarayıcında kalır.",
    "about.li3": "⌨️ Aramaya odaklanmak için “/”, ana sayfaya dönmek için “Esc”.",
    "about.builtBy": "Geliştiren:",
    "about.copyHint": "(kopyalamak için tıkla)",
    "about.suiCopied": "Sui adresi kopyalandı.",
    "about.close": "Kapat",

    "footer.tagline": "Walrus depolama için salt-okunur istemci",
    "footer.source": "kaynak",
  },
};

export function getLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    if (LANGS.includes(saved)) return saved;
  } catch (_) {
    /* storage unavailable */
  }
  return DEFAULT_LANG;
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  try {
    localStorage.setItem(STORAGE_KEYS.lang, lang);
  } catch (_) {
    /* ignore */
  }
}

export function toggleLang() {
  const next = getLang() === "en" ? "tr" : "en";
  setLang(next);
  return next;
}

// Translate a key with optional {param} interpolation.
export function t(key, params) {
  const lang = getLang();
  let str = dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

// Reflect the active language on <html lang="...">.
export function initLang() {
  document.documentElement.lang = getLang();
}
