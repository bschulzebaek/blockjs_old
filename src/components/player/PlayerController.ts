import type World from '../world/World';
import type Entity from '../entity/Entity';
import CameraInterface from '../camera/CameraInterface';
import { Vector3 } from '../../shared/math';
import { onLeftClick, onRightClick } from './mouse-controls';
import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import Chunk from '../chunk/Chunk';
import UpdateGridEvent from '../world/events/UpdateGridEvent';

enum ControlMap {
    WALK_FORWARD = 'w',
    WALK_BACKWARD = 's',
    WALK_LEFT = 'a',
    WALK_RIGHT = 'd',
    JUMP = ' ',
    SPRINT = 'Control',
}

export default class PlayerController implements SceneObjectInterface {
    static SCENE_ID = 'player-controller';
    static DEFAULT_HEIGHT = 1.7;
    static DEFAULT_WIDTH = 0.6;
    static DEFAULT_SPEED = 6;
    static SPRINT_FACTOR = 1.6;
    static JUMP_ACCELERATION = 0.3;
    static ROTATE_RATE_X = -120;
    static ROTATE_RATE_Y = -135;

    private camera: CameraInterface;
    private entity: Entity;
    private world: World;

    private keyDownMap: Map<string, null> = new Map();

    private acc = new Vector3();
    private vel = new Vector3();

    private speed: number = PlayerController.DEFAULT_SPEED;
    private lastJump: number = 0
    private lastChunkId = '';

    constructor(camera: CameraInterface, entity: Entity, world: World) {
        this.camera = camera;
        this.entity = entity;
        this.world = world;

        this.syncCameraPosition();
        this.registerEventListener();

        const entityPosition = entity.getPosition(),
              entityRotation = entity.getTransform().getRotation();

        this.camera.getTransform().setRotation(entityRotation.x, entityRotation.y, entityRotation.z);
        this.lastChunkId = Chunk.getFormattedId(entityPosition.x, entityPosition.z);
    }

    public getId() {
        return PlayerController.SCENE_ID;
    }

    public getShader() {
        return null; // this.entity.getShader
    }

    public getRenderData() {
        return null; // this.entity.getRenderData
    }

    public getEntity() {
        return this.entity;
    }

    public setPosition(position: Vector3) {
        this.entity.setPosition(position);
    }

    public update(delta: number): void {

        const { world, vel, acc, speed, keyDownMap } = this,
              position = this.entity.getPosition(),
              transform = this.camera.getTransform();

        const keydownForward = keyDownMap.has(ControlMap.WALK_FORWARD),
              keydownBackward = keyDownMap.has(ControlMap.WALK_BACKWARD),
              keydownLeft = keyDownMap.has(ControlMap.WALK_LEFT),
              keydownRight = keyDownMap.has(ControlMap.WALK_RIGHT),
              keydownJump = keyDownMap.has(ControlMap.JUMP);

        let xo = 0,
            yo = 0,
            zo = 0;

        if (keydownForward || keydownBackward) {
            const dir = keydownBackward ? 1 : -1,
                  v = delta * speed * dir,
                  angle = Math.atan2(transform.forward[2], transform.forward[0]);

            xo += Math.cos(angle) * v;
            zo += Math.sin(angle) * v;
        }

        if (keydownLeft || keydownRight) {
            const dir = keydownRight ? 1 : -1,
                  v = delta * speed * dir;

            xo += transform.right[0] * v;
            zo += transform.right[2] * v;
        }

        if (keydownJump && this.canJump()) {
            acc.y = PlayerController.JUMP_ACCELERATION;
        }

        vel.y += acc.y;
        vel.y -= delta * 0.999;
        yo = vel.y;

        this.getSurroundingCoordinates().forEach(({ x, y, z, top }) => {
            if (xo !== 0 && world.getBlockId(x + xo, y, z)) {
                xo = 0;
            }

            if (zo !== 0 && world.getBlockId(x + xo, y, z + zo)) {
                zo = 0;
            }

            if (yo !== 0 && world.getBlockId(x + xo, y + yo, z + zo)) {
                if (top || vel.y <= 0) {
                    yo = 0;
                    vel.y = 0;
                }
            }
        });

        position.add(xo, yo, zo);

        this.syncCameraPosition();

        acc.set(0, 0, 0);

        if (position.y < -100) {
            position.set(8, 100, 8);
        }

        this.updateChunkPosition(position.x, position.z);

        this.debugPosition();
    }

