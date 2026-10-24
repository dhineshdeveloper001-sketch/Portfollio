export const ScanlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 0.02 },
    linesCount: { value: 800.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float opacity;
    uniform float linesCount;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float scan = sin(vUv.y * linesCount) * 0.5 + 0.5;
      color.rgb -= scan * opacity;
      gl_FragColor = color;
    }
  `
};
