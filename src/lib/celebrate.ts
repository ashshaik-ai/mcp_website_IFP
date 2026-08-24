/* A burst of gold when something is finished.

   Completing a lesson, passing the assessment or finishing a portal used to
   change a number. Every platform this site is measured against marks the
   moment — Khan's energy burst, Duolingo's confetti — because the flash of
   reward is half of why a learner comes back.

   No canvas and no library: two dozen spans animated with the Web Animations
   API and removed when they land. Transform and opacity only, nothing under
   reduced motion, and repeated calls are throttled so a re-render cannot rain
   confetti twice. */
let last = 0;

export function celebrate(origin?: { x: number; y: number }) {
  if (typeof document === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const now = Date.now();
  if (now - last < 1200) return;
  last = now;

  const cx = origin?.x ?? window.innerWidth / 2;
  const cy = origin?.y ?? window.innerHeight * 0.35;
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:300;overflow:hidden";
  document.body.appendChild(host);

  const colors = ["#e8b84b", "#c8922a", "#fff6df", "#f5e6c0"];
  const n = 26;
  let done = 0;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    const size = 5 + Math.random() * 6;
    const round = Math.random() > 0.5;
    p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${size}px;height:${round ? size : size * 0.45}px;background:${colors[i % colors.length]};border-radius:${round ? "50%" : "2px"}`;
    host.appendChild(p);
    const angle = (i / n) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 90 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 120;
    const rot = (Math.random() - 0.5) * 720;
    const dur = 900 + Math.random() * 700;
    const anim = p.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.7}px,${dy}px) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px,${dy + 260}px) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: dur, easing: "cubic-bezier(0.16,0.8,0.4,1)" },
    );
    anim.onfinish = () => {
      done++;
      if (done === n) host.remove();
    };
  }
  /* Belt and braces: if onfinish never fires (tab hidden), clean up anyway. */
  window.setTimeout(() => host.remove(), 2600);
}
