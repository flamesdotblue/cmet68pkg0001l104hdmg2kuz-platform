import React, { useMemo, useRef, useState } from "react";

// Color palette for flavors
const FLAVORS = [
  {
    id: "vanilla",
    name: "Vanilla Sky",
    cals: 90,
    protein: 10,
    sugar: 0,
    desc: "Feather-light vanilla with Madagascar vibes.",
    colors: ["#FDE68A", "#F59E0B"],
  },
  {
    id: "choco",
    name: "Midnight Cacao",
    cals: 110,
    protein: 12,
    sugar: 0,
    desc: "Deep, rich cocoa with zero guilt.",
    colors: ["#8B5CF6", "#111827"],
  },
  {
    id: "strawb",
    name: "Strawberry Nova",
    cals: 95,
    protein: 11,
    sugar: 0,
    desc: "Bright strawberry with cosmic zing.",
    colors: ["#FB7185", "#F43F5E"],
  },
  {
    id: "mint",
    name: "Arctic Mint",
    cals: 100,
    protein: 12,
    sugar: 0,
    desc: "Cool mint and dark chips in orbit.",
    colors: ["#34D399", "#10B981"],
  },
];

function useTilt() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  };
  return { ref, onMouseMove, onLeave };
}

function Cup({ colors = ["#fff", "#000"], size = 160 }) {
  // Simple 3D-ish cup using layered divs and gradients
  const [c1, c2] = colors;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-2xl shadow-2xl"
        style={{
          background:
            `radial-gradient(120% 120% at 20% 0%, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 60%), linear-gradient(160deg, ${c1}, ${c2})`,
          filter: "saturate(1.1)",
        }}
      />
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[85%] h-6 rounded-full"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,.9) 0%, rgba(255,255,255,.2) 60%), rgba(255,255,255,.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 -40px 60px rgba(0,0,0,.18)" }} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs tracking-wider font-semibold uppercase text-white/95 drop-shadow">Mini • Sugar‑Free</div>
    </div>
  );
}

function TruckIcon({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none">
      <rect x="2" y="12" width="36" height="16" rx="3" fill="#6366F1" />
      <path d="M38 16h10l8 6v6H38v-12Z" fill="#4338CA" />
      <rect x="44" y="18" width="6" height="4" rx="1" fill="#A5B4FC" />
      <circle cx="16" cy="32" r="6" fill="#111827" />
      <circle cx="16" cy="32" r="3" fill="#9CA3AF" />
      <circle cx="50" cy="32" r="6" fill="#111827" />
      <circle cx="50" cy="32" r="3" fill="#9CA3AF" />
      <path d="M6 12h24" stroke="#A5B4FC" strokeWidth="2" opacity=".5" />
      <text x="6" y="25" fontFamily="ui-sans-serif, system-ui" fontSize="7" fill="#E0E7FF" fontWeight="700">FedEx</text>
    </svg>
  );
}

