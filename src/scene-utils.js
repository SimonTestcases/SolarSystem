import {
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  AxesHelper,
  GridHelper,
  Scene,
} from "three";

/**Class used to set up canvas properly */
export class SceneUtils {
  /***
   * Initialize class
   * @param {Scene} scene - the scene
   * @param {HTMLCanvasElement} canvas - the canvas
   */
  constructor(scene, canvas) {
    this.scene = scene;

    this.canvas = canvas;

    this.camera = this._returnCamera();
  }

  /***Private method to return camera */
  _returnCamera = () => {
    const sizeRatio = this.canvas.clientWidth / this.canvas.clientHeight;

    return new PerspectiveCamera(75, sizeRatio);
  };

  /***
   * Add a local axis to the scene
   */
  addAxes = () => {
    const axes = new AxesHelper();

    axes.material.depthTest = false;

    //ensure that axes is rendered last so that we will always see it
    axes.renderOrder = 2;

    this.scene.add(axes);
  };

  /***
   * Add a grid to the scene
   */
  addGrid = () => {
    const grid = new GridHelper();

    grid.material.depthTest = false;

    this.scene.add(grid);
  };

  /***
   * Add the camera to the scene
   */
  addCameraToScene = () => {
    this.scene.add(this.camera);
  };

  /***
   * Add lights to the scene
   */
  addLightToScene = () => {
    const skyColor = 0xb1e1ff;

    const groundColor = 0xb97a20;

    const intensity = 2;

    const light = new HemisphereLight(skyColor, groundColor, intensity);

    this.scene.add(light);
  };

  /***
   * Get and return the renderer of the html canvas
   * @returns {WebGLRenderer} - the render object
   */
  returnRenderer = () => {
    const renderer = new WebGLRenderer({ canvas: this.canvas });

    const pixelRatio = Math.max(window.devicePixelRatio, 2);

    renderer.setPixelRatio(pixelRatio);

    renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);

    renderer.setClearColor(0xf5f5f5, 1);

    return renderer;
  };
}
