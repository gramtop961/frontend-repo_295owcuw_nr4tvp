import { useState } from 'react'
import { X, Upload } from 'lucide-react'

export default function SellerDrawer({ open, onClose, onCreated, apiBase }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'apparel',
    in_stock: true,
    sizes: 'XS,S,M,L,XL',
    image: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        price: Number(form.price || 0),
        category: form.category || 'apparel',
        in_stock: !!form.in_stock,
        sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
        image: form.image.trim() || undefined,
      }
      const res = await fetch(`${apiBase}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      setForm({ title: '', description: '', price: '', category: 'apparel', in_stock: true, sizes: 'XS,S,M,L,XL', image: '' })
      onCreated?.()
      onClose?.()
    } catch (err) {
      alert('Could not create product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[520px] bg-slate-950 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="relative p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Seller Portal</h3>
            <p className="text-xs text-white/60">List a new item — keep it chroma.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><X className="w-5 h-5 text-white/70" /></button>
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-400/60 to-cyan-400/0" />
        </div>

        <form onSubmit={submit} className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          <div className="grid grid-cols-1 gap-4">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
            <Textarea label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price ($)" name="price" value={form.price} onChange={handleChange} type="number" step="0.01" min="0" required />
              <Input label="Category" name="category" value={form.category} onChange={handleChange} />
            </div>
            <Input label="Sizes (comma separated)" name="sizes" value={form.sizes} onChange={handleChange} />
            <Input label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
            <label className="flex items-center gap-2 text-white/80 text-sm">
              <input type="checkbox" name="in_stock" checked={form.in_stock} onChange={handleChange} className="accent-fuchsia-500" />
              In stock
            </label>
          </div>

          <button disabled={loading} className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 text-white font-semibold shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 disabled:opacity-60 inline-flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" /> {loading ? 'Publishing…' : 'Publish item'}
          </button>
        </form>
      </aside>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
      <input {...props} className="mt-1 w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50" />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
      <textarea {...props} className="mt-1 w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50" />
    </label>
  )
}