    private updateChunkPosition(x: number, z: number) {
        const chunkId = Chunk.getFormattedId(x, z);

        if (chunkId !== this.lastChunkId) {
            this.lastChunkId = chunkId;
            dispatchEvent(new UpdateGridEvent(x, z));
        }
    }

    private syncCameraPosition() {
        const position = this.entity.getPosition();

        this.camera.getTransform().setPosition(position.x, position.y + PlayerController.DEFAULT_HEIGHT, position.z);
    }

    private debugPosition() {
        // @ts-ignore
        const { x, y, z } = this.entity.getPosition();
    }

    public async discard(): Promise<void> {
        this.discardEventListener();
    }

    private registerEventListener() {
        addEventListener('keypress', this.onKeyPress);
        addEventListener('keydown', this.onKeyDown);
        addEventListener('keyup', this.onKeyUp);
        addEventListener('click', this.onClick);
        addEventListener('mousemove', this.onMouseMove);
    }

    private discardEventListener() {
        removeEventListener('keypress', this.onKeyPress);
        removeEventListener('keydown', this.onKeyDown);
        removeEventListener('keyup', this.onKeyUp);
        removeEventListener('click', this.onClick);
        removeEventListener('mousemove', this.onMouseMove);
    }

    private onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
    }

    private onKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();

        // @ts-ignore
        const { key } = event.detail;

        if (this.keyDownMap.has(key)) {
            return;
        }

        this.keyDownMap.set(key, null);

        if (key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED * PlayerController.SPRINT_FACTOR;
        }
    }

    private onKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();

        // @ts-ignore
        const { key } = event.detail;

        if (!this.keyDownMap.has(key)) {
            return;
        }

        this.keyDownMap.delete(key);

        if (key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED;
        }
    }

    private onClick = (event: MouseEvent) => {
        // @ts-ignore
        const { button } = event.detail;

        if (button === 0) {
            onLeftClick.call(this, event);
        } else if (button === 2) {
            onRightClick.call(this, event);
        }
    }

    public isBlocking(targetX: number, targetY: number, targetZ: number): boolean {
        return this.getSurroundingCoordinates().some(({ x, y, z }) => {
            return Math.floor(x) === targetX && Math.floor(y) === targetY && Math.floor(z) === targetZ;
        });
    }

    private getSurroundingCoordinates() {
        const { x, y, z } = this.entity.getPosition(),
              radius = PlayerController.DEFAULT_WIDTH / 2;

        const x0 = x - radius,
              x1 = x + radius,
              y0 = y + PlayerController.DEFAULT_HEIGHT / 2,
              y1 = y + PlayerController.DEFAULT_HEIGHT,
              z0 = z - radius,
              z1 = z + radius;

        return [
            { x: x0, y, z: z0 },
            { x: x1, y, z: z0 },
            { x: x0, y, z: z1 },
            { x: x1, y, z: z1 },
            { x: x0, y: y0, z: z0 },
            { x: x1, y: y0, z: z0 },
            { x: x0, y: y0, z: z1 },
            { x: x1, y: y0, z: z1 },
            { x: x0, y: y1, z: z0, top: true },
            { x: x1, y: y1, z: z0, top: true },
            { x: x0, y: y1, z: z1, top: true },
            { x: x1, y: y1, z: z1, top: true }
        ];
    }

    private canJump(): boolean {
        const position = this.entity.getPosition();

        const aboveBlockId = this.world.getBlockId(position.x, position.y + 1, position.z),
              lastJump = this.lastJump,
              now = Date.now(),
              delta = now - lastJump;


        if (delta > 300 && this.vel.y === 0 && aboveBlockId < 1) {
            this.lastJump = now;

            return true;
        } else {
            return false;
        }
    }

    private onMouseMove = (event: MouseEvent): void => {
        // @ts-ignore
        const { movementX, movementY } = event.detail,
              rotation = this.camera.getTransform().getRotation();

        rotation.add(
            movementY * (PlayerController.ROTATE_RATE_X / 1920),
            movementX * (PlayerController.ROTATE_RATE_Y / 1080),
            0
        );

        rotation.x = Math.max(-90, Math.min(90, rotation.x));

        this.entity.getTransform().getRotation().set(rotation.x, rotation.y, rotation.z);
    }
}