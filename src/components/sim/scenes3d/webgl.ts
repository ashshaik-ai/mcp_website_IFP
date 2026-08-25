/* Is there a GPU worth talking to?

   Kept in its own module so the scene wrappers can ask without importing
   three.js: the whole point of the probe is to decide whether to pay the
   ~160 KB that three costs, so asking the question must itself be free. */

let cached: boolean | null = null;

export function webglAvailable(): boolean {
  if (cached !== null) return cached;
  try {
    const c = document.createElement("canvas");
    cached = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}
