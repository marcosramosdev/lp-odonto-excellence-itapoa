import { test } from "node:test";
import assert from "node:assert/strict";
import { WHATSAPP_URL, whatsappText } from "./whatsapp.ts";

test("message with a service", () => {
  assert.equal(
    whatsappText("Maria", "implante"),
    "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação para implante dentário.",
  );
});

test("message for 'Ainda não sei'", () => {
  assert.equal(
    whatsappText("Maria", "avaliacao-geral"),
    "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação.",
  );
});

test("name with accents and special characters survives the form URL", () => {
  const text = whatsappText("  João   D'Ávila & Cia #1?+ ", "gengiva");
  assert.equal(
    text,
    "Olá! Meu nome é João D'Ávila & Cia #1?+. Vim pelo site e gostaria de agendar uma avaliação para tratamento de gengiva.",
  );

  /* A GET form serializes its fields the way URLSearchParams does. */
  const url = new URL(`${WHATSAPP_URL}?${new URLSearchParams({ text })}`);
  assert.equal(url.origin + url.pathname, WHATSAPP_URL);
  assert.equal(url.searchParams.get("text"), text);
});
