import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const Avatar3D = dynamic(() => import('./Avatar3D'), { ssr: false })

export default function About(){
  const [useModel, setUseModel] = useState(false)
  const modelUrl = useModel ? '/models/me.glb' : null

  return (
    <section id="launch" className="py-24">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} className="mission-panel p-8 rounded-2xl flex gap-6 items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-transparent">
          <Avatar3D modelUrl={modelUrl} />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Launch</h2>
          <p className="text-slate-300 max-w-3xl">I'm an ML Engineer building production ML systems: data pipelines, model training, and MLOps. I love visualizing model behavior with interactive 3D scenes and explainability tools.</p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="avatar-toggle">
              <button onClick={() => setUseModel(false)} className={useModel ? '' : 'active'}>Fallback</button>
              <button onClick={() => setUseModel(true)} className={useModel ? 'active' : ''}>Model</button>
            </div>

            <div className="contact-actions flex gap-3 ml-0 sm:ml-6">
              <motion.a whileHover={{ y:-6 }} whileTap={{ scale:0.96 }} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.06 }} href="https://github.com/your-username" target="_blank" rel="noreferrer" className="contact-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.2-3.37-1.2-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor"/></svg>
                <span className="sr-only">GitHub</span>
              </motion.a>

              <motion.a whileHover={{ y:-6 }} whileTap={{ scale:0.96 }} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }} href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="contact-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4zM8.5 8h3.8v1.7h.1c.5-.9 1.8-1.8 3.6-1.8 3.8 0 4.5 2.5 4.5 5.6V20h-4v-5.3c0-1.3 0-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9V20h-4z" fill="currentColor"/></svg>
                <span className="sr-only">LinkedIn</span>
              </motion.a>

              <motion.a whileHover={{ y:-6 }} whileTap={{ scale:0.96 }} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }} href="mailto:you@example.com" className="contact-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
                <span className="sr-only">Email</span>
              </motion.a>

              <motion.a whileHover={{ y:-6 }} whileTap={{ scale:0.96 }} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.24 }} href="/resume.pdf" target="_blank" rel="noreferrer" className="contact-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor"/></svg>
                <span className="sr-only">Resume</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
