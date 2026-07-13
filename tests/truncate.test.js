import { test } from "node:test";
import assert from "node:assert/strict";
import { truncateMiddle } from "../js/utils/truncate.js";

test("leaves short strings untouched", () => {
  assert.equal(truncateMiddle("abc"), "abc");
});

test("middle-truncates long strings", () => {
  const out = truncateMiddle("abcdefghijklmnopqrstuvwxyz", 4, 4);
  assert.equal(out, "abcd…wxyz");
});

test("handles non-strings", () => {
  assert.equal(truncateMiddle(null), "");
});