export default function App() {
  const [distance, setDistance] = useState(6);
  const estMins = useMemo(() => {
    const speedMph = 35; // courier speed assumption
    const mins = Math.max(8, Math.min(30, Math.round((distance / speedMph) * 60)));
    return mins;
  }, [distance]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-400 selection:text-slate-900">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, #22d3ee, transparent 60%)" }} />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle at 70% 70%, #a78bfa, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(1200px 600px at 80% -10%, rgba(255,255,255,.06), transparent 60%)" }} />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20">
              <span className="text-sm font-extrabold">FX</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">FedEx Ice Cream</div>
              <div className="text-xs text-slate-400">Mini • Sugar‑Free • High‑Protein</div>
            </div>
          </div>
          <a href="#order" className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition">
            Order now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"/></svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 mb-4">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Delivered in 30 minutes or less
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Guilt‑Free Indulgence. Delivered in a Flash.
            </h1>
            <p className="mt-5 text-slate-300 text-lg">
              Mini-sized, sugar-free, low-calorie, and packed with protein. Your favorite treats shipped by FedEx speed straight to your door.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#flavors" className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition">Explore flavors</a>
              <a href="#order" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10 transition">Order now</a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"><div className="text-xl font-bold">0g</div><div className="text-xs text-slate-400">Added Sugar</div></div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"><div className="text-xl font-bold">10–12g</div><div className="text-xs text-slate-400">Protein</div></div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"><div className="text-xl font-bold">≤110</div><div className="text-xs text-slate-400">Calories</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-fuchsia-500/10 to-indigo-500/10 blur-2xl" />
            <div className="grid grid-cols-3 gap-6 perspective">
              <div className="translate-y-6 rotate-[-6deg]">
                <Cup colors={["#a78bfa", "#6366f1"]} />
              </div>
              <div className="-translate-y-2 rotate-3">
                <Cup colors={["#22d3ee", "#06b6d4"]} />
              </div>
              <div className="translate-y-10 rotate-[8deg]">
                <Cup colors={["#fb7185", "#f43f5e"]} />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <TruckIcon className="w-8 h-8" />
              <span>Fast. Reliable. FedEx powered.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-4">
        {[
          { title: "Guilt‑Free Indulgence", body: "Zero added sugar and low calories, crafted to satisfy without compromise." },
          { title: "Packed with Protein", body: "Each cup brings 10–12g protein to keep you fueled and feeling good." },
          { title: "Delivered in a Flash", body: "FedEx delivery gets your treats to your door in under 30 minutes." },
        ].map((v, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition">
            <div className="mb-3 text-lg font-semibold">{v.title}</div>
            <p className="text-slate-300 text-sm">{v.body}</p>
          </div>
        ))}
      </section>

      {/* Flavor Gallery */}
      <section id="flavors" className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Flavor gallery</h2>
          <p className="text-slate-400 text-sm">3D-style cards you can tilt</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVORS.map((f) => (
            <FlavorCard key={f.id} flavor={f} />
          ))}
        </div>
      </section>

      {/* Shipping timeline */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">From our freezer to your door</h2>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6">
          <div className="relative h-40">
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-fuchsia-500/30 to-indigo-500/30 rounded-full" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border border-white/20 shadow" style={{ left: `${(i + 1) * 20}%` }} />
              ))}
            </div>
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
              <div className="relative h-12">
                <div className="absolute -top-9 animate-[truck_6s_linear_infinite]">
                  <div className="-translate-x-1/2">
                    <TruckIcon className="w-14 h-14" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-4 right-4 bottom-3 grid grid-cols-5 text-xs text-slate-300">
              <div>Ordered</div>
              <div>Packed</div>
              <div>Dispatched</div>
              <div>En route</div>
              <div className="text-emerald-400 font-semibold">Delivered</div>
            </div>
          </div>
          <style>{`
            @keyframes truck {
              0% { transform: translateX(0%); }
              50% { transform: translateX(90%); }
              100% { transform: translateX(0%); }
            }
          `}</style>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">What customers say</h2>
          <div className="text-sm text-slate-400">4.9/5 average</div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial name="Ava R." tag="Runner" text="Perfect post‑run treat. Sweet without the crash, and delivery beat my cooldown." />
          <Testimonial name="Marcus T." tag="Parent" text="Kids love the minis, I love the macros. We order during movie nights and it’s here fast." />
          <Testimonial name="Jules K." tag="Designer" text="The texture is unreal. Feels premium, tastes clean, arrives in a flash." />
        </div>
      </section>

      {/* Order CTA */}
      <section id="order" className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="grid lg:grid-cols-2 gap-8 items-center relative">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready for a chill drop‑off?</h3>
              <p className="mt-2 text-slate-300">Estimate your delivery time and place your order. We’ll be there in 30 minutes or less.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-400 mb-2">Distance from nearest hub (mi)</label>
                  <input type="range" min="0" max="20" step="0.5" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} className="w-full accent-fuchsia-500" />
                  <div className="mt-1 text-xs text-slate-400">About {distance} miles</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-slate-400">Estimated time</div>
                  <div className="text-3xl font-extrabold">{estMins} min</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Guaranteed under 30 min</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={()=>alert('Order placed! A driver is on the way.')} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition">Place order</button>
                <a href="#flavors" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10 transition">Browse flavors</a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {FLAVORS.slice(0,3).map((f,i)=> (
                <div key={f.id} className={`relative ${i===1? 'translate-y-6':''}`}>
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-fuchsia-500/20 to-indigo-500/20 blur-xl" />
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Cup colors={f.colors} size={120} />
                    <div className="mt-3 text-sm font-semibold">{f.name}</div>
                    <div className="text-xs text-slate-400">{f.cals} cal • {f.protein}g protein • {f.sugar}g sugar</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} FedEx Ice Cream</div>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-200" href="#flavors">Flavors</a>
            <a className="hover:text-slate-200" href="#order">Order</a>
            <a className="hover:text-slate-200" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FlavorCard({ flavor }) {
  const { ref, onMouseMove, onLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-5 transition-transform will-change-transform"
      style={{ transform: "perspective(900px)" }}
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-fuchsia-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:from-fuchsia-500/10 group-hover:to-indigo-500/10 transition" />
      <div className="relative grid gap-4 place-items-center">
        <Cup colors={flavor.colors} />
        <div className="text-lg font-bold text-center">{flavor.name}</div>
        <p className="text-slate-300 text-sm text-center">{flavor.desc}</p>
        <div className="mt-2 grid grid-cols-3 gap-2 w-full text-center text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2"><div className="font-semibold">{flavor.cals}</div><div className="text-[10px] text-slate-400">Calories</div></div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2"><div className="font-semibold">{flavor.protein}g</div><div className="text-[10px] text-slate-400">Protein</div></div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2"><div className="font-semibold">{flavor.sugar}g</div><div className="text-[10px] text-slate-400">Sugar</div></div>
        </div>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition">
          Add to cart
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1l1.2 6.4A2 2 0 007.16 11h6.82a2 2 0 001.96-1.6L17 5H6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="16" r="1.5" /><circle cx="14" cy="16" r="1.5" /></svg>
        </button>
      </div>
    </div>
  );
}

function Testimonial({ name, tag, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 grid place-items-center font-bold text-slate-900">{name.split(" ")[0][0]}</div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-slate-400">{tag}</div>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-amber-300" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.31L10 14.9l-4.77 2.5.91-5.31L2.27 7.62l5.34-.78L10 2z"/></svg>
          ))}
        </div>
      </div>
      <p className="mt-4 text-slate-300">“{text}”</p>
    </div>
  );
}
