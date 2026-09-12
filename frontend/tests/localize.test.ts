import { describe, expect, it } from "vitest";
import { resolveLanguage } from "../src/utils/localize";

describe("resolveLanguage", () => {
  it("falls back to the viewer's hass language when configured as auto", () => {
    expect(resolveLanguage("auto", "en")).toBe("en");
  });

  it("falls back to the viewer's hass language when configured as auto (de)", () => {
    expect(resolveLanguage("auto", "de")).toBe("de");
  });

  it("overrides the viewer's hass language when explicitly configured to de", () => {
    expect(resolveLanguage("de", "en")).toBe("de");
  });

  it("overrides the viewer's hass language when explicitly configured to en", () => {
    expect(resolveLanguage("en", "de")).toBe("en");
  });
});
