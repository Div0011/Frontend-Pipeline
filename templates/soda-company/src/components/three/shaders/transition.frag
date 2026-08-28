varying vec2 vUv;
uniform float uProgress;
uniform float uTime;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  float noise = random(floor(uv * 80.0) + floor(uTime * 10.0));
  float threshold = uProgress * 1.2;
  float pixel = step(threshold, noise);

  float distortion = (noise - 0.5) * 0.1 * (1.0 - uProgress);
  uv += distortion;

  vec4 texColor = texture2D(tDiffuse, uv);
  gl_FragColor = vec4(mix(texColor.rgb, vec3(noise), pixel * 0.3), texColor.a);
}
