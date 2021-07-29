import BaseMeta from '../components/BaseMeta'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <BaseMeta title="Isaac &quot;Yak&quot; Litzenberger&apos;s Portfolio - isaacyakl.com" desc="Isaac &quot;Yak&quot; Litzenberger&apos;s Portfolio"></BaseMeta>
      <Hero></Hero>
      <main role="main">
        <About></About>
        <Skills></Skills>
        <Experience></Experience>
      </main>
      <Footer></Footer>
    </>
  )
}
