import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function OrbitalTimeline({ items = [] }){
  if(!items || items.length === 0) return null
  const [active, setActive] = useState(null)
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const itemRefs = useRef([])

  const popupVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }

  useTimelineEffects(containerRef, scrollRef, itemRefs, active, setActive)

  return (
    <section className="py-12">
      <h3 className="text-xl font-semibold mb-6">Project Timeline</h3>

      <div ref={containerRef} className="timeline-container relative">
        {/* connecting line */}
        <div className="timeline-line" aria-hidden />

        <div ref={scrollRef} className="timeline-scroll flex gap-10 items-center">
          {items.map((it, idx) => (
            <div ref={(el) => itemRefs.current[idx] = el} key={it.title + idx} className="timeline-item flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="timeline-node-wrapper"
                onClick={() => setActive(active === idx ? null : idx)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActive(active === idx ? null : idx) }}
                  className={`timeline-node mission-panel p-4 rounded-md text-center cursor-pointer ${active === idx ? 'active' : ''}`}
                  aria-expanded={active === idx}
                >
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-slate-300 text-xs mt-1">{it.date}</div>
                </div>

                <AnimatePresence>
                  {active === idx && (
                    <motion.div
                      className="timeline-popup mission-panel p-4 mt-3 text-sm"
                      key={`popup-${idx}`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={popupVariants}
                      transition={{ duration: 0.18 }}
                      style={{ pointerEvents: 'auto' }}
                      aria-hidden={active !== idx}
                    >
                      <div className="font-semibold mb-1">{it.title}</div>
                      <div className="text-slate-300 text-xs">{it.desc}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Effects: close on outside click and center active item
function useTimelineEffects(containerRef, scrollRef, itemRefs, active, setActive) {
  useEffect(() => {
    function onPointer(e){
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) setActive(null)
    }
    document.addEventListener('pointerdown', onPointer)

    function onKey(e){ if (e.key === 'Escape') setActive(null) }
    document.addEventListener('keydown', onKey)

    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey) }
  }, [containerRef, setActive])

  useEffect(() => {
    if (active == null) return
    const scrollEl = scrollRef.current
    const itemEl = itemRefs.current[active]
    if (scrollEl && itemEl) {
      const scrollRect = scrollEl.getBoundingClientRect()
      const itemRect = itemEl.getBoundingClientRect()
      const left = scrollEl.scrollLeft + (itemRect.left - scrollRect.left) - (scrollRect.width / 2) + (itemRect.width / 2)
      scrollEl.scrollTo({ left, behavior: 'smooth' })
    }
  }, [active, scrollRef, itemRefs])
}

// Hook up effects by wrapping the exported component's container
// (We call the hook directly inside component scope by re-importing useEffect above.)
