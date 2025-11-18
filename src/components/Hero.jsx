import { Sparkles, ShoppingCart, Star } from 'lucide-react'

export default function Hero({ onShop }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradients & chromatic opium vibe */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="absolute -bottom-40 -right-40 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-25 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-400 via-emerald-400 to-fuchsia-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/80 mb-5">
          <Sparkles className="w-4 h-4 text-fuchsia-300" />
          <span className="text-xs tracking-widest">Y2K CHROMA DROP</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-fuchsia-200 to-fuchsia-500 drop-shadow-[0_2px_24px_rgba(236,72,153,0.35)]">
          Swag Atelier
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/70">
          A clean, ultra-modern clothing store with liquid chrome accents and bold Y2K energy. Simple by design. Heavy on vibe.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onShop} className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 text-white font-semibold shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 transition-all">
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Shop the drop
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-all">
            <Star className="w-5 h-5 text-amber-300" /> Featured
          </button>
        </div>
      </div>
    </section>
  )
}
