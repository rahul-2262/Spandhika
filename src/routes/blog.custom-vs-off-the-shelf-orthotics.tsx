import { createFileRoute, Link } from "@tanstack/react-router";

const URL = "https://spandhikaorthotics.in/blog/custom-vs-off-the-shelf-orthotics";
const OG_IMAGE = "https://spandhikaorthotics.in/og-spandhika.jpg";
const TITLE = "Custom vs Off-the-Shelf Orthotics: Which Insole Is Right for You?";
const DESCRIPTION =
  "Custom smart orthotics vs off-the-shelf insoles — how they differ in support, technology and long-term foot health, and which one helps most with plantar fasciitis, posture and everyday pain.";

export const Route = createFileRoute("/blog/custom-vs-off-the-shelf-orthotics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "article:section", content: "Foot Health" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          image: [OG_IMAGE],
          author: { "@type": "Organization", name: "Spandhika Orthotics" },
          publisher: {
            "@type": "Organization",
            name: "Spandhika Orthotics",
            logo: { "@type": "ImageObject", url: OG_IMAGE },
          },
          mainEntityOfPage: URL,
          datePublished: "2026-06-07",
          dateModified: "2026-06-07",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://spandhikaorthotics.in/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://spandhikaorthotics.in/blog" },
            { "@type": "ListItem", position: 3, name: TITLE, item: URL },
          ],
        }),
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <main className="bg-background text-on-surface">
      <article className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 pt-28 pb-24">
        <nav aria-label="Breadcrumb" className="text-sm text-on-surface-variant mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Blog</span>
          <span className="mx-2">/</span>
          <span aria-current="page">Custom vs Off-the-Shelf Orthotics</span>
        </nav>

        <header className="mb-10">
          <p className="label-caps text-on-surface-variant mb-3">Foot health · 8 min read</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-primary">
            Custom vs Off-the-Shelf Orthotics: Which Insole Is Right for You?
          </h1>
          <p className="mt-5 text-lg text-on-surface-variant">
            If you've ever stood in a pharmacy aisle staring at rows of gel insoles, you already know
            the question: do these actually fix anything, or do I need something built for my feet?
            Here's a clear comparison of off-the-shelf insoles and custom smart orthotics — what
            each does well, where they fall short, and how to pick.
          </p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-6 text-on-surface">
          <h2 className="text-2xl font-semibold text-primary mt-10">What "off-the-shelf" really means</h2>
          <p>
            Off-the-shelf insoles — memory foam, gel, arch cushions — are mass-produced for an
            average foot. They add a layer of softness and mild arch lift, which can feel great
            in the first hour. But they don't correct how you load your feet, and the support is
            generic: the arch height, heel cup depth, and forefoot stiffness are the same whether
            you have flat feet, high arches, or an asymmetric gait.
          </p>
          <p>
            They work best as comfort accessories — long days on hard floors, breaking in stiff
            shoes, mild fatigue. They're not a clinical fix.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-10">What custom orthotics do differently</h2>
          <p>
            Custom orthotics are shaped to your foot's geometry and pressure pattern. A good custom
            orthotic redistributes load away from painful zones (heel, ball of foot, big toe joint),
            supports the arch at the right height for <em>your</em> foot, and aligns the heel so
            the rest of the kinetic chain — ankle, knee, hip — stacks correctly.
          </p>
          <p>
            That's why custom orthotics are the standard recommendation for plantar fasciitis, flat
            feet, overpronation, and recurring knee or lower-back pain that traces back to gait.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-10">Where smart orthotics change the picture</h2>
          <p>
            Traditional custom orthotics are static: cast or scanned once, then worn for years
            without feedback on whether they're still working. Smart orthotics add sensors that
            measure pressure and gait continuously.
          </p>
          <p>
            <Link to="/" hash="features" className="text-primary underline">SAARTHI by Spandhika</Link>{" "}
            maps pressure across the foot in real time, flags asymmetries you can't feel, and
            tracks how your walking pattern changes week to week. That means the insole adapts to
            you — and you get a record of progress, not just a static support.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-10">Side-by-side comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container">
                <tr>
                  <th className="px-4 py-3 font-medium">Factor</th>
                  <th className="px-4 py-3 font-medium">Off-the-shelf</th>
                  <th className="px-4 py-3 font-medium">Custom smart (SAARTHI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr><td className="px-4 py-3">Fit</td><td className="px-4 py-3">Average foot</td><td className="px-4 py-3">Your foot</td></tr>
                <tr><td className="px-4 py-3">Arch &amp; heel support</td><td className="px-4 py-3">Generic, fixed</td><td className="px-4 py-3">Geometry-matched</td></tr>
                <tr><td className="px-4 py-3">Pressure mapping</td><td className="px-4 py-3">None</td><td className="px-4 py-3">Continuous, sensor-based</td></tr>
                <tr><td className="px-4 py-3">Gait feedback</td><td className="px-4 py-3">None</td><td className="px-4 py-3">Tracked over time</td></tr>
                <tr><td className="px-4 py-3">Helps with plantar fasciitis</td><td className="px-4 py-3">Mild relief</td><td className="px-4 py-3">Targeted offloading</td></tr>
                <tr><td className="px-4 py-3">Long-term posture impact</td><td className="px-4 py-3">Limited</td><td className="px-4 py-3">Measurable</td></tr>
                <tr><td className="px-4 py-3">Cost</td><td className="px-4 py-3">Lowest</td><td className="px-4 py-3">Higher, but per-wear value compounds</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-primary mt-10">Best insoles for plantar fasciitis</h2>
          <p>
            Plantar fasciitis pain is a load problem: the fascia is being overstretched at the
            heel every step. Generic gel insoles cushion the impact but don't change the load
            distribution. Custom orthotics — and especially smart ones that verify the offload is
            actually happening — give the fascia the rest it needs to heal.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-10">Which one should you choose?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Occasional comfort</strong> on long days → off-the-shelf is fine.</li>
            <li><strong>Recurring foot, knee, hip or back pain</strong> → custom orthotic.</li>
            <li><strong>You want to actually <em>see</em> your gait improve</strong> → smart orthotic.</li>
          </ul>

          <div className="mt-12 rounded-3xl border border-outline-variant bg-surface-container-low p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-primary">Try SAARTHI when it launches</h3>
            <p className="mt-2 text-on-surface-variant">
              Spandhika is building SAARTHI, a smart orthotic insole that maps your pressure and
              gait in real time. Join the 2026 waitlist for early access.
            </p>
            <Link
              to="/"
              hash="waitlist"
              className="inline-flex items-center gap-1 mt-5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Join the waitlist
            </Link>
          </div>

          <p className="mt-10 text-sm text-on-surface-variant">
            Related: <Link to="/" hash="problem" className="text-primary underline">Common foot problems SAARTHI helps with</Link> ·{" "}
            <Link to="/" hash="features" className="text-primary underline">How SAARTHI works</Link>
          </p>
        </div>
      </article>
    </main>
  );
}
