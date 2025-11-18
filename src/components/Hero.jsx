import { Sparkles, ShoppingCart, Star } from 'lucide-react'

export default function Hero({ onShop }) {
  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
      {/* Background gradients & chromatic opium vibe */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_left,_#06b6d4,#a78bfa,#f472b6,#06b6d4)]" />
        <div className="absolute -bottom-48 -right-48 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_70%,_rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/0 via-fuchsia-400/60 to-cyan-400/0" />
      </div>

      <div className="text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/80 mb-5">
          <Sparkles className="w-4 h-4 text-fuchsia-300" />
          <span className="text-xs tracking-widest">CHROMA // NEO-FUTURE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,_#fff_0%,_#e9d5ff_40%,_#f0abfc_60%,_#22d3ee_100%)] drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          Swag Atelier
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/70">
          Neo-futurist streetwear — liquid chrome, candy gradients and club energy. Think Oreo Fruit: glossy, playful, premium.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onShop} className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[conic-gradient(at_bottom_left,_#f472b6,_#a78bfa,_#22d3ee,_#f472b6)] text-white font-semibold shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 transition-all">
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
