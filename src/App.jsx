import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function cn(...classes){
  return classes.filter(Boolean).join(' ')
}

// Simple i18n content
const copy = {
  it: {
    nav: {
      home: 'Home',
      collections: 'Collezioni',
      shop: 'Shop',
      brand: 'Il Brand',
      care: 'Cura & Materiali',
      contact: 'Contatti'
    },
    hero: {
      title: 'LONAIRE',
      subtitle: 'Gioielli dal riflesso lunare',
      ctaCollections: 'Scopri le collezioni',
      ctaShop: 'Vai allo shop'
    },
    sections: {
      collectionsTitle: 'Collezioni',
      steel: 'Acciaio',
      silver: 'Argento',
      stones: 'Pietre',
    },
    newsletter: {
      title: 'Newsletter',
      subtitle: 'Rimani nella nostra luce soffusa. Novità, collezioni e offerte riservate.',
      placeholder: 'La tua email',
      button: 'Iscrivimi',
      success: 'Grazie, sei iscritta/o!'
    },
    contact: {
      title: 'Contatti',
      subtitle: 'Scrivici: risponderemo come un raggio di luna nella notte.',
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      send: 'Invia',
      success: 'Messaggio inviato. Ti risponderemo presto.'
    },
    shop: {
      title: 'Shop',
      filters: 'Filtri',
      material: 'Materiale',
      stone: 'Pietra',
      price: 'Prezzo',
      availability: 'Disponibilità',
      available: 'Disponibile',
      apply: 'Applica',
      clear: 'Pulisci filtri'
    },
    brand: {
      title: 'Il Brand',
      body: 'LONAIRE nasce in Italia, dove la luce della luna accarezza l\'acciaio e l\'argento. Disegni moderni, anima femminile, dettagli delicati.'
    },
    care: {
      title: 'Cura & Materiali',
      body: 'Acciaio e argento di qualità, pensati per durare. Conserva i gioielli lontano da umidità e profumi, puliscili con panni morbidi e luce gentile.'
    },
    footer: {
      rights: '© ' + new Date().getFullYear() + ' LONAIRE. Tutti i diritti riservati.',
      privacy: 'Privacy',
      cookies: 'Cookie',
      terms: 'Termini di vendita'
    }
  },
  en: {
    nav: {
      home: 'Home',
      collections: 'Collections',
      shop: 'Shop',
      brand: 'The Brand',
      care: 'Care & Materials',
      contact: 'Contact'
    },
    hero: {
      title: 'LONAIRE',
      subtitle: 'Jewels with a lunar glow',
      ctaCollections: 'Explore collections',
      ctaShop: 'Visit shop'
    },
    sections: {
      collectionsTitle: 'Collections',
      steel: 'Steel',
      silver: 'Silver',
      stones: 'Stones',
    },
    newsletter: {
      title: 'Newsletter',
      subtitle: 'Stay in our soft light. News, collections and exclusive offers.',
      placeholder: 'Your email',
      button: 'Subscribe',
      success: 'Thanks, you are subscribed!'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Write to us — we will answer like moonlight in the night.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      success: 'Message sent. We\'ll get back to you soon.'
    },
    shop: {
      title: 'Shop',
      filters: 'Filters',
      material: 'Material',
      stone: 'Stone',
      price: 'Price',
      availability: 'Availability',
      available: 'Available',
      apply: 'Apply',
      clear: 'Clear filters'
    },
    brand: {
      title: 'The Brand',
      body: 'Born in Italy, where moonlight caresses steel and silver. Modern design with a feminine soul and delicate details.'
    },
    care: {
      title: 'Care & Materials',
      body: 'High-quality steel and silver, made to last. Keep jewelry away from humidity and perfume, clean with soft cloths and gentle light.'
    },
    footer: {
      rights: '© ' + new Date().getFullYear() + ' LONAIRE. All rights reserved.',
      privacy: 'Privacy',
      cookies: 'Cookies',
      terms: 'Terms of Sale'
    }
  }
}

