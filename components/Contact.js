import { motion } from 'framer-motion'

export default function Contact(){
  return (
    <section id="transmission" className="py-24">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="mission-panel p-8 rounded-2xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Transmission</h2>
        <form className="space-y-4">
          <input className="w-full p-3 rounded bg-transparent border border-white/10 focus:border-glow outline-none" placeholder="Your name" />
          <input className="w-full p-3 rounded bg-transparent border border-white/10 focus:border-glow outline-none" placeholder="Email" />
          <textarea className="w-full p-3 rounded bg-transparent border border-white/10 focus:border-glow outline-none" rows={5} placeholder="Message" />
          <div className="flex justify-end">
            <button className="px-6 py-2 rounded bg-glow text-black font-semibold">Send</button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
