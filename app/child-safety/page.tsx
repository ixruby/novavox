import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/layout/TopNav";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { DotGrid } from "@/components/ui/DotGrid";

export const metadata: Metadata = {
  title: "Child Safety Standards & CSAE Policy | NOVAVOX",
  description:
    "NOVAVOX child safety standards, CSAE reporting mechanisms, enforcement practices, and compliance measures.",
  alternates: {
    canonical: "/child-safety",
  },
};

const prohibitedActivities = [
  "Child Sexual Abuse Material (CSAM)",
  "Grooming or exploitation of minors",
  "Sexualization of minors",
  "Sextortion involving minors",
  "Trafficking or exploitation of children",
  "Any behavior that endangers child safety",
];

const enforcementActions = [
  "Remove the offending content immediately",
  "Suspend or permanently terminate associated accounts",
  "Report confirmed violations to relevant law enforcement authorities and child protection organizations as required by applicable laws",
];

const policySections = [
  {
    number: "01",
    title: "Zero-Tolerance Policy",
    body: "Novavox strictly prohibits any content, behavior, communication, or activity involving child sexual abuse, exploitation, grooming, sexualization, sextortion, trafficking, or any behavior that endangers child safety. Any user found engaging in such activities will face immediate suspension or permanent account termination.",
  },
  {
    number: "02",
    title: "Reporting & User Safety",
    body: "Users can report inappropriate behavior, abusive content, or safety concerns directly within the app through the support or reporting mechanisms provided. All reports are reviewed seriously, and appropriate action is taken promptly.",
  },
  {
    number: "04",
    title: "Compliance With Child Safety Laws",
    body: "Novavox complies with applicable child safety laws, regulations, and platform requirements relating to the prevention of child sexual abuse and exploitation. We cooperate with law enforcement agencies and authorized organizations whenever legally required.",
  },
  {
    number: "06",
    title: "Policy Updates",
    body: "We may update this policy periodically to reflect operational, legal, or platform policy changes. Continued use of Novavox constitutes acceptance of these standards.",
  },
];

export default function ChildSafetyPage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-16 pb-20 md:pb-0">
        <DotGrid />

        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.28em] uppercase text-white/30 hover:text-white transition-colors"
            >
              <span aria-hidden="true">&lt;-</span>
              Back to NOVAVOX
            </Link>

            <div className="mt-10 flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">CSAE</span>
              <div className="w-12 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                Effective May 16, 2026
              </span>
            </div>

            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
              Child Safety Standards & CSAE Policy
            </h1>

            <p className="mt-8 max-w-3xl text-sm md:text-base text-white/50 leading-relaxed">
              At Novavox by Auravoxel Creations, we are committed to maintaining a safe platform for all users and enforcing a zero-tolerance policy toward any form of Child Sexual Abuse and Exploitation (CSAE).
            </p>
            <p className="mt-4 max-w-3xl text-xs md:text-sm text-white/35 leading-relaxed">
              This policy outlines our standards, reporting mechanisms, enforcement practices, and compliance measures regarding child safety.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div className="space-y-[1px] bg-white/5">
              {policySections.slice(0, 2).map((section) => (
                <article key={section.number} className="bg-black/40 p-7 md:p-9">
                  <span className="font-mono text-[9px] tracking-[0.28em] text-white/15">{section.number}</span>
                  <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    {section.title}
                  </h2>
                  <p className="mt-5 text-xs md:text-sm text-white/38 leading-relaxed">{section.body}</p>
                </article>
              ))}

              <article className="bg-black/40 p-7 md:p-9">
                <span className="font-mono text-[9px] tracking-[0.28em] text-white/15">03</span>
                <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                  CSAM Prevention & Enforcement
                </h2>
                <p className="mt-5 text-xs md:text-sm text-white/38 leading-relaxed">
                  If Novavox becomes aware of any Child Sexual Abuse Material (CSAM), we will:
                </p>
                <ul className="mt-6 space-y-3">
                  {enforcementActions.map((action) => (
                    <li key={action} className="flex gap-3 text-xs md:text-sm text-white/38 leading-relaxed">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-white/35" aria-hidden="true" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {policySections.slice(2).map((section) => (
                <article key={section.number} className="bg-black/40 p-7 md:p-9">
                  <span className="font-mono text-[9px] tracking-[0.28em] text-white/15">{section.number}</span>
                  <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    {section.title}
                  </h2>
                  <p className="mt-5 text-xs md:text-sm text-white/38 leading-relaxed">{section.body}</p>
                </article>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 h-fit border border-white/10 bg-black/35 p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                Prohibited Conduct
              </span>
              <ul className="mt-5 space-y-3">
                {prohibitedActivities.map((item) => (
                  <li key={item} className="text-[11px] text-white/35 leading-relaxed border-t border-white/5 pt-3 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Child Safety Contact
                </span>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/20">Developer</dt>
                    <dd className="mt-1 text-xs text-white/50">Auravoxel Creations</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/20">Email</dt>
                    <dd className="mt-1">
                      <a href="mailto:support@novavox.app" className="text-xs text-white/50 hover:text-white transition-colors break-all">
                        support@novavox.app
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
