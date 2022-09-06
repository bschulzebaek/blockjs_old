import RenderContainer from '../RenderContainer';

// @ts-ignore
addEventListener('chunk-ready', (event: CustomEvent) => {
    const { id, solid, glass } = event.detail;
    const worldObjects = RenderContainer.getRenderer().getWorldObjects();

    worldObjects[id] = {
        solid,
        glass
    };
});