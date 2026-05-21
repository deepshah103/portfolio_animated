'use client';

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[13, 13]} />
      <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

function Walls() {
  const wallColor = '#0d0d1a';
  const wallHeight = 3.5;

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -6]} receiveShadow>
        <boxGeometry args={[13, wallHeight, 0.15]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6.5, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, wallHeight, 13]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[6.5, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, wallHeight, 13]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Front wall removed — camera always behind character looking in */}

      {/* Neon trim along back wall base */}
      <mesh position={[0, 0.05, -5.9]}>
        <boxGeometry args={[12, 0.04, 0.04]} />
        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={2} />
      </mesh>

      {/* Neon trim along left wall base */}
      <mesh position={[-6.4, 0.05, 0]}>
        <boxGeometry args={[0.04, 0.04, 12]} />
        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={1.5} />
      </mesh>

      {/* Neon trim along right wall base */}
      <mesh position={[6.4, 0.05, 0]}>
        <boxGeometry args={[0.04, 0.04, 12]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, -4.5]}>
      {/* Desk surface */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.04, 0.8]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Desk legs */}
      {[[-0.9, 0, -0.35], [0.9, 0, -0.35], [-0.9, 0, 0.35], [0.9, 0, 0.35]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Monitor */}
      <mesh position={[0, 1.1, -0.25]} castShadow>
        <boxGeometry args={[1.0, 0.6, 0.03]} />
        <meshStandardMaterial color="#111" roughness={0.3} />
      </mesh>

      {/* Monitor screen */}
      <mesh position={[0, 1.1, -0.23]}>
        <boxGeometry args={[0.9, 0.5, 0.01]} />
        <meshStandardMaterial color="#0a1a2a" emissive="#0066cc" emissiveIntensity={0.4} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, 0.85, -0.25]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.08]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.73, 0.1]} castShadow>
        <boxGeometry args={[0.5, 0.015, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* LED strip */}
      <mesh position={[0, 0.67, -0.38]}>
        <boxGeometry args={[1.9, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function PhoneDock() {
  return (
    <group position={[3, 0, -3]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.04, 0.5]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.44, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Phone */}
      <mesh position={[0, 0.52, 0]} castShadow rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.12, 0.22, 0.015]} />
        <meshStandardMaterial color="#111" roughness={0.3} />
      </mesh>

      {/* Phone screen */}
      <mesh position={[0, 0.52, 0.009]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.19, 0.005]} />
        <meshStandardMaterial color="#0a1a2a" emissive="#2266aa" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[-5, 0, -2.5]}>
      {/* Board on wall */}
      <mesh position={[-1.4, 1.6, 0]} castShadow>
        <boxGeometry args={[0.04, 1.5, 2.2]} />
        <meshStandardMaterial color="#111122" roughness={0.3} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[-1.37, 1.6, 0]}>
        <boxGeometry args={[0.01, 1.3, 2.0]} />
        <meshStandardMaterial color="#0a0a1a" emissive="#00ccff" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

function AICorner() {
  return (
    <group position={[-3, 0, -4.5]}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.04, 0.6]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Laptop */}
      <mesh position={[0, 0.64, 0.05]} castShadow>
        <boxGeometry args={[0.5, 0.015, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.88, -0.14]} castShadow rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.48, 0.33, 0.01]} />
        <meshStandardMaterial color="#111" roughness={0.3} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.88, -0.13]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.43, 0.28, 0.005]} />
        <meshStandardMaterial color="#0a0a1a" emissive="#8800ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Bookshelf() {
  return (
    <group position={[4, 0, -4.5]}>
      <mesh position={[0, 1.2, -1.4]} castShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Shelves */}
      {[0.4, 0.9, 1.4, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, -1.35]} castShadow>
          <boxGeometry args={[1.3, 0.03, 0.25]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.5} />
        </mesh>
      ))}

      {/* Books */}
      {[
        [-0.4, 0.55, '#cc3333'],
        [-0.2, 0.55, '#3366cc'],
        [0, 0.55, '#33aa55'],
        [0.2, 0.55, '#cc9933'],
        [0.4, 0.55, '#6633cc'],
        [-0.3, 1.05, '#cc6633'],
        [0, 1.05, '#3399cc'],
        [0.3, 1.05, '#339966'],
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, -1.35]} castShadow>
          <boxGeometry args={[0.06, 0.2, 0.15]} />
          <meshStandardMaterial color={color as string} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Lounge() {
  return (
    <group position={[3.5, 0, 1.5]}>
      {/* Chair */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.7]} />
        <meshStandardMaterial color="#1a2a3a" roughness={0.9} />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 0.65, -0.3]} castShadow>
        <boxGeometry args={[0.7, 0.45, 0.08]} />
        <meshStandardMaterial color="#1a2a3a" roughness={0.9} />
      </mesh>

      {/* Coffee table */}
      <mesh position={[0.9, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.03, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0.9, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.28, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[0.9, 0.34, 0.08]} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.06, 8]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
    </group>
  );
}

