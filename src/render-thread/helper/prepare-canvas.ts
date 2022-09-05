export default function prepareCanvas(canvas: OffscreenCanvas) {
    const context = canvas.getContext('webgl2')!;

    canvas.width = 1920;
    canvas.height = 1080;

    context.viewport(0, 0, canvas.width, canvas.height);

    context.clearColor(0, 0, 0, 1.0);
    context.enable(context.DEPTH_TEST);
    context.enable(context.CULL_FACE);
    context.depthFunc(context.LEQUAL);
    context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
}