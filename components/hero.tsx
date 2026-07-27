import Image from "next/image"
import profilePhoto from "@/public/Media.png"
import { CountUp } from "@/components/count-up"

/* ──────────────────────────────────────────────────────────
   Swap this for your own photo: drop the file in /public and
   change the import above. Next.js reads the real dimensions
   off the file, so the frame follows the photo's aspect ratio
   — any shape works and nothing ever gets cropped.
   ────────────────────────────────────────────────────────── */
const PROFILE_ALT = "Portrait of the developer"

const FOCUS_AREAS = ["Travel", "Healthcare", "SaaS", "E-commerce"]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* ── Atmosphere: fine dot grid, faded toward the edges ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 20%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 20%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
        {/* Swap to lg:grid-flow-dense + lg:col-start-2 on the image to
            flip sides — or simply move the two blocks below. */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          {/* ── Left: portrait ── */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both">
            <div className="group relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[420px]">
              {/* Offset editorial rule behind the frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[calc(var(--radius)+0.75rem)] border border-border/70"
              />

              <div className="relative overflow-hidden rounded-[var(--radius)] bg-muted ring-1 ring-border shadow-[0_28px_70px_-30px_rgb(0_0_0/0.4)]">
                {/* h-auto + intrinsic dimensions => full photo, never cropped */}
                <Image
                  src={profilePhoto}
                  alt={PROFILE_ALT}
                  priority
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 340px, 300px"
                  className="block w-full h-auto grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              </div>

              {/* Floating stat chip */}
              <div className="absolute -bottom-5 -right-3 rounded-[calc(var(--radius)-0.35rem)] border border-border bg-card px-4 py-3 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.3)] sm:px-5 sm:py-4">
                <div className="font-mono text-xl sm:text-2xl font-semibold leading-none text-foreground">
                  <CountUp value={40} suffix="+" />
                </div>
                <div className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                  Projects shipped
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: copy ── */}
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:100ms]"
              style={{
                backgroundColor: "var(--hero-badge-bg)",
                color: "var(--hero-badge-text)",
              }}
            >
              Selected Work
            </span>

            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-foreground text-balance leading-[1.08] animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:180ms]">
              Building Products That Scale
            </h1>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:260ms]">
              With 40+ projects shipped across industries like travel, healthcare,
              SaaS, and e-commerce, I specialize in turning complex requirements
              into seamless digital experiences. Whether it&apos;s a CRM, marketplace,
              mobile app, or AI-powered platform — I bring the full stack to the table.
            </p>

            <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:340ms]">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full px-3 py-1 font-mono text-xs tracking-tight"
                  style={{
                    backgroundColor: "var(--badge-bg)",
                    color: "var(--badge-text)",
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:420ms]">
              <a
                href="#projects-top"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:gap-3 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Explore my work
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Transition into the project sections ── */}
        <div className="mt-16 lg:mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Projects
          </span>
          <div className="h-px w-16 bg-border" />
        </div>
      </div>
    </section>
  )
}
