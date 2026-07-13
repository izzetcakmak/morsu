import { test } from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../js/utils/format-bytes.js";

test("formats zero and empty", () => {
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(null), "—");
  assert.equal(formatBytes(undefined), "—");
  assert.equal(formatBytes(NaN), "—");
});

test("formats bytes without decimals", () => {
  assert.equal(formatBytes(512), "512 B");
});

test("formats KB and MB", () => {
  assert.equal(formatBytes(1536), "1.5 KB");
  assert.equal(formatBytes(1024 * 1024), "1.0 MB");
});

test("clamps to largest unit", () => {
  assert.match(formatBytes(5 * 1024 ** 4), /TB$/);
});
