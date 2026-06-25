import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { signs, getSign } from "@/data/signs";

export const Route = createFileRoute("/signs/$slug")({
  loader: ({ params }) => {
    const sign = getSign(params.slug);
    if (!sign) throw notFound();
    return { sign };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.sign;
    if (!s) return { meta: [{ title: "Sign not found — Spandhika" }] };
    return {
      meta: [
        { title: `${s.title} — Early signs your feet need attention | Spandhika` },
        { name: "description", content: `${s.body} Learn the causes, what to watch for, and how SAARTHI helps.` },
        { property: "og:title", content: `${s.title} — Spandhika` },
        { property: "og:description", content: s.body },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-[60vh] grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Sign not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">← Back home</Link>
      </div>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="min-h-[60vh] grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Something went wrong</h1>
        <button onClick={reset} className="mt-4 underline">Try again</button>
      </div>
    </main>
  ),
  component: SignDetail,
});

function SignDetail() {
  const { sign } = Route.useLoaderData();
  return (
    <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-20 max-w-[960px] mx-auto">
      <Link to="/" hash="problem" className="label-caps text-[11px] text-on-surface-variant hover:text-primary inline-flex items-center gap-1">
        ← All signs
      </Link>

      <header className="mt-6">
        <div className="label-caps text-tertiary-fixed-dim text-[11px]">Early sign</div>
        <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-primary">
          {sign.title}
        </h1>
        <p className="mt-4 text-lg text-on-surface-variant leading-relaxed">{sign.body}</p>
      </header>

      <article className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-primary">What's actually happening</h2>
          <p className="mt-3 text-on-surface-variant leading-relaxed">{sign.details}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">Common causes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {sign.causes.map((c) => (
              <li key={c} className="text-sm rounded-full bg-secondary-container/70 border border-outline-variant/60 px-3 py-1.5 text-primary">
                {c}
              </li>
            ))}
          </ul>
        </section>

        {sign.whatToWatchFor && (
          <section>
            <h2 className="text-xl font-semibold text-primary">What to watch for</h2>
            <ul className="mt-3 space-y-2 text-on-surface-variant">
              {sign.whatToWatchFor.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8">
          <div className="label-caps text-tertiary-fixed-dim text-[11px]">How SAARTHI helps</div>
          <p className="mt-3 text-lg leading-relaxed">{sign.helps}</p>
          {sign.whenToActFAST && (
            <p className="mt-4 text-sm text-on-primary-container">{sign.whenToActFAST}</p>
          )}
          <Link
            to="/"
            hash="waitlist"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-tertiary-fixed text-primary px-5 py-2.5 text-sm font-semibold hover:brightness-110"
          >
            Join the SAARTHI waitlist →
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">Other early signs</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {signs.filter((s) => s.slug !== sign.slug).map((s) => (
              <Link
                key={s.slug}
                to="/signs/$slug"
                params={{ slug: s.slug }}
                className="rounded-xl border border-outline-variant/60 bg-surface/70 backdrop-blur p-4 hover:border-primary/40 transition"
              >
                <div className="text-sm font-semibold text-primary">{s.title}</div>
                <div className="mt-1 text-[13px] text-on-surface-variant line-clamp-2">{s.body}</div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
