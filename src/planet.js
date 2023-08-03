import { Mesh, MeshBasicMaterial, SphereGeometry, TextureLoader } from "three";

/**Class used to represent a planet of the solar system */
export class Planet {
  /***
   * Initialize the class
   * @param {Number} radius - the radius in km. The size will be scaled
   * @param {String} name - the name of the planet
   * @param {string} texture - the relative path to the texture that will be used for the material
   * @param {Number} baseOffset - base offset used to compute distance to parent
   */
  constructor(radius, name, texture, baseOffset = 0) {
    this.radius = radius;

    this.name = name;

    this.texture = texture;

    this.distanceToParent = baseOffset;
  }

  /**Set the distance to the parent object along the x axis */
  setDistanceToParent = (distance) => {
    this.distanceToParent += distance;
  };

  /** Return the planet mesh */
  returnPlanetMesh = () => {
    const geometry = this._returnSphere();

    const material = this._returnMaterial();

    const mesh = new Mesh(geometry, material);

    mesh.position.x = this.distanceToParent;

    mesh.name = this.name;

    return mesh;
  };

  /**Private method to return sphere geometry*/
  _returnSphere = () => {
    return new SphereGeometry(this.radius);
  };

  /**Private method to return material */
  _returnMaterial = () => {
    const loader = new TextureLoader();

    return new MeshBasicMaterial({
      map: loader.load(this.texture),
    });
  };
}
