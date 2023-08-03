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
  SphereGeometry,
  TextureLoader,
} from "three";

import CameraControls from "camera-controls";

import { SceneUtils } from "./src/scene-utils";

import { Planet } from "./src/planet";

const scene = new Scene();

const canvas = document.getElementById("threeCanvas");

const sceneUtils = new SceneUtils(scene, canvas);

sceneUtils.addAxes();

sceneUtils.addGrid();

sceneUtils.addCameraToScene();

const renderer = sceneUtils.returnRenderer();

//---------

const sun = new Planet(696340, "Sun", "./images/SunTexture.jpg");
const sunMesh = sun.returnPlanetMesh();
scene.add(sunMesh);

const mercury = new Planet(
  2439.7 * 10,
  "Mercury",
  "./images/MercuryTexture.jpg"
);
mercury.setDistanceToParent(1);
const mercuryMesh = mercury.returnPlanetMesh();
sunMesh.add(mercuryMesh);

const venus = new Planet(6051.8 * 10, "Venus", "./images/VenusTexture.jpg");
venus.setDistanceToParent(2);
const venusMesh = venus.returnPlanetMesh();
sunMesh.add(venusMesh);

const earth = new Planet(6371 * 10, "Earth", "./images/EarthTexture.jpg");
earth.setDistanceToParent(3);
const earthMesh = earth.returnPlanetMesh();
sunMesh.add(earthMesh);

const mars = new Planet(3389.5 * 10, "Mars", "./images/MarsTexture.jpg");
mars.setDistanceToParent(4);
const marsMesh = mars.returnPlanetMesh();
sunMesh.add(marsMesh);

const jupiter = new Planet(
  69911 * 10,
  "Jupiter",
  "./images/JupiterTexture.jpg"
);
jupiter.setDistanceToParent(5);
const jupiterMesh = jupiter.returnPlanetMesh();
sunMesh.add(jupiterMesh);

const saturn = new Planet(58232 * 10, "Saturn", "./images/SaturnTexture.jpg");
saturn.setDistanceToParent(6);
const saturnMesh = saturn.returnPlanetMesh();
sunMesh.add(saturnMesh);

const uranus = new Planet(25362 * 10, "Uranus", "./images/UranusTexture.jpg");
uranus.setDistanceToParent(7);
const uranusMesh = uranus.returnPlanetMesh();
sunMesh.add(uranusMesh);

const neptune = new Planet(
  24622 * 10,
  "Neptune",
  "./images/NeptuneTexture.jpg"
);
neptune.setDistanceToParent(8);
const neptuneMesh = neptune.returnPlanetMesh();
sunMesh.add(neptuneMesh);

//---------

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

cameraControls.setLookAt(5, 0.5, 0.5, 0, 0, 0);

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
