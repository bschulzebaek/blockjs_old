import ModelInterface from './ModelInterface';

import { Transform } from '../../shared/math';
import RawMesh from './RawMesh';

export default class Model extends Transform implements ModelInterface {

    public mesh: RawMesh;

    constructor(mesh?: RawMesh) {
        super();

        this.mesh = mesh as unknown as RawMesh;
    }

    public update(): void {
        this.updateMatrix();
    }
}