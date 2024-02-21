"use client";

import { useEffect, useMemo, useRef } from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface SkyBackgroundProps {
  bgColor?: string;
  cloudColor?: string;
  lightning?: boolean;
  rain?: boolean;
}

export function SkyBackground(props: SkyBackgroundProps) {
  const { bgColor, cloudColor, lightning, rain } = props;
  const rns = [randomNumber(), randomNumber(), randomNumber(), randomNumber()];

  return (
    <div className={`absolute bg-[${bgColor}] top-0 bottom-0 right-0 left-0`}>
      <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
        <Sky cloudColor={cloudColor} rns={rns} />
        <ambientLight intensity={Math.PI / 10} />
        {!!rain && <Rain />}
        {!!lightning && <FlashLightning />}
      </Canvas>
    </div>
  );
}

function Rain() {
  const rainCount = 10000; // Total number of raindrops
  const rainGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);

    // Position each raindrop randomly in space
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = Math.random() * 400 - 200; // x position
      positions[i * 3 + 1] = Math.random() * 500 - 250; // y position
      positions[i * 3 + 2] = Math.random() * 400 - 200; // z position
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [rainCount]);

  const rainMat = new THREE.PointsMaterial({
    color: "lightgray",
    size: 0.1,
    transparent: true,
  });

  // Animation for raindrops falling
  useFrame(() => {
    if (!!rainGeo?.attributes?.["position"]?.array) {
      const oldPositions = rainGeo.attributes["position"].array as number[];
      const newPositions = new Float32Array(oldPositions.length);
      for (let i = 0; i < rainCount; i++) {
        newPositions[i * 3] = oldPositions[i * 3] ?? 0;
        if (newPositions[i * 3 + 1] !== undefined) {
          newPositions[i * 3 + 1] = (oldPositions[i * 3 + 1] ?? 0) - 0.6; // Move raindrop down
          if ((newPositions[i * 3 + 1] ?? 0) < -200) {
            newPositions[i * 3 + 1] = 200; // Reset raindrop to top
          }
        }
        newPositions[i * 3 + 2] = oldPositions[i * 3 + 2] ?? 0;
      }
      rainGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(newPositions, 3),
      );
    }
  });

  return <points geometry={rainGeo} material={rainMat} />;
}

const FlashLightning = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    // Create lightning effect at random intervals
    const interval = setInterval(
      () => {
        if (lightRef.current) {
          lightRef.current.intensity = 10000 + Math.random() * 1000000;
          lightRef.current.distance = 10000;
          lightRef.current.color.setHSL(0.6, 0.5, 1);
        }

        // Turn off the light quickly to create a flash effect
        setTimeout(() => {
          if (lightRef.current) {
            lightRef.current.intensity = 0;
          }
        }, 50);
      },
      Math.random() * 10000 + 5000,
    );

    return () => clearInterval(interval);
  }, []);

  return <pointLight ref={lightRef} position={[0, 0, 0]} />;
};

function randomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

function Sky({
  cloudColor = "gray",
  rns = [],
}: {
  cloudColor?: string;
  rns: number[];
}) {
  const ref = useRef<any>();
  const cloud0 = useRef<any>();
  const { color, x, y, z, ...config } = {
    seed: 1,
    segments: 20,
    volume: 6,
    opacity: 0.8,
    fade: 10,
    growth: 4,
    speed: 0.1,
    x: 6,
    y: 1,
    z: 1,
    color: "white",
  };

  // Animation for clouds rotation
  useFrame((state) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 10) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 10) / 2;
  });

  return (
    <>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          <Cloud
            ref={cloud0}
            {...config}
            bounds={[x, y, z]}
            color={cloudColor}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color={cloudColor}
            position={[15, 0, 0]}
            seed={rns[0]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color={cloudColor}
            position={[-15, 0, 0]}
            seed={rns[1]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color={cloudColor}
            position={[0, 0, -12]}
            seed={rns[2]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color={cloudColor}
            seed={rns[3]}
            position={[0, 0, 12]}
          />
          <Cloud
            bounds={200}
            color={cloudColor}
            concentrate="outside"
            growth={100}
            opacity={1.25}
            seed={0.3}
            volume={200}
          />
        </Clouds>
      </group>
    </>
  );
}
