'use client';

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#d4a574" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

function Walls() {
  const wallColor = '#f5f0eb';
  const wallHeight = 4;

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -10]} receiveShadow>
        <boxGeometry args={[20, wallHeight, 0.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, wallHeight, 20]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Right wall with window */}
      <mesh position={[10, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, wallHeight, 20]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Window (emissive to simulate outside light) */}
      <mesh position={[9.85, 2.5, -2]}>
        <boxGeometry args={[0.1, 2, 3]} />
        <meshStandardMaterial color="#c8e6ff" emissive="#aaddff" emissiveIntensity={0.5} />
      </mesh>

      {/* Window frame */}
      <mesh position={[9.8, 2.5, -2]}>
        <boxGeometry args={[0.15, 2.2, 3.2]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, -8]}>
      {/* Desk surface */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.05, 1]} />
        <meshStandardMaterial color="#c4956a" roughness={0.6} />
      </mesh>

      {/* Desk legs */}
      {[[-1.1, 0, -0.4], [1.1, 0, -0.4], [-1.1, 0, 0.4], [1.1, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.375, pos[2]]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Monitor */}
      <mesh position={[0, 1.2, -0.3]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Monitor screen (emissive) */}
      <mesh position={[0, 1.2, -0.28]}>
        <boxGeometry args={[1.1, 0.6, 0.01]} />
        <meshStandardMaterial color="#1e3a5f" emissive="#3388cc" emissiveIntensity={0.3} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, 0.9, -0.3]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.78, 0.1]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>

      {/* LED strip under desk */}
      <mesh position={[0, 0.72, -0.45]}>
        <boxGeometry args={[2.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#66bbff" emissive="#4499dd" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function PhoneDock() {
  return (
    <group position={[5, 0, -5]}>
      {/* Small table */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial color="#c4956a" roughness={0.6} />
      </mesh>

      {/* Table leg */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Phone */}
      <mesh position={[0, 0.58, 0]} castShadow rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.3, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Phone screen */}
      <mesh position={[0, 0.58, 0.011]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.13, 0.27, 0.005]} />
        <meshStandardMaterial color="#2a4a6a" emissive="#2266aa" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[-8, 0, -4]}>
      {/* Board */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.05, 2, 3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.08, 2.1, 3.1]} />
        <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function AICorner() {
  return (
    <group position={[-5, 0, -8]}>
      {/* Small desk */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.7]} />
        <meshStandardMaterial color="#e8ddd4" roughness={0.7} />
      </mesh>

      {/* Laptop base */}
      <mesh position={[0, 0.69, 0]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.4]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.95, -0.18]} castShadow rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.58, 0.4, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.95, -0.17]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.53, 0.35, 0.005]} />
        <meshStandardMaterial color="#1a3355" emissive="#5533aa" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function Bookshelf() {
  return (
    <group position={[7, 0, -8]}>
      {/* Shelf frame */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[2, 3, 0.4]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>

      {/* Shelves */}
      {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.05]} castShadow>
          <boxGeometry args={[1.8, 0.04, 0.35]} />
          <meshStandardMaterial color="#a08060" roughness={0.6} />
        </mesh>
      ))}

      {/* Books (colored blocks) */}
      {[
        [-0.5, 0.7, '#cc3333'],
        [-0.3, 0.7, '#3366cc'],
        [-0.1, 0.65, '#33aa55'],
        [0.2, 0.7, '#cc9933'],
        [0.4, 0.7, '#6633cc'],
        [-0.4, 1.4, '#cc6633'],
        [-0.1, 1.4, '#3399cc'],
        [0.2, 1.35, '#339966'],
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, 0.05]} castShadow>
          <boxGeometry args={[0.08, 0.25 + Math.random() * 0.1, 0.2]} />
          <meshStandardMaterial color={color as string} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Lounge() {
  return (
    <group position={[6, 0, 2]}>
      {/* Cozy chair */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.8, 0.9]} />
        <meshStandardMaterial color="#4a6b5a" roughness={0.9} />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 0.8, -0.4]} castShadow>
        <boxGeometry args={[0.9, 0.6, 0.1]} />
        <meshStandardMaterial color="#4a6b5a" roughness={0.9} />
      </mesh>

      {/* Coffee table */}
      <mesh position={[1.2, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.04, 16]} />
        <meshStandardMaterial color="#c4956a" roughness={0.6} />
      </mesh>

      {/* Table leg */}
      <mesh position={[1.2, 0.17, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.34, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[1.2, 0.4, 0.1]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[8, 0, -9]}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#cc8855" roughness={0.8} />
      </mesh>

      {/* Plant (sphere cluster) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#4a8c4a" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 0.75, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#5aa05a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function DataDashboard() {
  return (
    <group position={[-9.8, 0, 3]}>
      {/* Wall-mounted display */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.05, 1.2, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Screen */}
      <mesh position={[0.03, 2, 0]}>
        <boxGeometry args={[0.01, 1.1, 2.3]} />
        <meshStandardMaterial color="#0a2a4a" emissive="#224488" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SkillShelf() {
  return (
    <group position={[-3, 0, -9.8]}>
      {/* Modern floating shelves */}
      {[0.8, 1.5, 2.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[2.5, 0.05, 0.3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}

      {/* Certification frames */}
      {[[-0.8, 1.9], [0, 1.9], [0.8, 1.9]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]} castShadow>
          <boxGeometry args={[0.5, 0.35, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function World() {
  return (
    <group>
      <Floor />
      <Walls />
      <Desk />
      <PhoneDock />
      <Whiteboard />
      <AICorner />
      <Bookshelf />
      <Lounge />
      <Plant />
      <DataDashboard />
      <SkillShelf />
    </group>
  );
}
