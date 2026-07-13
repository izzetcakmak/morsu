import { test } from "node:test";
import assert from "node:assert/strict";
import { dictionaries, t, getLang, DEFAULT_LANG, LANGS } from "../js/i18n.js";

test("default language is English", () => {
  assert.equal(DEFAULT_LANG, "en");
  assert.equal(getLang(), "en"); // no persisted choice in test env
});

test("both languages are registered", () => {
  assert.deepEqual(LANGS, ["en", "tr"]);
  assert.ok(dictionaries.en);
  assert.ok(dictionaries.tr);
});

test("EN and TR dictionaries have identical key sets", () => {
  const en = Object.keys(dictionaries.en).sort();
  const tr = Object.keys(dictionaries.tr).sort();
  assert.deepEqual(tr, en);
});

test("all values are strings", () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(dictionaries[lang])) {
      assert.equal(typeof value, "string", `${lang}:${key} should be a string`);
    }
  }
});

test("t() resolves keys and falls back to the key itself", () => {
  assert.equal(t("search.button"), "Look up");
  assert.equal(t("nonexistent.key"), "nonexistent.key");
});

test("t() interpolates {params}", () => {
  assert.equal(t("error.http", { status: 503 }), "Aggregator returned HTTP 503.");
  assert.equal(t("preview.noInline", { type: "application/zip" }), "No inline preview for application/zip.");
});

test("parameter placeholders match across languages", () => {
  const placeholder = /\{[a-z]+\}/gi;
  for (const key of Object.keys(dictionaries.en)) {
    const enParams = (dictionaries.en[key].match(placeholder) || []).sort();
    const trParams = (dictionaries.tr[key].match(placeholder) || []).sort();
    assert.deepEqual(trParams, enParams, `${key} placeholders should match`);
  }
});