function useLang(){
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'it')
  useEffect(()=>{ localStorage.setItem('lang', lang) },[lang])
  const t = useMemo(()=>copy[lang], [lang])
  return { lang, setLang, t }
}

function Navbar({t, lang, setLang}){
  const linkClass = ({isActive}) => cn('px-3 py-2 text-sm sm:text-base transition-colors', isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800')
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        <Link to="/" className="font-serif tracking-widest text-xl sm:text-2xl text-slate-900">LONAIRE</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass}>{t.nav.home}</NavLink>
          <NavLink to="/collections" className={linkClass}>{t.nav.collections}</NavLink>
          <NavLink to="/shop" className={linkClass}>{t.nav.shop}</NavLink>
          <NavLink to="/brand" className={linkClass}>{t.nav.brand}</NavLink>
          <NavLink to="/care" className={linkClass}>{t.nav.care}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t.nav.contact}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={()=> setLang(lang === 'it' ? 'en' : 'it')} className="text-xs sm:text-sm px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-white shadow-sm">
            {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({t}){
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/HldEaEeFcKnMlQB3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-white/90 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-6xl tracking-[0.2em] text-slate-900">{t.hero.title}</h1>
        <p className="mt-4 text-slate-600 text-lg sm:text-xl">{t.hero.subtitle}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/collections" className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">{t.hero.ctaCollections}</Link>
          <Link to="/shop" className="px-6 py-3 rounded-full border border-slate-300 text-slate-800 bg-white/70 hover:bg-white transition">{t.hero.ctaShop}</Link>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({children}){
  return <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 tracking-wide">{children}</h2>
}

function Homepage({t}){
  return (
    <main>
      <Hero t={t} />
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          {key:'acciaio', name:t.sections.steel, img:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop'},
          {key:'argento', name:t.sections.silver, img:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop'},
          {key:'pietre', name:t.sections.stones, img:'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop'}
        ].map((c)=> (
          <Link to={`/collections?key=${c.key}`} key={c.key} className="group relative overflow-hidden rounded-2xl bg-slate-100">
            <img src={c.img} alt={c.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"/>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="font-serif text-xl tracking-widest">{c.name}</div>
              <div className="text-sm text-slate-200">{t.hero.subtitle}</div>
            </div>
          </Link>
        ))}
      </section>
      <Newsletter t={t} />
    </main>
  )
}

function Newsletter({t}){
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const subscribe = async (e)=>{
    e.preventDefault()
    try{
      const res = await fetch(`${BACKEND_URL}/api/newsletter`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, language: 'it' })})
      if(res.ok){ setDone(true); setEmail('') }
    }catch(err){ console.error(err) }
  }
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionTitle>{t.newsletter.title}</SectionTitle>
        <p className="mt-2 text-slate-600">{t.newsletter.subtitle}</p>
        <form onSubmit={subscribe} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder={t.newsletter.placeholder} className="px-4 py-3 rounded-full border border-slate-300 bg-white/70 backdrop-blur w-full sm:w-80" />
          <button className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800">{t.newsletter.button}</button>
        </form>
        {done && <p className="mt-3 text-emerald-600">{t.newsletter.success}</p>}
      </div>
    </section>
  )
}

