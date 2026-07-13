import { test } from "node:test";
import assert from "node:assert/strict";
import { OWNER } from "../js/config.js";

test("owner Sui address is a well-formed 32-byte hex address", () => {
  assert.match(OWNER.suiAddress, /^0x[0-9a-f]{64}$/);
});

test("owner GitHub handle is set", () => {
  assert.equal(OWNER.github, "izzetcakmak");
});

test("owner address matches everywhere it is duplicated", async () => {
  const { readFile } = await import("node:fs/promises");
  const files = [
    "package.json",
    "walrus/ws-resources.json",
    "README.md",
    "README.tr.md",
    "docs/DEPLOY.md",
  ];
  for (const file of files) {
    const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.ok(
      content.includes(OWNER.suiAddress),
      `${file} should reference the owner Sui address`,
    );
  }
});
