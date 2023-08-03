import {
  Scene,
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
} from "three";

import CameraControls from "camera-controls";

import { SceneUtils } from "./src/scene-utils";

import { Planet } from "./src/planet";

const scene = new Scene();

const canvas = document.getElementById("threeCanvas");

const sceneUtils = new SceneUtils(scene, canvas);

sceneUtils.addCameraToScene();

const renderer = sceneUtils.returnRenderer();

const planets = [
  new Planet(10, "Sun", "./images/SunTexture.jpg"),
  new Planet(0.5, "Mercury", "./images/MercuryTexture.jpg"),
  new Planet(1.2, "Venus", "./images/VenusTexture.jpg"),
  new Planet(1.4, "Earth", "./images/EarthTexture.jpg"),
  new Planet(1, "Mars", "./images/MarsTexture.jpg"),
  new Planet(5, "Jupiter", "./images/JupiterTexture.jpg"),
  new Planet(4, "Saturn", "./images/SaturnTexture.jpg"),
  new Planet(3.1, "Uranus", "./images/UranusTexture.jpg"),
  new Planet(3, "Neptune", "./images/NeptuneTexture.jpg"),
];

/**function to add planets to the canvas */
function addPlanetsToCanvas() {
  let prevRadius = null;
  let distanceToSun = 0;
  const distanceBetweenPlanets = 1;

  planets.forEach((planet) => {
    const planetMesh = planet.returnPlanetMesh();

    if (prevRadius === null) {
      scene.add(planetMesh);
    } else {
      distanceToSun += prevRadius + planet.radius + distanceBetweenPlanets;

      planetMesh.position.x = distanceToSun;

      scene.add(planetMesh);
    }

    prevRadius = planet.radius;
  });
}

addPlanetsToCanvas();

/***
 * Make window respond to resizing by also updating the projection matrix
 */
window.addEventListener("resize", () => {
  const sizeRatio = canvas.clientWidth / canvas.clientHeight;

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

cameraControls.setLookAt(20, 0.5, 0.5, 0, 0, 0);

const axis = new Vector3(0, 0.1, 0.1);
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
