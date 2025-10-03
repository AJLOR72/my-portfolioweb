import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function StarField({ count = 1200 }){
  const pointsRef = useRef()
  const matRef = useRef()
  const [mouse, setMouse] = useState([0,0])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for(let i=0;i<count;i++){
      arr[i*3] = (Math.random() - 0.5) * 120
      arr[i*3+1] = (Math.random() - 0.5) * 80
      arr[i*3+2] = -Math.random() * 300
    }
    return arr
  }, [count])

  const scales = useMemo(() => {
    const arr = new Float32Array(count)
    for(let i=0;i<count;i++) arr[i] = 0.5 + Math.random() * 1.5
    return arr
  }, [count])

  const randoms = useMemo(() => {
    const arr = new Float32Array(count)
    for(let i=0;i<count;i++) arr[i] = Math.random()
    return arr
  }, [count])

  useFrame((state, delta) => {
    if(matRef.current){
      matRef.current.uniforms.uTime.value += delta
    }
    // gentle parallax follow
    if(pointsRef.current){
      pointsRef.current.rotation.y += 0.0003
      pointsRef.current.position.x += (mouse[0] - pointsRef.current.position.x) * 0.02
      pointsRef.current.position.y += (mouse[1] - pointsRef.current.position.y) * 0.02
    }
  })

  const vertexShader = `
    precision highp float;
    uniform float uTime;
    attribute float aScale;
    attribute float aRandom;
    varying float vRandom;
    void main(){
      vRandom = aRandom;
      vec3 pos = position;
      // basic projection
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      // twinkle influenced size
      float tw = sin(uTime * 2.0 + aRandom * 10.0) * 0.5 + 0.5;
      gl_PointSize = (aScale * (1.5 + tw * 3.0)) * (300.0 / -mvPosition.z);
    }
  `

  const fragmentShader = `
    precision highp float;
    uniform vec3 uColor;
    uniform float uTime;
    varying float vRandom;
    void main(){
      vec2 c = gl_PointCoord - vec2(0.5);
      float d = length(c);
      float alpha = smoothstep(0.5, 0.0, d);
      float flicker = 0.7 + 0.5 * sin(vRandom * 10.0 + uTime * 5.0);
      vec3 star = mix(vec3(0.9,0.93,1.0), uColor, vRandom * 0.6);
      gl_FragColor = vec4(star, alpha * flicker);
    }
  `

  return (
    <points ref={pointsRef} onPointerMove={(e)=> setMouse([ (e.clientX/window.innerWidth - 0.5) * 12, -(e.clientY/window.innerHeight - 0.5) * 8 ])}>
      <bufferGeometry>
        <bufferAttribute attachObject={['attributes','position']} count={positions.length/3} array={positions} itemSize={3} />
        <bufferAttribute attachObject={['attributes','aScale']} count={scales.length} array={scales} itemSize={1} />
        <bufferAttribute attachObject={['attributes','aRandom']} count={randoms.length} array={randoms} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial ref={matRef} attach="material" vertexShader={vertexShader} fragmentShader={fragmentShader} transparent={true} depthTest={false} blending={2} uniforms={{ uTime: { value: 0 }, uColor: { value: [0.8,0.85,1.0] } }} />
    </points>
  )
}

function VideoPlanet(){
  // Try to detect if the user has uploaded a video file to /public/videos
  const [hasVideo, setHasVideo] = useState(null)

  useEffect(() => {
    let mounted = true
    async function check(){
      try {
        // Try mp4 then webm
        const urls = [
          '/videos/planet.mp4',
          '/videos/planet.webm',
          '/videos/Blue Particles Luxury Awards Background, Particle zoom Led Light wall VJ Loop motion background New.mp4'
        ]
        for (const u of urls){
          try {
            const res = await fetch(u, { method: 'HEAD' })
            if (!mounted) return
            if (res.ok) { setHasVideo(u); return }
          } catch(e) {
            // ignore network errors per-url
          }
        }
      } catch(e) {
        // ignore
      }
      if (mounted) setHasVideo(false)
    }
    check()
    return () => { mounted = false }
  }, [])

  if (hasVideo === null) {
    // loading - don't render anything heavy yet
    return null
  }

  if (hasVideo) {
    return (
      <div className="video-planet-wrapper" aria-hidden>
        <video className="video-planet" playsInline muted loop autoPlay preload="auto" poster="/videos/planet-poster.jpg">
          <source src={hasVideo} />
          Your browser does not support the video background.
        </video>
      </div>
    )
  }

  // Fallback: CSS/SVG animated planet
  return (
    <div className="video-planet-wrapper" aria-hidden>
      <div className="css-planet" aria-hidden>
        <div className="css-planet-core" />
        <div className="css-planet-ring" />
      </div>
    </div>
  )
}

export default function Hero(){
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-canvas">
        <VideoPlanet />
        <Canvas camera={{ position: [0,0,10], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5,5,5]} intensity={0.6} />
          <StarField count={1200} />
          {/* Canvas-level 3D content remains for starfield; planet is now a video background */}
        </Canvas>
      </div>

      <div className="hero-content text-center px-6">
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }} className="text-5xl md:text-7xl font-extrabold glow-text">I'm Adhithya j — ML Engineer</motion.h1>
            <motion.p initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} className="mt-3 text-xl text-cosmic-200 font-semibold">Exploring the universe of intelligence</motion.p>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }} className="mt-6 text-lg max-w-2xl mx-auto text-slate-300">I build production-ready machine learning systems and immersive visualizations. Each project is presented as a mission log — objectives, tools, and results — that connects data with design.</motion.p>
      </div>
    </section>
  )
}
