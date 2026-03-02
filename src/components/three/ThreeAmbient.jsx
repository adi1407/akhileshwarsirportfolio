import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeAmbient({
  particleCount = 800,
  color = '#c9a84c',
  mouseReact = false,
  rings = false,
  streaks = false,
  style = {}
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reduce particles on mobile
    const isMobile = window.innerWidth < 768
    const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 5

    // Particles
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      sizes[i]  = Math.random() * 2.5 + 0.5
      speeds[i] = Math.random() * 0.003 + 0.001
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Glow rings
    let ringMeshes = []
    if (rings) {
      for (let r = 0; r < 3; r++) {
        const ringGeo = new THREE.RingGeometry(1.5 + r * 1.2, 1.55 + r * 1.2, 64)
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.08 - r * 0.02,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 4 + r * 0.2
        scene.add(ring)
        ringMeshes.push(ring)
      }
    }

    // Streak lines
    let streakObjects = []
    if (streaks) {
      for (let s = 0; s < 6; s++) {
        const pts = [
          new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, 0),
          new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, 0),
        ]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
        const lineMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: Math.random() * 0.15 + 0.05,
        })
        const line = new THREE.Line(lineGeo, lineMat)
        scene.add(line)
        streakObjects.push({ line, speed: (Math.random() - 0.5) * 0.002 })
      }
    }

    let mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      if (!mouseReact) return
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    if (mouseReact) window.addEventListener('mousemove', onMouseMove)

    let animId
    let t = 0

    function animate() {
      animId = requestAnimationFrame(animate)
      t += 0.003

      // Drift particles
      const pos = geo.attributes.position.array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i] * 0.5
        pos[i * 3]     += Math.sin(t + i * 0.1) * 0.002
        if (pos[i * 3 + 1] > 7) pos[i * 3 + 1] = -7
      }
      geo.attributes.position.needsUpdate = true
      mat.opacity = 0.35 + Math.sin(t) * 0.05

      // Rotate rings
      ringMeshes.forEach((ring, i) => {
        ring.rotation.z = t * (0.1 + i * 0.05)
        ring.rotation.y = t * 0.05
      })

      // Move streaks
      streakObjects.forEach(({ line, speed }) => {
        line.position.y += speed
        if (line.position.y > 4) line.position.y = -4
      })

      // Camera mouse parallax
      if (mouseReact) {
        camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      if (!canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (mouseReact) window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [particleCount, color, mouseReact, rings, streaks])

  return (
    <canvas
      ref={canvasRef}
      className="ambient"
      style={{ ...style }}
    />
  )
}
