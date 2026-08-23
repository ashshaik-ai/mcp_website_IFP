import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated content modules — half a megabyte of data, nothing to lint.
    "src/content/*.ts",
    // Audit and verification scratch: throwaway scripts, not shipped code.
    ".audit/**",
    ".audit-tmp/**",
    ".tmp-*",
  ]),
  {
    /* Reading localStorage, the current time, or a fetched index has to happen
       after mount: doing it during render would mismatch the prerendered HTML
       and break hydration. useSyncExternalStore is the tidier expression of
       that, but these are deliberate and correct as written, so the rule is a
       warning rather than a build failure. It still flags the accidental case
       — a state reset that belonged in an event handler was found and fixed
       this way. */
    files: ["src/lib/**/*.tsx", "src/components/**/*.tsx"],
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
]);

export default eslintConfig;
