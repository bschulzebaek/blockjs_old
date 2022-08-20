export default function prepareCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('webgl2')!,
          width = window.innerWidth,
          height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    context.viewport(0, 0, window.innerWidth, window.innerHeight);

    context.clearColor(0, 0, 0, 1.0);
    context.enable(context.DEPTH_TEST);
    context.enable(context.CULL_FACE);
    context.depthFunc(context.LEQUAL);
    context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

    canvas.requestPointerLock();
}