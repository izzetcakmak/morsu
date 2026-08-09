import { test } from "node:test";
import assert from "node:assert/strict";
import { isOpaqueMime, sniffBinaryMime, sniffTextMime } from "../js/utils/mime.js";

const bytes = (...values) => Uint8Array.from(values);
const utf8 = (text) => new TextEncoder().encode(text);

test("treats missing and octet-stream types as opaque", () => {
  assert.equal(isOpaqueMime(""), true);
  assert.equal(isOpaqueMime("application/octet-stream"), true);
  assert.equal(isOpaqueMime("APPLICATION/OCTET-STREAM"), true);
  assert.equal(isOpaqueMime("image/png"), false);
  assert.equal(isOpaqueMime("text/plain; charset=utf-8"), false);
});

test("sniffs image magic bytes", () => {
  assert.equal(sniffBinaryMime(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)), "image/png");
  assert.equal(sniffBinaryMime(bytes(0xff, 0xd8, 0xff, 0xe0)), "image/jpeg");
  assert.equal(sniffBinaryMime(utf8("GIF89a")), "image/gif");
  assert.equal(sniffBinaryMime(bytes(0x42, 0x4d, 0x00)), "image/bmp");
});

test("sniffs container formats that share a RIFF header", () => {
  const riff = (tag) => {
    const out = new Uint8Array(12);
    out.set(utf8("RIFF"), 0);
    out.set(utf8(tag), 8);
    return out;
  };
  assert.equal(sniffBinaryMime(riff("WEBP")), "image/webp");
  assert.equal(sniffBinaryMime(riff("WAVE")), "audio/wav");
});

test("sniffs documents, audio and video", () => {
  assert.equal(sniffBinaryMime(utf8("%PDF-1.7")), "application/pdf");
  assert.equal(sniffBinaryMime(utf8("OggS")), "audio/ogg");
  assert.equal(sniffBinaryMime(utf8("ID3")), "audio/mpeg");
  const mp4 = new Uint8Array(12);
  mp4.set(utf8("ftyp"), 4);
  assert.equal(sniffBinaryMime(mp4), "video/mp4");
  assert.equal(sniffBinaryMime(bytes(0x1a, 0x45, 0xdf, 0xa3)), "video/webm");
});

test("returns empty string for unrecognized binary", () => {
  assert.equal(sniffBinaryMime(bytes(0x00, 0x01, 0x02, 0x03)), "");
});

test("recognizes JSON only when it parses", () => {
  assert.equal(sniffTextMime(utf8('{"a":1}')), "application/json");
  assert.equal(sniffTextMime(utf8("  [1, 2, 3]")), "application/json");
  assert.equal(sniffTextMime(utf8("{not json")), "text/plain");
});

test("recognizes markup", () => {
  assert.equal(sniffTextMime(utf8('<svg xmlns="http://www.w3.org/2000/svg"></svg>')), "image/svg+xml");
  assert.equal(sniffTextMime(utf8("<!DOCTYPE html><html></html>")), "text/html");
  assert.equal(sniffTextMime(utf8('<?xml version="1.0"?><note/>')), "application/xml");
});

test("falls back to plain text and rejects binary", () => {
  assert.equal(sniffTextMime(utf8("hello walrus\n")), "text/plain");
  assert.equal(sniffTextMime(bytes(0x89, 0x50, 0x4e, 0x47)), "");
  assert.equal(sniffTextMime(bytes(0x68, 0x69, 0x00, 0x01)), "");
});

test("keeps tabs and newlines as text", () => {
  assert.equal(sniffTextMime(utf8("col1\tcol2\r\nv1\tv2\n")), "text/plain");
});