function CollectionsPage({t}){
  const params = new URLSearchParams(window.location.search)
  const key = params.get('key') || 'acciaio'
  const texts = {
    acciaio: {
      title: t.sections.steel,
      desc_it: 'Linee pure e riflessi freddi: l\'acciaio cattura la luce lunare con forza gentile.'
    },
    argento: {
      title: t.sections.silver,
      desc_it: 'Argento come brina notturna: delicato, luminoso, eterno.'
    },
    pietre: {
      title: t.sections.stones,
      desc_it: 'Bagliori di pietre e zirconi: piccole stelle sulla pelle.'
    }
  }
  const data = texts[key]
  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle>{t.sections.collectionsTitle}</SectionTitle>
        <div className="mt-6 flex gap-2">
          {['acciaio','argento','pietre'].map(k=> (
            <a key={k} href={`?key=${k}`} className={cn('px-4 py-2 rounded-full border', key===k ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700')}>{texts[k].title}</a>
          ))}
        </div>
        <p className="mt-6 text-slate-600">{data.desc_it}</p>
        <ProductsGrid initialCollection={key} />
      </div>
    </main>
  )
}

function ShopPage({t}){
  return (
    <main className="pt-20 max-w-6xl mx-auto px-6">
      <div className="flex items-end justify-between">
        <SectionTitle>{t.shop.title}</SectionTitle>
      </div>
      <FiltersBar />
      <ProductsGrid />
    </main>
  )
}

function FiltersBar(){
  const [material, setMaterial] = useState('')
  const [stone, setStone] = useState('')
  const [available, setAvailable] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const apply = ()=>{
    const params = new URLSearchParams()
    if(material) params.set('material', material)
    if(stone) params.set('stone', stone)
    if(available) params.set('available', available)
    if(minPrice) params.set('min_price', minPrice)
    if(maxPrice) params.set('max_price', maxPrice)
    const url = `/shop?${params.toString()}`
    window.history.pushState({}, '', url)
    window.dispatchEvent(new Event('popstate'))
  }
  const clear = ()=>{
    window.history.pushState({}, '', '/shop')
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
      <select value={material} onChange={e=>setMaterial(e.target.value)} className="px-3 py-2 rounded-full border border-slate-300"><option value="">Materiale</option><option value="acciaio">Acciaio</option><option value="argento">Argento</option></select>
      <input value={stone} onChange={e=>setStone(e.target.value)} placeholder="Pietra" className="px-3 py-2 rounded-full border border-slate-300" />
      <select value={available} onChange={e=>setAvailable(e.target.value)} className="px-3 py-2 rounded-full border border-slate-300"><option value="">Disponibilità</option><option value="true">Disponibile</option><option value="false">Esaurito</option></select>
      <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Prezzo min" className="px-3 py-2 rounded-full border border-slate-300" />
      <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Prezzo max" className="px-3 py-2 rounded-full border border-slate-300" />
      <div className="flex gap-2">
        <button onClick={apply} className="px-4 py-2 rounded-full bg-slate-900 text-white">Applica</button>
        <button onClick={clear} className="px-4 py-2 rounded-full border border-slate-300">Pulisci</button>
      </div>
    </div>
  )
}

function ProductsGrid({initialCollection}){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async ()=>{
    setLoading(true)
    try{
      const params = new URLSearchParams(window.location.search)
      if(initialCollection && !params.get('collection_key')){
        params.set('collection_key', initialCollection)
      }
      const res = await fetch(`${BACKEND_URL}/api/products?` + params.toString())
      const data = await res.json()
      setProducts(data)
    }catch(e){ console.error(e) }
    setLoading(false)
  }

  useEffect(()=>{
    fetchProducts()
    const handler = ()=> fetchProducts()
    window.addEventListener('popstate', handler)
    return ()=> window.removeEventListener('popstate', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="mt-8">
      {loading && <p className="text-slate-500">Caricamento…</p>}
      {!loading && products.length === 0 && <p className="text-slate-500">Nessun prodotto trovato.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p)=> (
          <div key={p.sku} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="aspect-[4/3] bg-slate-100">
              <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop'} alt={p.title_it} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <div className="font-serif text-slate-900 tracking-wide">{p.title_it}</div>
              <div className="text-slate-500 text-sm">{p.material}{p.stone ? ` · ${p.stone}` : ''}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-slate-900">€ {p.price.toFixed(2)}</div>
                <button className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50">Aggiungi</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandPage({t}){
  return (
    <main className="pt-20">
      <section className="max-w-3xl mx-auto px-6">
        <SectionTitle>{t.brand.title}</SectionTitle>
        <p className="mt-4 text-slate-600 leading-relaxed">
          {t.brand.body}
        </p>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <img className="rounded-xl" src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop" alt="LONAIRE mood"/>
          <img className="rounded-xl" src="https://images.unsplash.com/photo-1633174294583-696d6d81b323?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMT05BSVJFJTIwc2lsdmVyfGVufDB8MHx8fDE3NjI4NzM1NzN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="LONAIRE silver"/>
        </div>
      </section>
      <Newsletter t={t} />
    </main>
  )
}

function CarePage({t}){
  return (
    <main className="pt-20 max-w-3xl mx-auto px-6">
      <SectionTitle>{t.care.title}</SectionTitle>
      <div className="mt-4 text-slate-600 space-y-4">
        <p>{t.care.body}</p>
        <ul className="list-disc pl-6">
          <li>Evita acqua salata e prodotti chimici aggressivi.</li>
          <li>Riponi i gioielli in sacchetti morbidi separati.</li>
          <li>Pulisci con panni in microfibra e movimenti delicati.</li>
        </ul>
      </div>
    </main>
  )
}

function ContactPage({t}){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [done, setDone] = useState(false)
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await fetch(`${BACKEND_URL}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, language:'it' }) })
      if(res.ok){ setDone(true); setForm({name:'', email:'', message:''}) }
    }catch(err){ console.error(err) }
  }
  return (
    <main className="pt-20 max-w-xl mx-auto px-6">
      <SectionTitle>{t.contact.title}</SectionTitle>
      <p className="mt-2 text-slate-600">{t.contact.subtitle}</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required placeholder={t.contact.name} className="w-full px-4 py-3 rounded-xl border border-slate-300" />
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required placeholder={t.contact.email} className="w-full px-4 py-3 rounded-xl border border-slate-300" />
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required placeholder={t.contact.message} rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-300" />
        <button className="px-6 py-3 rounded-full bg-slate-900 text-white">{t.contact.send}</button>
      </form>
      {done && <p className="mt-3 text-emerald-600">{t.contact.success}</p>}
      <div className="mt-10">
        <p className="text-slate-600">Instagram · Pinterest · TikTok</p>
        <div className="mt-2 flex gap-4 text-slate-700">
          <a className="underline" href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a className="underline" href="#" target="_blank" rel="noreferrer">Pinterest</a>
          <a className="underline" href="#" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </main>
  )
}

function Footer({t}){
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-serif text-xl">LONAIRE</div>
          <p className="mt-2 text-slate-600">{copy.it.hero.subtitle}</p>
        </div>
        <div className="text-slate-600 flex gap-6">
          <Link to="/privacy" className="hover:text-slate-900">{t.footer.privacy}</Link>
          <Link to="/cookies" className="hover:text-slate-900">{t.footer.cookies}</Link>
          <Link to="/terms" className="hover:text-slate-900">{t.footer.terms}</Link>
        </div>
        <div className="text-slate-500 text-sm">{t.footer.rights}</div>
      </div>
    </footer>
  )
}

function SimplePage({title, children}){
  return (
    <main className="pt-20 max-w-3xl mx-auto px-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-4 text-slate-600 space-y-4">{children}</div>
    </main>
  )
}

export default function App(){
  const { lang, setLang, t } = useLang()
  useEffect(()=>{ document.title = `${t.hero.title} – ${t.hero.subtitle}` },[t])
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-800 font-sans">
        <Navbar t={t} lang={lang} setLang={setLang} />
        <Routes>
          <Route path="/" element={<Homepage t={t} />} />
          <Route path="/collections" element={<CollectionsPage t={t} />} />
          <Route path="/shop" element={<ShopPage t={t} />} />
          <Route path="/brand" element={<BrandPage t={t} />} />
          <Route path="/care" element={<CarePage t={t} />} />
          <Route path="/contact" element={<ContactPage t={t} />} />
          <Route path="/privacy" element={<SimplePage title="Privacy">Informativa privacy in aggiornamento.</SimplePage>} />
          <Route path="/cookies" element={<SimplePage title="Cookie">Informativa cookie in aggiornamento.</SimplePage>} />
          <Route path="/terms" element={<SimplePage title="Termini di vendita">Termini di vendita in aggiornamento.</SimplePage>} />
        </Routes>
        <Footer t={t} />
      </div>
    </BrowserRouter>
  )
}
