import type RenderObject from '../../../framework/shader/RenderObject';

export default class RenderObjectReadyEvent extends Event {
    static NAME = 'render-object/ready';

    private readonly renderObject: RenderObject;

    constructor(renderObject: RenderObject) {
        super(RenderObjectReadyEvent.NAME);

        this.renderObject = renderObject;
    }

    public getRenderObject() {
        return this.renderObject;
    }
}