function DataDashboard() {
  return (
    <group position={[-5.5, 0, 1.5]}>
      {/* Wall-mounted display */}
      <mesh position={[-0.9, 1.6, 0]} castShadow>
        <boxGeometry args={[0.04, 1.0, 2.0]} />
        <meshStandardMaterial color="#111" roughness={0.3} />
      </mesh>

      {/* Screen */}
      <mesh position={[-0.87, 1.6, 0]}>
        <boxGeometry args={[0.01, 0.9, 1.8]} />
        <meshStandardMaterial color="#0a1a2a" emissive="#004488" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SkillShelf() {
  return (
    <group position={[-1.5, 0, -5.8]}>
      {/* Modern floating shelves */}
      {[0.7, 1.3, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[2, 0.04, 0.25]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.2} />
        </mesh>
      ))}

      {/* Certification frames */}
      {[[-0.6, 1.55], [0, 1.55], [0.6, 1.55]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.08]} castShadow>
          <boxGeometry args={[0.4, 0.28, 0.02]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Bed() {
  return (
    <group position={[4.5, 0, 3.5]}>
      {/* Bed frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.25, 1.8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.2, 0.12, 1.6]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.95} />
      </mesh>

      {/* Pillow */}
      <mesh position={[0, 0.46, -0.55]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.9} />
      </mesh>

      {/* Blanket */}
      <mesh position={[0, 0.46, 0.25]} castShadow>
        <boxGeometry args={[1.1, 0.06, 0.9]} />
        <meshStandardMaterial color="#1a3a5a" roughness={0.9} />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 0.65, -0.85]} castShadow>
        <boxGeometry args={[1.4, 0.6, 0.06]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* LED strip on headboard */}
      <mesh position={[0, 0.38, -0.82]}>
        <boxGeometry args={[1.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function CodingDesk() {
  return (
    <group position={[1.5, 0, -5.5]}>
      {/* Desk surface */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.6]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Desk legs */}
      {[[-0.6, 0, -0.25], [0.6, 0, -0.25], [-0.6, 0, 0.25], [0.6, 0, 0.25]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow>
          <boxGeometry args={[0.03, 0.7, 0.03]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Laptop */}
      <mesh position={[0, 0.74, 0.05]} castShadow>
        <boxGeometry args={[0.55, 0.015, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.97, -0.14]} castShadow rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.53, 0.35, 0.012]} />
        <meshStandardMaterial color="#111" roughness={0.3} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.97, -0.13]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.48, 0.3, 0.005]} />
        <meshStandardMaterial color="#0a1a1a" emissive="#00ffcc" emissiveIntensity={0.3} />
      </mesh>

      {/* LED strip */}
      <mesh position={[0, 0.67, -0.28]}>
        <boxGeometry args={[1.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} />
      </mesh>

      {/* Chair */}
      <group position={[0, 0, 0.7]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.65, -0.18]} castShadow>
          <boxGeometry args={[0.38, 0.4, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 5]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function CeilingLight() {
  return (
    <group position={[0, 3.4, 0]}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 6]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#aaddff" emissive="#00ccff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <circleGeometry args={[2, 32]} />
      <meshStandardMaterial color="#0d1a2a" roughness={1} />
    </mesh>
  );
}

export function World() {
  return (
    <group>
      <Floor />
      <Walls />
      <Rug />
      <CeilingLight />
      <Desk />
      <CodingDesk />
      <PhoneDock />
      <Whiteboard />
      <AICorner />
      <Bookshelf />
      <Lounge />
      <Bed />
      <DataDashboard />
      <SkillShelf />
    </group>
  );
}
