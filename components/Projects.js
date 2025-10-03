import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'AstroNet', desc: 'A CNN trained to classify astronomical images with explainable saliency maps.', tech: ['PyTorch','ONNX','React'], github:'#', demo:'#' },
  { title: 'OrbitPredict', desc: 'Trajectory prediction with probabilistic models and a live 3D simulator.', tech: ['TensorFlow','Flax','gRPC'], github:'#', demo:'#' },
  { title: 'MLOps Launchpad', desc: 'CI/CD for ML: automated training, model registry, and scalable serving.', tech: ['Docker','Kubernetes','MLflow'], github:'#', demo:'#' }
]

export default function Projects(){
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.project-card') || []
      cards.forEach((card, i) => {
        gsap.fromTo(card, { x:0, y: 120, rotation: 6, opacity: 0, scale: 0.92 }, {
          x:0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
            onEnter: () => { card.classList.add('appear') },
            onLeaveBack: () => { card.classList.remove('appear') }
          },
          onComplete: () => gsap.set(card, { clearProps: 'transform' })
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="missions" className="py-24">
      <h2 className="text-3xl font-bold mb-6">Missions</h2>
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div key={p.title} whileHover={{ y:-12, rotateX:2, scale:1.02 }} initial={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="project-card mission-panel p-6 rounded-xl shadow-glow">
            <div className="h-40 relative rounded-md mb-4 flex items-center justify-center planet-thumb-wrapper overflow-hidden">
              {/* planet-like thumbnail */}
              <div className="planet-thumb" aria-hidden />
              {/* small constellation SVG that will be drawn in */}
              <svg className="constellation" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <polyline className="const-line" points="10,60 30,30 50,50 70,20 90,40 110,10" fill="none" stroke="rgba(180,200,255,0.88)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                { /* small star nodes */ }
                <circle cx="30" cy="30" r="1.8" fill="#fff" />
                <circle cx="70" cy="20" r="1.6" fill="#fff" />
                <circle cx="110" cy="10" r="1.2" fill="#fff" />
              </svg>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl">{p.title}</h3>
                <p className="text-slate-300 mt-2">{p.desc}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-xs text-cosmic-200 font-medium">Mission Log</div>
                  <ul className="text-slate-300 text-sm list-inside list-disc ml-4">
                    <li><strong>Objective:</strong> Improve classification accuracy and interpretability.</li>
                    <li><strong>Tools:</strong> {p.tech.join(', ')}</li>
                    <li><strong>Result:</strong> Productionized model with 92% test accuracy and explainable maps.</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <a href={p.demo} className="text-xs underline">Live</a>
                <a href={p.github} className="text-xs underline">GitHub</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
