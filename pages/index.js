import Head from 'next/head'
import Hero from '../components/Hero'
import StarsOverlay from '../components/StarsOverlay'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import OrbitalTimeline from '../components/OrbitalTimeline'

export default function Home(){
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Head>
        <title>Space Portfolio</title>
        <meta name="description" content="Astronomy-inspired portfolio" />
      </Head>

      <main>
        <Hero />
        <StarsOverlay />
        <div className="container">
          <About />
          <Projects />
          <OrbitalTimeline items={[{ title: 'AstroNet', date: '2024' }, { title: 'MLOps Launchpad', date: '2023' }, { title: 'OrbitPredict', date: '2022' }]} />
          <Skills />
          <Contact />
        </div>
      </main>
    </div>
  )
}
