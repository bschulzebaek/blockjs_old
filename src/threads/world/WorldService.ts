import spawnChild from './helper/spawn-child';
import WorldContainer from './WorldContainer';
import { WorldMessages } from '../../shared/messages/ThreadMessages';

export default class WorldService {
    static WORKER_LIMIT = 64;

    public onSubTermination(name: string) {
        WorldContainer.getWorker().delete(name);
    }

    public broadcastUpdate(id: string) {
        let found = false;

        Array.from(WorldContainer.getWorker().values()).forEach(({ chunks, worker }) => {
            if (found) {
                return;
            }

            if (chunks.includes(id)) {
                found = true;

                worker.postMessage({
                    action: WorldMessages.IN_UPDATE_CHUNK,
                    detail: id,
                });
            }
        });

        if (!found) {
            this.createChunks([ id ]);
        }
    }

    public broadcastDiscard(ids: string[]) {
        Array.from(WorldContainer.getWorker().values()).forEach(({ chunks, worker }) => {
            const intersection = ids.filter(value => chunks.includes(value));

            if (intersection.length === 0) {
                return;
            }

            worker.postMessage({
                action: WorldMessages.IN_DISCARD_CHUNK,
                detail: intersection,
            });
        });
    }

    public createChunks(ids: string[]) {
        const batchCount = Math.ceil(ids.length / WorldService.WORKER_LIMIT);
        let batches: string[][] = [];

        for (let i = 0; i < batchCount; i++) {
            batches.push([]);
        }

        ids.forEach((id) => {
            for (let i = 0; i < batchCount; i++) {
                batches[i].push(id);
            }
        });


        batches.forEach(this.processBatch);
    }

    private processBatch = (batch: string[]) => {
        let unassigned = new Set(batch);

        Array.from(WorldContainer.getWorker().values()).forEach(({ chunks, worker }) => {
            let newChunks: Set<string> = new Set();

            while (chunks.length < WorldService.WORKER_LIMIT && batch.length) {
                const id = batch.shift()!;

                newChunks.add(id);
                unassigned.delete(id);
            }

            if (newChunks.size) {
                this.moveBatchToExistingWorker(Array.from(newChunks.values()), worker);
            }

            if (batch.length === 0) {
                return;
            }

            const intersection = batch.filter(value => chunks.includes(value));

            if (intersection.length === 0) {
                return;
            }

            intersection.forEach((id) => {
                unassigned.delete(id);
            });

            worker.postMessage({
                action: WorldMessages.IN_UPDATE_CHUNKS,
                detail: intersection,
            });
        });

        if (unassigned.size === 0) {
            return;
        }

        this.moveBatchToNewWorker(Array.from(unassigned.values()));
    }

    private moveBatchToExistingWorker(batch: string[], worker: Worker) {
        worker.postMessage({
            action: WorldMessages.IN_CREATE_CHUNK,
            detail: batch,
        });
    }

    private moveBatchToNewWorker(batch: string[]) {
        spawnChild(batch);
    }
}