import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        // seed then fetch products
        await fetch(`${API_BASE}/seed`).then(() => {})
        const res = await fetch(`${API_BASE}/products`)
        const data = await res.json()
        setProducts(data)
        // load cart
        const cr = await fetch(`${API_BASE}/cart`)
        const cdata = await cr.json()
        setCart(cdata.items || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const handleAdd = async (product, size) => {
    try {
      // Need product id: since /products omits _id, fetch by title for demo
      // In a real app, backend would return _id; here we re-fetch list with ids
      const full = await fetch(`${API_BASE}/cart`).then(r=>r.json()).catch(()=>({items:[]}))
      // Fallback add without id (won't persist). We'll call a minimal lookup endpoint soon if needed.
      const lookup = await fetch(`${API_BASE}/products-full`).then(r=>r.json()).catch(()=>[])
      const match = Array.isArray(lookup) ? lookup.find(p=>p.title===product.title) : null
      if (!match || !match._id) {
        alert('Adding to cart requires backend id; please try again after a moment.')
        return
      }
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: match._id, size, quantity: 1 })
      })
      if (!res.ok) throw new Error('Failed to add to cart')
      const c = await fetch(`${API_BASE}/cart`).then(r=>r.json())
      setCart(c.items || [])
      setCartOpen(true)
    } catch (e) {
      console.error(e)
      alert('Could not add to cart')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar cartCount={cart.length} onCart={()=>setCartOpen(true)} />
      <Hero onShop={() => {
        const el = document.getElementById('products');
        el?.scrollIntoView({ behavior: 'smooth' })
      }} />

      <section id="products" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-fuchsia-300">Latest Drop</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.title} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart} />
    </div>
  )
}
