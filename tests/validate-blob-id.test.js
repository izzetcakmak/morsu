import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidBlobId, normalizeBlobInput } from "../js/utils/validate-blob-id.js";

const VALID = "0BZQzr9Xp3nkq5m2VtY7cJdLfW8HgR4sT1uN6oPaEbC";

test("accepts a 43-char url-safe base64 id", () => {
  assert.equal(isValidBlobId(VALID), true);
});

test("rejects wrong length or bad chars", () => {
  assert.equal(isValidBlobId("tooshort"), false);
  assert.equal(isValidBlobId(VALID + "x"), false);
  assert.equal(isValidBlobId(VALID.replace("0", "+")), false);
  assert.equal(isValidBlobId(42), false);
});

test("trims whitespace", () => {
  assert.equal(isValidBlobId(`  ${VALID}  `), true);
});

test("extracts id from an aggregator URL", () => {
  const url = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${VALID}`;
  assert.equal(normalizeBlobInput(url), VALID);
});

test("passes through a bare id", () => {
  assert.equal(normalizeBlobInput(` ${VALID} `), VALID);
});
