varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

uniform float uTime;
uniform float uScrollVelocity;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);

  float droplets = sin(vUv.x * 40.0 + uTime) * sin(vUv.y * 40.0 - uTime * 0.5);
  droplets = smoothstep(0.7, 0.9, droplets) * 0.3;

  float alpha = fresnel * 0.4 + droplets + uScrollVelocity * 0.2;
  alpha = clamp(alpha, 0.0, 0.7);

  vec3 color = mix(vec3(0.8, 0.9, 1.0), vec3(1.0), fresnel);

  gl_FragColor = vec4(color, alpha);
}
