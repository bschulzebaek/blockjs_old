import ModelInterface from './ModelInterface';

import { Transform } from '../../../math';
import Mesh from './Mesh';

export default class Model extends Transform implements ModelInterface {

    public mesh: Mesh;

    constructor(mesh?: Mesh) {
        super();

        this.mesh = mesh as unknown as Mesh;
    }

    public update(): void {
        this.updateMatrix();
    }
}