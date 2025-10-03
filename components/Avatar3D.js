import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import { useGLTF, useProgress, Html } from '@react-three/drei'

function FallbackAvatar(){
  const ref = useRef()
  useFrame((state, delta) => { if(ref.current) ref.current.rotation.y += delta * 0.5 })
  return (
    <group ref={ref}>
      <mesh position={[0,0,0]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color={'#7c6cff'} metalness={0.3} roughness={0.4} emissive={'#120a33'} emissiveIntensity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI/2,0,0]} position={[0,-1.2,0]}>
        <ringGeometry args={[1.1,1.4,64]} />
        <meshBasicMaterial color={'#1f2937'} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ModelLoader({ url }){
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} scale={0.8} />
}

export default function Avatar3D({ modelUrl = null, className='w-28 h-28' }){
  const [modelAvailable, setModelAvailable] = useState(null) // null=unknown, true/false

  useEffect(() => {
    let cancelled = false
    if(!modelUrl){
      setModelAvailable(false)
      return
    }
    // Quick HEAD check to see if model exists to avoid useGLTF throwing a 404
    fetch(modelUrl, { method: 'HEAD' }).then(res => {
      if(!cancelled) setModelAvailable(res.ok)
    }).catch(() => { if(!cancelled) setModelAvailable(false) })
    return () => { cancelled = true }
  }, [modelUrl])

  return (
    <div className={className}>
      <Canvas camera={{ position: [0,0,3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2,2,2]} intensity={0.8} />
        <Suspense fallback={null}>
          {modelUrl && modelAvailable === true ? <ModelLoader url={modelUrl} /> : <FallbackAvatar />}
        </Suspense>
        {/* Loader overlay rendered inside the canvas using Html */}
        <CanvasLoader missing={modelAvailable === false && modelUrl} />
      </Canvas>
    </div>
  )
}

function CanvasLoader({ missing = false }){
  const { active, progress } = useProgress()
  return (
    <Html center style={{ pointerEvents: 'none' }}>
      <div className="avatar-loader">
        {missing ? <div>Model not found at <code>/models/me.glb</code>. Drop your GLB into <code>public/models/me.glb</code>.</div> : null}
        {!missing && active ? <div>Loading model — {Math.round(progress)}%</div> : null}
      </div>
    </Html>
  )
}
