'use client';

function Brain({ scale = 1 }: { scale?: number }) {
  const nodes = [
    [-0.34, 0.08, 0.02], [-0.2, 0.34, 0.02], [0.02, 0.4, 0.02], [0.22, 0.3, 0.02],
    [0.34, 0.08, 0.02], [0.2, -0.15, 0.02], [-0.02, -0.22, 0.02], [-0.24, -0.13, 0.02],
  ] as [number, number, number][];

  return (
    <group scale={scale}>
      <mesh position={[-0.17, 0, 0]} scale={[0.72, 1, 0.82]}>
        <sphereGeometry args={[0.48, 24, 18]} />
        <meshStandardMaterial color="#dffbff" emissive="#00bde8" emissiveIntensity={0.9} transparent opacity={0.68} roughness={0.22} />
      </mesh>
      <mesh position={[0.17, 0, 0]} scale={[0.72, 1, 0.82]}>
        <sphereGeometry args={[0.48, 24, 18]} />
        <meshStandardMaterial color="#eee7ff" emissive="#7c3aed" emissiveIntensity={0.65} transparent opacity={0.62} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.02, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.016, 8, 28]} />
        <meshStandardMaterial color="#7cecff" emissive="#22d3ee" emissiveIntensity={2.4} transparent opacity={0.9} />
      </mesh>
      {nodes.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#eaffff" emissive={i % 2 ? '#a78bfa' : '#22d3ee'} emissiveIntensity={2.6} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]}>
        <ringGeometry args={[0.4, 0.58, 32]} />
        <meshStandardMaterial color="#bffaff" emissive="#22d3ee" emissiveIntensity={2} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function CodingDeskFeature() {
  return (
    <group position={[2.6, 0, -5.5]}>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.06, 0.72]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.15} />
      </mesh>
      {[[-0.68, -0.28], [0.68, -0.28], [-0.68, 0.28], [0.68, 0.28]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <boxGeometry args={[0.035, 0.72, 0.035]} />
          <meshStandardMaterial color="#bcc8cf" metalness={0.9} roughness={0.14} />
        </mesh>
      ))}
      <mesh position={[0, 0.77, 0.08]}>
        <boxGeometry args={[0.72, 0.018, 0.38]} />
        <meshStandardMaterial color="#dfe8ec" metalness={0.55} roughness={0.24} />
      </mesh>
      <mesh position={[0, 1.08, -0.15]} rotation={[-0.13, 0, 0]} castShadow>
        <boxGeometry args={[0.68, 0.44, 0.018]} />
        <meshStandardMaterial color="#121b22" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.08, -0.137]} rotation={[-0.13, 0, 0]}>
        <boxGeometry args={[0.61, 0.37, 0.006]} />
        <meshStandardMaterial color="#dffff8" emissive="#00cc88" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.69, -0.32]}>
        <boxGeometry args={[1.58, 0.025, 0.025]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2.2} />
      </mesh>
      <group position={[0, 0, 0.82]}>
        <mesh position={[0, 0.4, 0]} castShadow><boxGeometry args={[0.46, 0.05, 0.44]} /><meshStandardMaterial color="#e8f0f4" roughness={0.5} /></mesh>
        <mesh position={[0, 0.66, -0.2]} castShadow><boxGeometry args={[0.44, 0.42, 0.04]} /><meshStandardMaterial color="#e8f0f4" roughness={0.5} /></mesh>
        <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.026, 0.026, 0.36, 6]} /><meshStandardMaterial color="#c5ced3" metalness={0.9} /></mesh>
        <mesh position={[0, 0.03, 0]}><cylinderGeometry args={[0.22, 0.22, 0.03, 6]} /><meshStandardMaterial color="#c5ced3" metalness={0.9} /></mesh>
      </group>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.82, 0.92, 32]} />
        <meshStandardMaterial color="#bdffff" emissive="#22d3ee" emissiveIntensity={1.4} transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export function WorkspaceFeatures() {
  return (
    <>
      {/* New focal brain for the Neural Wall */}
      <group position={[-5.4, 0, -1.8]}>
        <mesh position={[0, 1.42, 0.09]}>
          <planeGeometry args={[1.65, 1.05]} />
          <meshStandardMaterial color="#091923" emissive="#07566d" emissiveIntensity={0.6} transparent opacity={0.92} />
        </mesh>
        <group position={[0, 1.44, 0.17]}>
          <Brain scale={1.08} />
        </group>
        <pointLight position={[0, 1.65, 0.45]} intensity={1.2} distance={3} color="#22d3ee" />
      </group>

      {/* AI Corner gets a neural core instead of relying on a generic laptop */}
      <group position={[-2.8, 0, -4.2]}>
        <mesh position={[0, 0.72, 0.02]}>
          <boxGeometry args={[1.02, 0.06, 0.5]} />
          <meshStandardMaterial color="#101725" roughness={0.25} metalness={0.5} />
        </mesh>
        <group position={[0, 1.2, 0.02]}>
          <Brain scale={0.82} />
        </group>
        <mesh position={[0, 0.63, -0.29]}>
          <boxGeometry args={[0.94, 0.025, 0.025]} />
          <meshStandardMaterial color="#a866ff" emissive="#8b5cf6" emissiveIntensity={2.5} />
        </mesh>
        <pointLight position={[0, 1.2, 0.45]} intensity={1.0} distance={2.8} color="#8b5cf6" />
      </group>

      <CodingDeskFeature />
    </>
  );
}
