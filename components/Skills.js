import { motion } from 'framer-motion'

const skills = [
  { name: 'Python', level: 95 },
  { name: 'PyTorch', level: 90 },
  { name: 'MLOps', level: 85 },
  { name: 'Data Viz', level: 80 }
]

function Circular({ size=96, value=75 }){
  const r = 40
  const c = 2 * Math.PI * r
  const dash = c * (value/100)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7c6cff" />
          <stop offset="100%" stopColor="#00f7ff" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" stroke="#111827" strokeWidth="12" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="url(#g)" strokeWidth="12" fill="none" strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round" transform="rotate(-90 50 50)" />
      <text x="50" y="55" textAnchor="middle" fontSize="12" fill="#cbd5e1">{value}%</text>
    </svg>
  )
}

export default function Skills(){
  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {skills.map((s,i)=> (
          <motion.div key={s.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }} className="mission-panel p-6 rounded-xl text-center flex flex-col items-center gap-4">
            <div className="w-28 h-28 orbit-wrapper">
              <Circular value={s.level} />
              <div className="orbit" style={{ transformOrigin: '50% 50%' }}>
                <div className="node" style={{ transform: 'translateX(-120px) rotate(0deg)' }}>
                  <div className="w-3 h-3 rounded-full bg-glow" />
                </div>
              </div>
            </div>
            <h4 className="font-semibold">{s.name}</h4>
            <div className="text-slate-300 mt-2">{s.level}% proficiency</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
