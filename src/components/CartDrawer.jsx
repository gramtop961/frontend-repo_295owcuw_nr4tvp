import { X } from 'lucide-react'

export default function CartDrawer({ open, onClose, items }) {
  const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0)

  return (
    <div className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-950 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><X className="w-5 h-5 text-white/70" /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 && (
            <p className="text-white/60">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3">
              {it.image && <img src={it.image} alt={it.title} className="w-16 h-16 rounded-lg object-cover" />}
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{it.title}</div>
                <div className="text-white/60 text-xs">Size {it.size} • Qty {it.quantity}</div>
              </div>
              <div className="text-fuchsia-300 font-semibold text-sm">${(it.price * it.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-sm text-white/70">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-semibold">Proceed to checkout</button>
        </div>
      </aside>
    </div>
  )
}
