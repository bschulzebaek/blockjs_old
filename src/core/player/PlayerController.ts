
import { onLeftClick, onRightClick } from './mouse-controls';
import WorldInterface from '../world/WorldInterface';
import CameraInterface from '../../content/camera/CameraInterface';
import EntityInterface from '../../content/entity/EntityInterface';
import { Vector3 } from '../../common/math';
import Container, { ServiceName } from '../Container';
import Chunk from '../../content/chunk/Chunk';

enum ControlMap {
    WALK_FORWARD = 'w',
    WALK_BACKWARD = 's',
    WALK_LEFT = 'a',
    WALK_RIGHT = 'd',
    JUMP = ' ',
    SPRINT = 'Control'
}

export default class PlayerController {
    static DEFAULT_HEIGHT = 1.7;
    static DEFAULT_WIDTH = 0.6;
    static DEFAULT_SPEED = 6;
    static SPRINT_FACTOR = 1.6;
    static ROTATE_RATE_X = -120;
    static ROTATE_RATE_Y = -135;

    private camera: CameraInterface;
    private entity: EntityInterface;
    private world: WorldInterface;

    private acc = new Vector3();
    private vel = new Vector3();

    private speed: number = PlayerController.DEFAULT_SPEED;
    private lastJump: number = 0;

    private keyDownMap: Map<string, null> = new Map();

    private lastChunkId: string = '';

    constructor(camera: CameraInterface, entity: EntityInterface) {
        this.camera = camera;
        this.entity = entity;
        this.world = Container.getService(ServiceName.WORLD).getWorld();

        camera.setTransform(this.entity.getTransform());

        this.registerEventListener();
    }

    public setPosition(position: Vector3) {
        this.entity.setPosition(position);
    }

    public update(delta: number): void {
        const position = this.entity.getPosition();

        const { camera, world, vel, acc, speed, keyDownMap } = this;

        const { transform } = this.camera;

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
            acc.y = 0.22;
        }

        vel.y += acc.y;
        vel.y -= delta * 0.75;
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

        acc.set(0, 0, 0);

        if (position.y < -100) {
            position.set(8, 100, 8);
        }

        camera.setPosition(position);

        const chunkId = Chunk.getFormattedId(position.x, position.z);

        if (chunkId !== this.lastChunkId) {
            this.lastChunkId = chunkId;
            Container.getService(ServiceName.WORLD).updateChunkGrid(this.entity.getPosition());
        }

        this.debugPosition();
    }

    private debugPosition() {
        const el = document.querySelector('.position-container');

        if (!el) {
            return;
        }

        const { x, y, z } = this.entity.getPosition();

        el.innerHTML = `Position: ${x.toFixed(0)}:${y.toFixed(0)}:${z.toFixed(0)} <br>Chunk: ${this.lastChunkId}`;
    }

    public beforeDestroy() {
        this.discardEventListener();
    }

    private registerEventListener() {
        window.addEventListener('keypress', this.onKeyPress);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('click', this.onClick);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    private discardEventListener() {
        window.removeEventListener('keypress', this.onKeyPress);
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        window.removeEventListener('click', this.onClick);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    private onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (!this.isGameRunning()) {
            return;
        }

        event.preventDefault();

        if (this.keyDownMap.has(event.key)) {
            return;
        }

        this.keyDownMap.set(event.key, null);

        if (event.key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED * PlayerController.SPRINT_FACTOR;
        }
    }

    private onKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();

        if (!this.keyDownMap.has(event.key)) {
            return;
        }

        this.keyDownMap.delete(event.key);

        if (event.key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED;
        }
    }

    private onClick = (event: MouseEvent) => {
        if (!this.isGameRunning()) {
            return;
        }

        if (event.button === 0) {
            onLeftClick.call(this, event);
        } else if (event.button === 2) {
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
              w = PlayerController.DEFAULT_WIDTH / 2,
              h = PlayerController.DEFAULT_HEIGHT / 2;

        return [
            { x: x - w, y: y - h, z: z - w },
            { x: x + w, y: y - h, z: z - w },
            { x: x - w, y: y - h, z: z + w },
            { x: x + w, y: y - h, z: z + w },
            { x: x - w, y,        z: z - w },
            { x: x + w, y,        z: z - w },
            { x: x - w, y,        z: z + w },
            { x: x + w, y,        z: z + w },
            { x: x - w, y: y + h, z: z - w, top: true },
            { x: x + w, y: y + h, z: z - w, top: true },
            { x: x - w, y: y + h, z: z + w, top: true },
            { x: x + w, y: y + h, z: z + w, top: true }
        ];
    }

    private canJump(): boolean {
        const position = this.entity.getPosition();

        const blockAbove = this.world.getBlockId(position.x, position.y + 1, position.z),
              lastJump = this.lastJump,
              now = Date.now(),
              delta = now - lastJump;


        if (delta > 300 && this.vel.y === 0 && blockAbove < 1) {
            this.lastJump = now;

            return true;
        } else {
            return false;
        }
    }

    private isGameRunning() {
        return Container.isRunning();
    }

    private onMouseMove = (event: MouseEvent): void => {
        if (!Container.isRunning()) {
            return;
        }

        event.preventDefault();

        const { movementX, movementY } = event;
        const { transform } = this.camera

        transform.rotation.x += movementY * (PlayerController.ROTATE_RATE_X / window.screen.availHeight);
        transform.rotation.x = Math.max(-90, Math.min(90, transform.rotation.x));
        transform.rotation.y += movementX * (PlayerController.ROTATE_RATE_Y / window.screen.availWidth);

        const entityRotation = this.entity.getTransform().rotation;

        entityRotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
    }

    public createModel() {
        this.entity.createModel();
    }

    public createShader() {
        this.entity.createShader();
    }
}