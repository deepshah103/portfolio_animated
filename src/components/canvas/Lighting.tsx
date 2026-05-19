'use client';

export function Lighting() {
  return (
    <>
      {/* Main sunlight from window */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Warm ambient fill */}
      <ambientLight intensity={0.6} color="#fff5e6" />

      {/* Soft fill from opposite side */}
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#e6f0ff" />

      {/* Subtle warm accent from below (bounced light feel) */}
      <hemisphereLight args={["#ffeedd", "#f0f0ff", 0.4]} />

      {/* Desk LED accent light */}
      <pointLight position={[0, 1.5, -3]} intensity={0.5} color="#88ccff" distance={5} />
    </>
  );
}
