import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, OrbitControls } from "@react-three/drei";

import { Model } from "./examples/Model";

// Animated 3D Text component
const AnimatedText = ({ text = "BAILE", color = "#ffffff" }) => {
  const textRef = useRef<any>();

  // Animation using useFrame hook
  //   useFrame((state, delta) => {
  //     if (textRef.current) {
  //       // Gentle floating animation
  //       textRef.current.rotation.y += delta * 0.2;
  //       textRef.current.position.y =
  //         Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  //     }
  //   });

  return (
    <group ref={textRef}>
      <Text3D
        font="/fonts/Conthrax SemBd_Regular.json"
        size={0.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
      </Text3D>
    </group>
  );
};

// Main component with customization controls
const AnimatedTextScene = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "500px",
      }}
    >
      {/* 3D Scene */}
      <div
        style={{ flexGrow: 1, backgroundColor: "#111827", minHeight: "400px" }}
      >
        <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <Center>
            <AnimatedText />
            <Model />
          </Center>
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default AnimatedTextScene;
