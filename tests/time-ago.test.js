import { test } from "node:test";
import assert from "node:assert/strict";
import { timeAgo } from "../js/utils/time-ago.js";

// These assertions are locale-agnostic: RelativeTimeFormat output is localized,
// so we check structure (non-empty, includes the magnitude) rather than words.

test("recent timestamps produce a non-empty relative string", () => {
  assert.ok(timeAgo(Date.now() - 5000).length > 0);
});

test("minutes ago includes the magnitude", () => {
  assert.match(timeAgo(Date.now() - 3 * 60 * 1000), /3/);
});

test("hours ago includes the magnitude", () => {
  assert.match(timeAgo(Date.now() - 5 * 60 * 60 * 1000), /5/);
});

test("distinct ranges produce distinct output", () => {
  const min = timeAgo(Date.now() - 2 * 60 * 1000);
  const hr = timeAgo(Date.now() - 2 * 60 * 60 * 1000);
  assert.notEqual(min, hr);
});
