
import Hero from '../../components/user/Hero'
import ProductGrid from '../../components/user/ProductGrid'
import NewsletterSection from '../../components/user/NewsletterSection'




function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProductGrid />
      <NewsletterSection />
    </div>
  )
}

export default HomePage
