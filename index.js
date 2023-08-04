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
  new Planet(0.5, "Mercury", "./images/MercuryTexture.jpg", 0.00241),
  new Planet(1.2, "Venus", "./images/VenusTexture.jpg", 0.00615),
  new Planet(1.4, "Earth", "./images/EarthTexture.jpg", 0.01),
  new Planet(1, "Mars", "./images/MarsTexture.jpg", 0.01026),
  new Planet(5, "Jupiter", "./images/JupiterTexture.jpg", 0.01),
  new Planet(4, "Saturn", "./images/SaturnTexture.jpg", 0.00437),
  new Planet(3.1, "Uranus", "./images/UranusTexture.jpg", 0.00173),
  new Planet(3, "Neptune", "./images/NeptuneTexture.jpg", 0.00163),
];

/**function to add planets to the canvas */
function addPlanetsToCanvas() {
  let prevRadius = null;
  let distanceToSun = 0;
  const distanceBetweenPlanets = 1;
  const animationData = [];

  planets.forEach((planet) => {
    const planetMesh = planet.returnPlanetMesh();

    if (prevRadius === null) {
      scene.add(planetMesh);
    } else {
      distanceToSun += prevRadius + planet.radius + distanceBetweenPlanets;

      planetMesh.position.x = distanceToSun;

      scene.add(planetMesh);
    }

    animationData.push({
      mesh: planetMesh,
      rotationAngle: 0,
      rotationSpeed: planet.rotationSpeed,
      baseDistance: planetMesh.position.x,
    });

    prevRadius = planet.radius;
  });

  return animationData;
}

const animationData = addPlanetsToCanvas();

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

/***
 * Compute the animation
 */
const animate = () => {
  animationData.forEach((animation) => {
    if (animation.rotationSpeed) {
      animation.rotationAngle += animation.rotationSpeed;

      animation.mesh.position.x =
        animation.baseDistance * Math.cos(animation.rotationAngle);

      animation.mesh.position.z =
        animation.baseDistance * Math.sin(animation.rotationAngle);

      // animation.mesh.position.set(x, 0, z);
    }
  });

  const delta = clock.getDelta();

  cameraControls.update(delta);

  renderer.render(scene, sceneUtils.camera);

  requestAnimationFrame(animate);
};

animate();
