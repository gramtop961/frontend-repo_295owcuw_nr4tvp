import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState(product.sizes?.[0] || 'M')

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-fuchsia-400/40 transition-all">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-white font-semibold tracking-tight">{product.title}</h3>
            <p className="text-white/60 text-sm line-clamp-2">{product.description}</p>
          </div>
          <div className="text-fuchsia-300 font-bold">${product.price.toFixed(2)}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
            {(product.sizes || ['XS','S','M','L','XL']).map(s => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 rounded-full text-xs border ${size===s ? 'bg-fuchsia-500 text-white border-fuchsia-400' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => onAdd(product, size)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white text-sm font-semibold shadow hover:opacity-90">
            <ShoppingBag className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
      {/* subtle chroma border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-fuchsia-400/40" />
    </div>
  )
}
