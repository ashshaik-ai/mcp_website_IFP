import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";

const stats = [
  { label: "Families Served", value: 12000 },
  { label: "Years of Service", value: 18 },
  { label: "Active Volunteers", value: 850 },
  { label: "Programs Running", value: 24 },
];

const schemes = [
  { title: "Scholarship Program", description: "Merit + need-based support for students from Class 1 through post-graduation.", icon: "🎓" },
  { title: "Medical Aid", description: "Free consultations, subsidised medicines, and hospital referral support.", icon: "🏥" },
  { title: "Zakat Distribution", description: "Transparent, committee-verified zakat disbursement every Ramadan.", icon: "🤲" },
  { title: "Women Empowerment", description: "Skill training, micro-loans, and SHG formation for women entrepreneurs.", icon: "👩‍💼" },
  { title: "Youth Leadership", description: "Sports, debate, and civic engagement programs for ages 15–30.", icon: "🏆" },
  { title: "Senior Care", description: "Monthly support visits, medicine delivery, and community companionship.", icon: "🫶" },
];

const marqueeItems = [
  "Community Welfare", "Education Support", "Medical Aid", "Youth Programs",
  "Zakat Distribution", "Women Empowerment", "Senior Care", "Civic Engagement",
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight">Islamic Front</span>
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#schemes" className="hover:text-foreground transition-colors">Schemes</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button size="sm">Join Us</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-4 py-32 gap-6">
        <Meteors number={20} />
        <BlurFade delay={0.1}>
          <AnimatedGradientText className="text-sm font-medium px-4 py-1 rounded-full border">
            Mangalagiri · Andhra Pradesh
          </AnimatedGradientText>
        </BlurFade>
        <BlurFade delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Serving the Community<br />Since 2006
          </h1>
        </BlurFade>
        <BlurFade delay={0.3}>
          <p className="text-muted-foreground max-w-xl text-lg">
            Islamic Front Mangalagiri works at the intersection of faith, welfare,
            and civic participation — building a stronger community together.
          </p>
        </BlurFade>
        <BlurFade delay={0.4} className="flex gap-3 flex-wrap justify-center">
          <ShimmerButton>Explore Schemes</ShimmerButton>
          <Button variant="outline" size="lg">Learn More</Button>
        </BlurFade>
      </section>

      {/* Marquee */}
      <div className="border-y py-3 bg-muted/30">
        <Marquee pauseOnHover className="[--duration:25s]">
          {marqueeItems.map((item) => (
            <Badge key={item} variant="secondary" className="mx-3 text-xs py-1 px-3">
              {item}
            </Badge>
          ))}
        </Marquee>
      </div>

      {/* Stats */}
      <section id="impact" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          </BlurFade>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <BlurFade key={s.label} delay={0.1 + i * 0.05}>
                <Card className="text-center">
                  <CardContent className="pt-6 pb-4">
                    <p className="text-4xl font-bold tabular-nums">
                      <NumberTicker value={s.value} />+
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Schemes */}
      <section id="schemes" className="py-20 px-4 bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Community Schemes</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Programmes designed to uplift every segment of the community.
              </p>
            </div>
          </BlurFade>
          <BentoGrid>
            {schemes.map((scheme, i) => (
              <BentoCard
                key={scheme.title}
                name={scheme.title}
                description={scheme.description}
                Icon={() => <span className="text-2xl">{scheme.icon}</span>}
                className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                href="#"
                cta="Learn more"
                background={<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-4 text-center">
        <BlurFade delay={0.1}>
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Volunteer, donate, or apply for a scheme. Every contribution strengthens the community.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <ShimmerButton>Apply for a Scheme</ShimmerButton>
            <Button variant="outline">Volunteer With Us</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </BlurFade>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 mt-auto">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© 2026 Islamic Front Mangalagiri. All rights reserved.</span>
          <span>Mangalagiri, Guntur District, Andhra Pradesh</span>
        </div>
      </footer>
    </main>
  );
}
