/* Starts a production server for Lighthouse to measure, and guarantees it is
   THIS build being measured.

   Previously each script spawned `npx next start` and called proc.kill() at the
   end. On Windows that kills the npx shim, not the next server underneath it,
   so orphans accumulated and kept holding the port. Every later run bound
   nothing, silently measured whatever stale build the orphan was serving, and
   reported audit failures for code that had already been fixed. */
import { spawn, execSync } from "node:child_process";

/** Kill whatever currently holds the port, orphan or not. */
export function freePort(port) {
  let out = "";
  try {
    out = execSync(`netstat -ano -p tcp`, { encoding: "utf8" });
  } catch {
    return;
  }
  const pids = new Set();
  for (const line of out.split("\n")) {
    const m = line.match(/^\s*TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)/);
    if (m && Number(m[1]) === port) pids.add(m[2]);
  }
  for (const pid of pids) {
    try {
      execSync(`taskkill /F /T /PID ${pid}`, { stdio: "ignore" });
      console.error(`[lh] killed orphan pid ${pid} on port ${port}`);
    } catch {}
  }
}

export async function startServer(port) {
  freePort(port);

  const proc = spawn("npx", ["next", "start", "-p", String(port)], {
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  // Poll the port rather than trusting a log line; the log can appear before
  // the server actually accepts connections.
  const deadline = Date.now() + 60_000;
  for (;;) {
    if (Date.now() > deadline) throw new Error(`server on ${port} never came up`);
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }

  return {
    proc,
    stop() {
      try {
        execSync(`taskkill /F /T /PID ${proc.pid}`, { stdio: "ignore" });
      } catch {}
      freePort(port);
    },
  };
}
