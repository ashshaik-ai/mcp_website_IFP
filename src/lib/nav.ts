/* Homepage section links, shared by the navbar and the footer.
   Both used to keep their own copy; the footer's drifted and shipped bare
   fragments that only resolved on "/", leaving its whole Quick Links column
   dead on every other page. One list, one resolver, so that cannot recur. */

export const homeSections = [
  { key: "nav_victory", fragment: "#victory" },
  { key: "nav_achievements", fragment: "#achievements" },
  { key: "nav_manifesto", fragment: "#manifesto" },
  { key: "nav_schemes", fragment: "#schemes" },
  { key: "nav_about", fragment: "#about" },
  { key: "nav_contact", fragment: "#contact" },
] as const;

export type HomeSectionKey = (typeof homeSections)[number]["key"];

/** A homepage fragment only resolves on "/". Everywhere else it needs the root. */
export function sectionHref(fragment: string, pathname: string): string {
  return pathname === "/" ? fragment : `/${fragment}`;
}
