import React from 'react';

const DataFlowBackground = () => {
  // 14 Fixed nodes for low overhead & clean distribution
  const nodes = [
    { id: 1, x: 8, y: 20 },
    { id: 2, x: 25, y: 15, accent: true },
    { id: 3, x: 45, y: 25 },
    { id: 4, x: 68, y: 18 },
    { id: 5, x: 88, y: 22 },
    { id: 6, x: 15, y: 60 },
    { id: 7, x: 35, y: 75 },
    { id: 8, x: 55, y: 65, accent: true },
    { id: 9, x: 78, y: 72 },
    { id: 10, x: 92, y: 60 },
    { id: 11, x: 30, y: 40 },
    { id: 12, x: 60, y: 45 },
    { id: 13, x: 82, y: 42 }
  ];

  // Connections between nodes
  const connections = [
    { from: 1, to: 2, path: "M 8 20 L 25 15" },
    { from: 2, to: 3, path: "M 25 15 L 45 25" },
    { from: 3, to: 4, path: "M 45 25 L 68 18" },
    { from: 4, to: 5, path: "M 68 18 L 88 22" },
    { from: 1, to: 6, path: "M 8 20 L 15 60" },
    { from: 2, to: 11, path: "M 25 15 L 30 40" },
    { from: 11, to: 7, path: "M 30 40 L 35 75" },
    { from: 3, to: 12, path: "M 45 25 L 60 45" },
    { from: 12, to: 8, path: "M 60 45 L 55 65" },
    { from: 4, to: 13, path: "M 68 18 L 82 42" },
    { from: 13, to: 9, path: "M 82 42 L 78 72" },
    { from: 5, to: 10, path: "M 88 22 L 92 60" },
    { from: 7, to: 8, path: "M 35 75 L 55 65" },
    { from: 8, to: 9, path: "M 55 65 L 78 72" }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0a2d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Connecting Lines */}
        {connections.map((conn, idx) => (
          <g key={`conn-${idx}`}>
            <path
              d={conn.path}
              stroke="url(#flowLineGrad)"
              strokeWidth="0.3"
              fill="none"
              className="animate-neural-line"
            />
          </g>
        ))}

        {/* Traveling Data Packets */}
        {connections.slice(0, 6).map((conn, idx) => (
          <circle
            key={`packet-${idx}`}
            r="0.75"
            fill="#ff0a2d"
            className="shadow-[0_0_8px_#ff0a2d]"
          >
            <animateMotion
              path={conn.path}
              dur={`${5 + idx * 0.8}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Network Nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.accent ? "1.2" : "0.7"}
              fill={node.accent ? "#ff0a2d" : "#ffffff"}
              opacity={node.accent ? "0.85" : "0.4"}
              className={node.accent ? "animate-neural-pulse" : "animate-neural-float"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default DataFlowBackground;
