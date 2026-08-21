/* One-shot wiring: insert the extracted narrative sections into the Seerah,
   Islamic History and Kids portals, just above their closing PageShell.

   Kept as a script rather than done by hand so the three edits are identical
   in shape and reviewable together.
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const section = (id, teH, enH, teP, enP, body) => `
      <section id="${id}" className="py-16 px-4 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-[var(--if-green)] mb-2">
            {lang === "te" ? "${teH}" : "${enH}"}
          </h2>
          <p className="text-[var(--if-text-muted)] mb-6 text-pretty">
            {lang === "te" ? "${teP}" : "${enP}"}
          </p>
${body}
        </div>
      </section>
`;

const PLANS = [
  {
    file: "src/app/knowledge-center/seerah/client.tsx",
    imports: [
      'import { NarrativeCards } from "@/components/learning/NarrativeCards";',
      'import { seerahEvents, seerahCharacter } from "@/content/portals";',
    ],
    sections: [
      section(
        "timeline",
        "ప్రవక్త ﷺ జీవిత కాలక్రమం",
        "Timeline of the Prophet's life ﷺ",
        "పుట్టుక నుండి వీడ్కోలు ప్రసంగం వరకు పది దశలు — ప్రతి దశ నుండి ఒక పాఠం.",
        "Ten stages from birth to the Farewell Sermon, each with the lesson it carries.",
        `          <NarrativeCards
            entries={seerahEvents}
            fields={{ meta: "yr", summary: "s", lesson: "l" }}
            numbered
          />`,
      ),
      section(
        "character",
        "ప్రవక్త ﷺ స్వభావం",
        "The Prophet's character ﷺ",
        "పది లక్షణాలు — ప్రతిదానికి ఆధారం మరియు నేటి జీవితంలో దాన్ని ఎలా ఆచరించాలో.",
        "Ten traits, each with its evidence and how to practise it today.",
        `          <NarrativeCards
            entries={seerahCharacter}
            fields={{ summary: "ex", lesson: "ap" }}
            lessonLabel={{ te: "ఆచరణ", en: "Put it into practice" }}
          />`,
      ),
    ],
  },
  {
    file: "src/app/knowledge-center/islamic-history/client.tsx",
    imports: [
      'import { NarrativeCards } from "@/components/learning/NarrativeCards";',
      'import { historyEras, historyPeople, historyEmpires, historyCities } from "@/content/portals";',
    ],
    sections: [
      section(
        "eras",
        "ఇస్లామిక్ చరిత్ర యుగాలు",
        "Eras of Islamic history",
        "రాషిదూన్ నుండి ఆధునిక కాలం వరకు తొమ్మిది యుగాలు.",
        "Nine eras from the Rashidun to the modern age.",
        `          <NarrativeCards
            entries={historyEras}
            fields={{ meta: "pr", summary: "s", lesson: "l" }}
            numbered
          />`,
      ),
      section(
        "people",
        "చరిత్రను మలిచిన వ్యక్తులు",
        "The people who shaped it",
        "ఖలీఫాలు, పండితులు మరియు నాయకులు — వారి జీవితం మరియు వారు వదిలిన వారసత్వం.",
        "Caliphs, scholars and leaders — their lives and what they left behind.",
        `          <NarrativeCards
            entries={historyPeople}
            fields={{ meta: "role", summary: "bio", lesson: "leg" }}
            lessonLabel={{ te: "వారసత్వం", en: "Legacy" }}
          />`,
      ),
      section(
        "empires",
        "సామ్రాజ్యాలు",
        "Empires",
        "ఐదు సామ్రాజ్యాలు — ఎలా ఎదిగాయి, ఏమి సాధించాయి, ఏమి మిగిల్చాయి.",
        "Five empires — how they rose, what they achieved, what remains.",
        `          <NarrativeCards
            entries={historyEmpires}
            fields={{ meta: "pr", summary: "rise", extra: "ach", lesson: "leg" }}
            lessonLabel={{ te: "వారసత్వం", en: "Legacy" }}
          />`,
      ),
      section(
        "cities",
        "నగరాలు",
        "Cities",
        "ఇస్లామిక్ నాగరికతను నిర్మించిన ఏడు నగరాలు.",
        "Seven cities that built Islamic civilisation.",
        `          <NarrativeCards
            entries={historyCities}
            fields={{ meta: "reg", summary: "imp", lesson: "sig" }}
            lessonLabel={{ te: "ప్రాముఖ్యత", en: "Why it matters" }}
          />`,
      ),
    ],
  },
  {
    file: "src/app/knowledge-center/kids-islam/client.tsx",
    imports: [
      'import { NarrativeCards } from "@/components/learning/NarrativeCards";',
      'import { kidsProphets } from "@/content/portals";',
    ],
    sections: [
      section(
        "prophet-stories",
        "ప్రవక్తల కథలు",
        "Prophet stories",
        "ఏడు కథలు — ప్రతి దాని నుండి ఒక పాఠం మరియు ఈ వారం చేయవలసిన ఒక పని.",
        "Seven stories, each with a lesson and something to try this week.",
        `          <NarrativeCards
            entries={kidsProphets}
            fields={{ summary: "sum", lesson: "les", extra: "act" }}
            lessonLabel={{ te: "పాఠం", en: "Lesson" }}
          />`,
      ),
    ],
  },
];

for (const plan of PLANS) {
  const p = path.join(ROOT, plan.file);
  let s = fs.readFileSync(p, "utf8");
  const rel = plan.file.split("/").pop();

  if (s.includes("NarrativeCards")) {
    console.log(`  skipped (already wired): ${plan.file}`);
    continue;
  }

  const close = s.lastIndexOf("    </PageShell>");
  if (close === -1) throw new Error(`No closing PageShell in ${rel}`);
  s = s.slice(0, close) + plan.sections.join("\n") + "\n" + s.slice(close);

  const anchor = 'import { useI18n } from "@/lib/i18n/context";';
  if (!s.includes(anchor)) throw new Error(`No i18n import in ${rel}`);
  s = s.replace(anchor, [anchor, ...plan.imports].join("\n"));

  fs.writeFileSync(p, s, "utf8");
  console.log(`  wired ${plan.sections.length} section(s): ${plan.file}`);
}
