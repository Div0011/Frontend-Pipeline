import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      group: any;
      color: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      [elemName: string]: any;
    }
  }
}
