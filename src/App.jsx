import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import SellerDrawer from './components/SellerDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [sellerOpen, setSellerOpen] = useState(false)
  const [cart, setCart] = useState([])

  const refresh = async () => {
    const res = await fetch(`${API_BASE}/products`).catch(()=>null)
    if (res) {
      const data = await res.json()
      setProducts(data)
    }
    const cr = await fetch(`${API_BASE}/cart`).catch(()=>null)
    if (cr) {
      const cdata = await cr.json()
      setCart(cdata.items || [])
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        await fetch(`${API_BASE}/seed`).then(() => {})
        await refresh()
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const handleAdd = async (product, size) => {
    try {
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
      await refresh()
      setCartOpen(true)
    } catch (e) {
      console.error(e)
      alert('Could not add to cart')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar cartCount={cart.length} onCart={()=>setCartOpen(true)} onSeller={()=>setSellerOpen(true)} />
      <Hero onShop={() => {
        const el = document.getElementById('products');
        el?.scrollIntoView({ behavior: 'smooth' })
      }} />

      <section id="products" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-[conic-gradient(at_top_left,_#fff,#f0abfc,#22d3ee,#fff)]">Latest Drop</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.title} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart} />
      <SellerDrawer open={sellerOpen} onClose={()=>setSellerOpen(false)} onCreated={refresh} apiBase={API_BASE} />
    </div>
  )
}
