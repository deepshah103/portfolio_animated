'use client';

function Floor() {
  return (
    <group>
      {/* Main floor — light gray with slight sheen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[13, 13]} />
        <meshStandardMaterial color="#d8e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Floor grid lines */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={`fx${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, 0]}>
          <planeGeometry args={[0.02, 13]} />
          <meshStandardMaterial color="#aaddee" emissive="#66ccdd" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-4, -2, 0, 2, 4].map((z) => (
        <mesh key={`fz${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, z]}>
          <planeGeometry args={[13, 0.02]} />
          <meshStandardMaterial color="#aaddee" emissive="#66ccdd" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Walls() {
  return (
    <group>
      {/* Low border rails instead of full walls — never block camera */}
      {/* Back border */}
      <mesh position={[0, 0.05, -6]}>
        <boxGeometry args={[13, 0.1, 0.1]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} />
      </mesh>
      {/* Left border */}
      <mesh position={[-6.5, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, 13]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} />
      </mesh>
      {/* Right border */}
      <mesh position={[6.5, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, 13]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} />
      </mesh>
      {/* Front border */}
      <mesh position={[0, 0.05, 6]}>
        <boxGeometry args={[13, 0.1, 0.1]} />
        <meshStandardMaterial color="#00bbdd" emissive="#00aacc" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Desk() {
  const screens = [
    { x: -0.75, label: 'Code Agent', emissive: '#00aacc' },
    { x: -0.25, label: 'Research Agent', emissive: '#0088dd' },
    { x: 0.25, label: 'Build Agent', emissive: '#00ccaa' },
    { x: 0.75, label: 'Deploy Agent', emissive: '#00dd88' },
  ];

  return (
    <group position={[0, 0, -4.5]}>
      {/* Wide desk surface */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.05, 0.9]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Desk legs */}
      {[[-1.4, 0, -0.4], [1.4, 0, -0.4], [-1.4, 0, 0.4], [1.4, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* 4 Monitors — agentic screens */}
      {screens.map((s, i) => (
        <group key={i}>
          {/* Monitor bezel */}
          <mesh position={[s.x, 1.15, -0.3]} castShadow>
            <boxGeometry args={[0.45, 0.4, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
          </mesh>
          {/* Screen glow */}
          <mesh position={[s.x, 1.15, -0.28]}>
            <boxGeometry args={[0.4, 0.34, 0.01]} />
            <meshStandardMaterial color="#e8ffff" emissive={s.emissive} emissiveIntensity={0.5} />
          </mesh>
          {/* Stand */}
          <mesh position={[s.x, 0.9, -0.3]} castShadow>
            <boxGeometry args={[0.04, 0.3, 0.04]} />
            <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Activity indicator LED */}
          <mesh position={[s.x, 1.37, -0.3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={s.emissive} emissive={s.emissive} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Keyboard */}
      <mesh position={[0, 0.73, 0.15]} castShadow>
        <boxGeometry args={[0.6, 0.012, 0.2]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.5, 0.73, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.015, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
      </mesh>

      {/* Desk LED accent */}
      <mesh position={[0, 0.68, -0.43]}>
        <boxGeometry args={[2.8, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

function PhoneDock() {
  return (
    <group position={[3, 0, -3]}>
      {/* Small table */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.04, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.44, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Phone */}
      <mesh position={[0, 0.52, 0]} castShadow rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.12, 0.22, 0.012]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Phone screen */}
      <mesh position={[0, 0.52, 0.008]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.19, 0.005]} />
        <meshStandardMaterial color="#ccf4ff" emissive="#0088aa" emissiveIntensity={0.3} />
      </mesh>

      {/* Wireless charger pad glow */}
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#e0ffff" emissive="#00ccdd" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[-5, 0, -2.5]}>
      {/* Free-standing display on a stand */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.4, 0.025]}>
        <boxGeometry args={[1.6, 1.0, 0.01]} />
        <meshStandardMaterial color="#e8ffff" emissive="#00bbdd" emissiveIntensity={0.3} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function AICorner() {
  return (
    <group position={[-3, 0, -4.5]}>
      {/* Desk */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.04, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Desk legs */}
      {[[-0.45, 0, -0.25], [0.45, 0, -0.25]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.3, pos[2]]} castShadow>
          <boxGeometry args={[0.03, 0.6, 0.03]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Laptop */}
      <mesh position={[0, 0.64, 0.05]} castShadow>
        <boxGeometry args={[0.5, 0.012, 0.35]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.88, -0.14]} castShadow rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.48, 0.33, 0.008]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Screen glow — purple AI accent */}
      <mesh position={[0, 0.88, -0.135]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.43, 0.28, 0.005]} />
        <meshStandardMaterial color="#f0e8ff" emissive="#7733ff" emissiveIntensity={0.3} />
      </mesh>

      {/* LED accent */}
      <mesh position={[0, 0.58, -0.28]}>
        <boxGeometry args={[0.9, 0.02, 0.02]} />
        <meshStandardMaterial color="#aa66ff" emissive="#8833ff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Bookshelf() {
  return (
    <group position={[4, 0, -4.5]}>
      {/* Shelf unit — white with backlit panels */}
      <mesh position={[0, 1.2, -1.4]} castShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color="#f0f8ff" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Shelves */}
      {[0.4, 0.9, 1.4, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, -1.33]} castShadow>
          <boxGeometry args={[1.3, 0.03, 0.25]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      ))}

      {/* Backlit panel behind shelves */}
      <mesh position={[0, 1.2, -1.53]}>
        <boxGeometry args={[1.4, 2.2, 0.01]} />
        <meshStandardMaterial color="#e0f8ff" emissive="#00aacc" emissiveIntensity={0.2} />
      </mesh>

      {/* Books */}
      {[
        [-0.4, 0.55, '#22aacc'],
        [-0.2, 0.55, '#3366cc'],
        [0, 0.55, '#44bb88'],
        [0.2, 0.55, '#cc7733'],
        [0.4, 0.55, '#7744cc'],
        [-0.3, 1.05, '#cc5544'],
        [0, 1.05, '#3399cc'],
        [0.3, 1.05, '#339966'],
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, -1.35]} castShadow>
          <boxGeometry args={[0.06, 0.2, 0.15]} />
          <meshStandardMaterial color={color as string} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Lounge() {
  return (
    <group position={[3.5, 0, 1.5]}>
      {/* Modern curved chair */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshStandardMaterial color="#e8f4f8" roughness={0.6} />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 0.6, -0.3]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.08]} />
        <meshStandardMaterial color="#e8f4f8" roughness={0.6} />
      </mesh>

      {/* Coffee table — glass top */}
      <mesh position={[0.9, 0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.03, 16]} />
        <meshStandardMaterial color="#eeffff" roughness={0.1} metalness={0.2} transparent opacity={0.8} />
      </mesh>

      <mesh position={[0.9, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.28, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[0.9, 0.36, 0.08]} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.06, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
    </group>
  );
}

function DataDashboard() {
  return (
    <group position={[-5.5, 0, 1.5]}>
      {/* Free-standing trading monitor */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
        <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[1.4, 0.8, 0.03]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.1, 0.02]}>
        <boxGeometry args={[1.3, 0.7, 0.01]} />
        <meshStandardMaterial color="#0a1a0a" emissive="#00aa44" emissiveIntensity={0.3} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function SkillShelf() {
  return (
    <group position={[5, 0, 0]}>
      {/* Floating shelves — white */}
      {[0.7, 1.3, 1.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[2, 0.04, 0.25]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}

      {/* Shelf LED strips */}
      {[0.68, 1.28, 1.88].map((y, i) => (
        <mesh key={`led${i}`} position={[0, y, 0.13]}>
          <boxGeometry args={[1.8, 0.015, 0.015]} />
          <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Certification frames */}
      {[[-0.6, 1.55], [0, 1.55], [0.6, 1.55]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.08]} castShadow>
          <boxGeometry args={[0.4, 0.28, 0.02]} />
          <meshStandardMaterial color="#f0f8ff" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Bed() {
  return (
    <group position={[4.5, 0, 3.5]}>
      {/* Pod-style bed frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.25, 1.8]} />
        <meshStandardMaterial color="#e0f0f8" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.2, 0.12, 1.6]} />
        <meshStandardMaterial color="#f8f8ff" roughness={0.9} />
      </mesh>

      {/* Pillow */}
      <mesh position={[0, 0.46, -0.55]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Blanket */}
      <mesh position={[0, 0.46, 0.25]} castShadow>
        <boxGeometry args={[1.1, 0.06, 0.9]} />
        <meshStandardMaterial color="#d0eeff" roughness={0.7} />
      </mesh>

      {/* Headboard with LED */}
      <mesh position={[0, 0.65, -0.85]} castShadow>
        <boxGeometry args={[1.4, 0.6, 0.06]} />
        <meshStandardMaterial color="#e8f4f8" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Headboard LED strip */}
      <mesh position={[0, 0.38, -0.82]}>
        <boxGeometry args={[1.3, 0.025, 0.02]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccff" emissiveIntensity={2.5} />
      </mesh>

      {/* Base glow */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.5, 0.02, 1.9]} />
        <meshStandardMaterial color="#00ddff" emissive="#00bbdd" emissiveIntensity={1} transparent opacity={0.4} />
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
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Desk legs */}
      {[[-0.6, 0, -0.25], [0.6, 0, -0.25], [-0.6, 0, 0.25], [0.6, 0, 0.25]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow>
          <boxGeometry args={[0.03, 0.7, 0.03]} />
          <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Laptop */}
      <mesh position={[0, 0.74, 0.05]} castShadow>
        <boxGeometry args={[0.55, 0.012, 0.35]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.97, -0.14]} castShadow rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.53, 0.35, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Screen glow — green code */}
      <mesh position={[0, 0.97, -0.13]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.48, 0.3, 0.005]} />
        <meshStandardMaterial color="#e8fff8" emissive="#00cc88" emissiveIntensity={0.3} />
      </mesh>

      {/* Desk LED */}
      <mesh position={[0, 0.68, -0.28]}>
        <boxGeometry args={[1.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} />
      </mesh>

      {/* Chair */}
      <group position={[0, 0, 0.7]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.4]} />
          <meshStandardMaterial color="#e8f0f4" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.65, -0.18]} castShadow>
          <boxGeometry args={[0.38, 0.4, 0.04]} />
          <meshStandardMaterial color="#e8f0f4" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 5]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function CeilingLightPanel() {
  return null;
}

function LabEquipment() {
  return (
    <group>
      {/* Glass cylinders/tubes — decorative lab feel */}
      {[[-5.5, 0, -4], [-5.8, 0, -3.5], [-5.3, 0, -3.2]].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1, 12]} />
            <meshStandardMaterial color="#e8ffff" roughness={0.1} metalness={0.1} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 12]} />
            <meshStandardMaterial color={['#00ccff', '#00ffaa', '#aa88ff'][i]} emissive={['#00aadd', '#00dd88', '#8866dd'][i]} emissiveIntensity={0.5} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Holographic display stand (center of room) */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 24]} />
        <meshStandardMaterial color="#d0f0ff" emissive="#00aacc" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function TradingDesk() {
  const screens = [
    { x: -0.4, y: 1.5, label: 'Signal Scanner', emissive: '#00cc44' },
    { x: 0.4, y: 1.5, label: 'Risk Engine', emissive: '#ff6600' },
    { x: -0.4, y: 1.0, label: 'Order Flow', emissive: '#00aaff' },
    { x: 0.4, y: 1.0, label: 'P&L Tracker', emissive: '#cc44ff' },
  ];

  return (
    <group position={[-5, 0, 0]}>
      {/* Desk surface */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.04, 0.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Desk legs */}
      {[[-0.9, 0, -0.3], [0.9, 0, -0.3], [-0.9, 0, 0.3], [0.9, 0, 0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow>
          <boxGeometry args={[0.03, 0.7, 0.03]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* 2x2 Monitor stack */}
      {screens.map((s, i) => (
        <group key={i}>
          {/* Bezel */}
          <mesh position={[s.x, s.y, -0.3]} castShadow>
            <boxGeometry args={[0.7, 0.42, 0.02]} />
            <meshStandardMaterial color="#111111" roughness={0.3} />
          </mesh>
          {/* Screen */}
          <mesh position={[s.x, s.y, -0.28]}>
            <boxGeometry args={[0.62, 0.35, 0.01]} />
            <meshStandardMaterial color="#0a0a0a" emissive={s.emissive} emissiveIntensity={0.4} />
          </mesh>
          {/* Status LED */}
          <mesh position={[s.x + 0.28, s.y + 0.18, -0.29]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color={s.emissive} emissive={s.emissive} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Monitor mount arm (vertical bar) */}
      <mesh position={[0, 1.25, -0.33]} castShadow>
        <boxGeometry args={[0.04, 1.1, 0.04]} />
        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Mount base clamp */}
      <mesh position={[0, 0.72, -0.33]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.08]} />
        <meshStandardMaterial color="#999" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[-0.1, 0.73, 0.1]} castShadow>
        <boxGeometry args={[0.45, 0.012, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.4, 0.73, 0.1]} castShadow>
        <boxGeometry args={[0.05, 0.012, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* Desk LED — green for trading */}
      <mesh position={[0, 0.68, -0.33]}>
        <boxGeometry args={[1.8, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ff66" emissive="#00cc44" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Couch() {
  return (
    <group position={[0, 0, 3]}>
      {/* Seat base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[2.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#e0f0f8" roughness={0.7} />
      </mesh>

      {/* Back cushion */}
      <mesh position={[0, 0.55, -0.35]} castShadow>
        <boxGeometry args={[2.2, 0.4, 0.15]} />
        <meshStandardMaterial color="#d0eaf5" roughness={0.7} />
      </mesh>

      {/* Left armrest */}
      <mesh position={[-1.0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.8]} />
        <meshStandardMaterial color="#d8eef5" roughness={0.7} />
      </mesh>

      {/* Right armrest */}
      <mesh position={[1.0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.8]} />
        <meshStandardMaterial color="#d8eef5" roughness={0.7} />
      </mesh>

      {/* Chrome legs */}
      {[[-0.9, 0, 0.3], [0.9, 0, 0.3], [-0.9, 0, -0.3], [0.9, 0, -0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.05, pos[2]]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Throw pillows */}
      <mesh position={[-0.7, 0.5, 0.05]} castShadow rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.25, 0.25, 0.12]} />
        <meshStandardMaterial color="#88ddff" roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.5, 0.05]} castShadow rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.25, 0.25, 0.12]} />
        <meshStandardMaterial color="#aaeeff" roughness={0.8} />
      </mesh>
    </group>
  );
}

function ServerRack() {
  return (
    <group position={[6, 0, -3]}>
      {/* Rack frame */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, 2.4, 0.5]} />
        <meshStandardMaterial color="#e0eef5" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Blinking lights */}
      {[0.4, 0.7, 1.0, 1.3, 1.6, 1.9].map((y, i) => (
        <mesh key={i} position={[0.31, y, 0]}>
          <boxGeometry args={[0.01, 0.08, 0.3]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00ffcc' : '#00aaff'}
            emissive={i % 2 === 0 ? '#00ddaa' : '#0088dd'}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
      {/* Base glow */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.7, 0.02, 0.6]} />
        <meshStandardMaterial color="#00ddff" emissive="#00bbdd" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Plants() {
  return (
    <group>
      {/* Plant 1 — near lounge */}
      <group position={[5.5, 0, 0]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.5, 8]} />
          <meshStandardMaterial color="#e8f4f0" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#44bb88" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.8, 0.08]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#55cc99" roughness={0.8} />
        </mesh>
      </group>

      {/* Plant 2 — back left corner */}
      <group position={[-5.8, 0, -5]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#e0f0e8" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#33aa77" roughness={0.8} />
        </mesh>
      </group>

      {/* Plant 3 — near bed */}
      <group position={[5.8, 0, 4.5]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.6, 8]} />
          <meshStandardMaterial color="#ddf0e8" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#55cc88" roughness={0.8} />
        </mesh>
        <mesh position={[-0.1, 0.9, 0.1]} castShadow>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#66ddaa" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function HologramPedestal() {
  return (
    <group position={[0, 0, 0]}>
      {/* Pedestal base */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
        <meshStandardMaterial color="#e8f4fa" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Glowing ring */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.35, 24]} />
        <meshStandardMaterial color="#00ddff" emissive="#00ccff" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      {/* Floating hologram "orb" */}
      <mesh position={[0, 0.7, 0]}>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial color="#ccffff" emissive="#00aadd" emissiveIntensity={0.8} transparent opacity={0.6} wireframe />
      </mesh>
      {/* Inner orb */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ddff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function WallDecor() {
  return (
    <group>
      {/* Standing holographic panels around the room edges */}
      {[[-4.5, 0, -5.5], [3, 0, -5.5], [5.5, 0, -5.5]].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Stand */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Panel */}
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.6, 0.5, 0.02]} />
            <meshStandardMaterial
              color="#f0faff"
              emissive={['#00ccff', '#00ffaa', '#aa88ff'][i]}
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SideTable() {
  return (
    <group position={[-4.5, 0, 2]}>
      {/* Glass top */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 16]} />
        <meshStandardMaterial color="#eeffff" roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Leg */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
        <meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Tablet on table */}
      <mesh position={[0, 0.53, 0]} rotation={[-Math.PI / 2, 0, 0.2]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
    </group>
  );
}

function FloorLights() {
  return (
    <group>
      {/* Recessed floor lights around room perimeter */}
      {[
        [-3, 0.01, 5.5], [0, 0.01, 5.5], [3, 0.01, 5.5],
        [-5.5, 0.01, -1], [-5.5, 0.01, 3],
        [5.5, 0.01, -1], [5.5, 0.01, 3],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.12, 12]} />
          <meshStandardMaterial color="#ccffff" emissive="#00bbdd" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  );
}

function WaterCooler() {
  return (
    <group position={[-2, 0, 2.5]}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.0, 12]} />
        <meshStandardMaterial color="#e8f4f8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Top reservoir */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 12]} />
        <meshStandardMaterial color="#ccf4ff" roughness={0.1} transparent opacity={0.6} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.15, 12]} />
        <meshStandardMaterial color="#ddeef4" roughness={0.3} />
      </mesh>
      {/* LED ring */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.19, 16]} />
        <meshStandardMaterial color="#00ddff" emissive="#00bbdd" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export function World() {
  return (
    <group>
      <Floor />
      <Walls />
      <CeilingLightPanel />
      <LabEquipment />
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
      <TradingDesk />
      <Couch />
      <ServerRack />
      <Plants />
      <HologramPedestal />
      <WallDecor />
      <SideTable />
      <FloorLights />
      <WaterCooler />
    </group>
  );
}
