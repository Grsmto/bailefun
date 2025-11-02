"use client"

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Lightformer, Float, Environment, BakeShadows } from "@react-three/drei";
import * as THREE from "three"

import { Model } from "./Model"

function AnimatedCamera() {
  const { camera } = useThree()
  const [animating, setAnimating] = useState(false)
  const targetZoom = 1
  const speed = 5

  useEffect(() => {
    setAnimating(true)
  }, [camera])

  useFrame((_, delta) => {
    if (!animating) return

    camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, delta * speed)
    camera.updateProjectionMatrix()

    if (Math.abs(camera.zoom - targetZoom) < 0.01) {
      setAnimating(false)
    }
  })

  return null
}

const Hero = () => {
  const ref = useRef(null)

  return (
    <div className="h-[60vh] max-h-[120vw] min-h-[400px] w-full border-b border-ui-border-base relative bg-ui-bg-subtle pb-14">
      <div className="flex flex-col justify-center items-center text-center gap-6 h-full overflow-hidden">
        <div
          className="flex flex-col w-full h-full"
        >
          <div className="flex-1 min-h-[400px]">
            <Canvas shadows camera={{ fov: 70, zoom: 3 }}>
              <spotLight position={[-4, 3, 5]} angle={0.3} penumbra={2} intensity={50} />
              <spotLight position={[-3, 3, 5]} angle={0.25} penumbra={1} castShadow intensity={100} shadow-bias={-0.0001} />
              <spotLight position={[5, 10, 10]} angle={0.5} penumbra={1} intensity={100} shadow-bias={-0.0001} />
              <spotLight position={[7, 0, 3]} angle={0.7} penumbra={1} intensity={50} shadow-bias={-0.0001} />
              {/* <ambientLight intensity={0.2} /> */}
              <Float speed={0.8} scale={0.75} position={[0, 0.25, 0]} rotation={[0, 0, 0]} >
                <Model rotation={[0.3, 0, 0]} />
              </Float>
              <OrbitControls ref={ref} enableZoom={false} enablePan={true} />
              <Environment frames={Infinity} resolution={256}>
                <Lightformers />
              </Environment>
              <AnimatedCamera />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-4 content-container txt-xsmall-plus text-sm w-full text-small-regular xsmall:mb-8">
        <h2 className="text-base xsmall:text-2xl font-bold uppercase">NEW TEES OUT NOW!</h2>
        <h3>T-shirts designed in London for brasileiros</h3>
      </div>
    </div>
  )
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={22} rotation={[Math.PI / 2, 0, 0]} position={[x, 2, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={3} floatIntensity={1} rotationIntensity={1}>
        <Lightformer form="ring" color="yellow" intensity={1} scale={30} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
    </>
  )
}

export default Hero
