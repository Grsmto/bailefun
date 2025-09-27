"use client"

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

import { Model } from "./Model"

const Hero = () => {
  const ref = useRef(null)

  return (
    <div className="h-[60vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center gap-6 overflow-hidden">
        <div
          className="flex flex-col w-full h-full"
        >
          <div className="flex-1 min-h-[400px]">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, zoom: 1 }}>
              <Stage
                preset="rembrandt"
                environment="city"
                shadows={false}
              >
                <Model rotation={[0.2, -1.5, 0]} />
              </Stage>
              <OrbitControls ref={ref} enableZoom={false} enablePan={true} />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
