import { test } from "node:test";
import assert from "node:assert/strict";
import { debounce } from "../js/utils/debounce.js";

test("calls only once for a burst", async () => {
  let calls = 0;
  const fn = debounce(() => calls++, 20);
  fn();
  fn();
  fn();
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(calls, 1);
});

test("passes the latest arguments", async () => {
  let seen = null;
  const fn = debounce((x) => (seen = x), 20);
  fn(1);
  fn(2);
  fn(3);
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(seen, 3);
});
