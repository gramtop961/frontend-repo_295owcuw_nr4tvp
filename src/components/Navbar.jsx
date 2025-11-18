import { ShoppingCart, Menu } from 'lucide-react'

export default function Navbar({ cartCount, onCart }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5"><Menu className="w-5 h-5 text-white/70" /></button>
          <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-200 to-fuchsia-500">Swag Atelier</span>
        </div>
        <button onClick={onCart} className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 border border-white/10 hover:bg-white/10">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-fuchsia-500 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
