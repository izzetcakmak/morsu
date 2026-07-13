import { test } from "node:test";
import assert from "node:assert/strict";
import { categorizeMime, mimeLabel } from "../js/utils/mime.js";

test("categorizes common types", () => {
  assert.equal(categorizeMime("image/png"), "image");
  assert.equal(categorizeMime("video/mp4"), "video");
  assert.equal(categorizeMime("audio/mpeg"), "audio");
  assert.equal(categorizeMime("application/pdf"), "pdf");
  assert.equal(categorizeMime("application/json"), "json");
  assert.equal(categorizeMime("application/ld+json"), "json");
  assert.equal(categorizeMime("text/plain; charset=utf-8"), "text");
  assert.equal(categorizeMime("application/octet-stream"), "binary");
  assert.equal(categorizeMime(""), "binary");
});

test("mimeLabel strips parameters", () => {
  assert.equal(mimeLabel("text/html; charset=utf-8"), "text/html");
  assert.equal(mimeLabel(""), "unknown");
});
