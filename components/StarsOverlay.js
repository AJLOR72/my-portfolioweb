import { useMemo } from 'react'

export default function StarsOverlay({ count = 60 }){
  const stars = useMemo(() => {
    const s = []
    for(let i=0;i<count;i++){
      s.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.6 + Math.random() * 2.6,
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 4
      })
    }
    return s
  }, [count])

  return (
    <div className="page-stars" aria-hidden>
      {stars.map(st => (
        <div key={st.id} className="page-star" style={{ left: `${st.left}%`, top: `${st.top}%`, width: `${st.size}px`, height: `${st.size}px`, animationDelay: `${st.delay}s`, animationDuration: `${st.duration}s` }} />
      ))}
    </div>
  )
}
