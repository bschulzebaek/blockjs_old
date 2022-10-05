import Model3DInterface from './Model3DInterface';
import { Transform } from '../../shared/math';
import Mesh from './Mesh';

export default class Model3D extends Transform implements Model3DInterface {
    public mesh: Mesh;

    constructor(mesh?: Mesh) {
        super();

        this.mesh = mesh as unknown as Mesh;
    }

    public update(): void {
        this.updateMatrix();
    }
}