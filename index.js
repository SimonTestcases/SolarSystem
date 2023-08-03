import {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
  HemisphereLight,
  AxesHelper,
  GridHelper,
  MeshBasicMaterial,
  Camera,
} from "three";

import CameraControls from "camera-controls";

import { SceneUtils as SceneUtils } from "./src/sceneUtils";

const scene = new Scene();

const canvas = document.getElementById("threeCanvas");

const sceneUtils = new SceneUtils(scene, canvas);
sceneUtils.addAxes();
sceneUtils.addGrid();
sceneUtils.addCameraToScene();
const renderer = sceneUtils.returnRenderer();

/***
 * Make window respond to resizing by also updating the projection matrix
 */
window.addEventListener("resize", () => {
  sceneUtils.camera.aspect = sizeRatio;

  sceneUtils.camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

/***
 * Subset of three.js to install camera controls without installing whole library
 */
const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
};

CameraControls.install({ THREE: subsetOfTHREE });
const clock = new Clock();
const cameraControls = new CameraControls(sceneUtils.camera, canvas);
cameraControls.setLookAt(5, 10, 8, 1, 2, 1);

/***
 * Compute the animation
 */
const animate = () => {
  const delta = clock.getDelta();
  cameraControls.update(delta);
  renderer.render(scene, sceneUtils.camera);
  requestAnimationFrame(animate);
};

animate();
