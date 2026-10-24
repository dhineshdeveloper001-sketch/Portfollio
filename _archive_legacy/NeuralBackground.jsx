import React from 'react';

const NeuralBackground = () => {
  // Pre-calculated harmonious coordinates for ~16 nodes in 0-100% viewport space
  const nodes = [
    { id: 0, x: 10, y: 15, pulse: false },
    { id: 1, x: 25, y: 35, pulse: true }, // Pulsing accent node 1
    { id: 2, x: 40, y: 18, pulse: false },
    { id: 3, x: 60, y: 28, pulse: false },
    { id: 4, x: 80, y: 15, pulse: false },
    { id: 5, x: 92, y: 40, pulse: false },
    { id: 6, x: 18, y: 65, pulse: false },
    { id: 7, x: 38, y: 75, pulse: false },
    { id: 8, x: 55, y: 58, pulse: false },
    { id: 9, x: 75, y: 70, pulse: true }, // Pulsing accent node 2
    { id: 10, x: 88, y: 85, pulse: false },
    { id: 11, x: 30, y: 92, pulse: false },
    { id: 12, x: 70, y: 90, pulse: false },
    { id: 13, x: 48, y: 40, pulse: false },
    { id: 14, x: 82, y: 48, pulse: false },
    { id: 15, x: 12, y: 42, pulse: false }
  ];

  // Connect nodes that are within reasonable distance
  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 28) {
        connections.push({
          from: nodes[i],
          to: nodes[j],
          id: `${i}-${j}`,
          isAccent: nodes[i].pulse || nodes[j].pulse
        });
      }
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 sm:opacity-50">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Accent Glow Filter */}
          <filter id="neuralGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Interconnecting Neural Lines */}
        <g className="neural-lines">
          {connections.map((conn, idx) => (
            <line
              key={conn.id}
              x1={`${conn.from.x}%`}
              y1={`${conn.from.y}%`}
              x2={`${conn.to.x}%`}
              y2={`${conn.to.y}%`}
              stroke={conn.isAccent ? '#ff0a2d' : 'rgba(255, 255, 255, 0.25)'}
              strokeWidth={conn.isAccent ? '0.25' : '0.15'}
              strokeDasharray={conn.isAccent ? 'none' : '0.8, 0.8'}
              className="animate-neural-line"
              style={{
                animationDelay: `${(idx % 5) * 0.7}s`,
                opacity: conn.isAccent ? 0.45 : 0.2
              }}
            />
          ))}
        </g>

        {/* Neural Nodes */}
        <g className="neural-nodes">
          {nodes.map((node) => (
            <g key={node.id}>
              {node.pulse ? (
                <>
                  {/* Pulsing Outer Ring */}
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="1.8"
                    fill="none"
                    stroke="#ff0a2d"
                    strokeWidth="0.2"
                    className="animate-neural-pulse"
                  />
                  {/* Glowing Core Accent Node */}
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="0.8"
                    fill="#ff0a2d"
                    filter="url(#neuralGlow)"
                  />
                </>
              ) : (
                /* Subtle Standard Node */
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="0.4"
                  fill="rgba(255, 255, 255, 0.5)"
                  className="animate-neural-float"
                  style={{ animationDelay: `${(node.id % 4) * 0.9}s` }}
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default NeuralBackground;
