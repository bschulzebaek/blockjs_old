import RenderContainer from '../RenderContainer';
import RenderObject from '../RenderObject';

export default function syncChunk(data: any) {
    const context = RenderContainer.getRenderer().getContext();

    dispatchEvent(new CustomEvent(
        'chunk-ready',
        {
            detail: {
                id: data.id,
                glass: new RenderObject(context, data.glass),
                solid: new RenderObject(context, data.solid),
            }
        }
    ));
}