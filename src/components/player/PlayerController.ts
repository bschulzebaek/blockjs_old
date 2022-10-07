import type World from '../world/World';
import type Entity from '../entity/Entity';
import CameraInterface from '../camera/CameraInterface';
import { Vector3 } from '../../shared/math'
import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import Chunk from '../chunk/Chunk';
import UpdateGridEvent from '../world/events/UpdateGridEvent';
import RigidBody from '../../framework/physics/RigidBody';
import CollisionShape from '../../framework/physics/CollisionShape';

enum ControlMap {
    WALK_FORWARD = 'w',
    WALK_BACKWARD = 's',
    WALK_LEFT = 'a',
    WALK_RIGHT = 'd',
    JUMP = ' ',
    SPRINT = 'Control',
    CROUCH = 'Shift',
}

enum Modes {
    NORMAL = 0,
    FLY = 1,
    GHOST = 2,
}

export default class PlayerController implements SceneObjectInterface {
    static SCENE_ID = 'player-controller';
    static DEFAULT_HEIGHT = 1.7;
    static DEFAULT_WIDTH = 0.6;
    static DEFAULT_SPEED = 0.2;
    static SPRINT_FACTOR = 1.4;
    static JUMP_ACCELERATION = 0.165;
    static ROTATE_RATE_X = -120;
    static ROTATE_RATE_Y = -135;

    private readonly camera: CameraInterface;
    private readonly entity: Entity;
    private readonly rigidBody: RigidBody;
    private readonly collisionShape: CollisionShape;

    private keyDownSet: Set<string> = new Set();
    private mode: Modes = Modes.NORMAL;
    private speed: number = PlayerController.DEFAULT_SPEED;
    private lastChunkId = '';

    constructor(camera: CameraInterface, entity: Entity, world: World) {
        this.camera = camera;
        this.entity = entity;

        this.syncCameraPosition();
        this.registerEventListener();

        const transform = entity.getTransform(),
            entityPosition = transform.getPosition(),
            entityRotation = transform.getRotation();

        this.collisionShape = new CollisionShape(
            this.entity.getId(),
            transform,
            world,
            0.6,
            0.6,
            1.7
        );
        this.rigidBody = new RigidBody(
            this.entity.getTransform(),
            this.collisionShape,
            this.mode === Modes.NORMAL,
            this.mode !== Modes.GHOST,
        );

        this.camera.getTransform().setRotation(entityRotation.x, entityRotation.y, entityRotation.z);
        this.lastChunkId = Chunk.getFormattedId(entityPosition.x, entityPosition.z);
    }

    public getId() {
        return PlayerController.SCENE_ID;
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

    public setMode(mode: Modes) {
        this.mode = mode;
    }

    public update(): void {
        const position = this.entity.getPosition(),
            force = this.getMovementForce();

        this.rigidBody.addForce(force.x, force.y, force.z);
        this.rigidBody.update();

        this.syncCameraPosition();
        this.updateChunkPosition(position.x, position.z);
        this.debugPosition();
    }

    private getMovementForce() {
        const { speed, keyDownSet } = this,
            transform = this.camera.getTransform(),
            force = new Vector3();

        const keydownForward = keyDownSet.has(ControlMap.WALK_FORWARD),
            keydownBackward = keyDownSet.has(ControlMap.WALK_BACKWARD),
            keydownLeft = keyDownSet.has(ControlMap.WALK_LEFT),
            keydownRight = keyDownSet.has(ControlMap.WALK_RIGHT),
            keydownJump = keyDownSet.has(ControlMap.JUMP),
            keydownCrouch = keyDownSet.has(ControlMap.CROUCH);

        if (keydownForward || keydownBackward) {
            const dir = keydownBackward ? 1 : -1,
                v = speed * dir,
                angle = Math.atan2(transform.forward[2], transform.forward[0]);

            force.x += Math.cos(angle) * v;
            force.z += Math.sin(angle) * v;
        }

        if (keydownLeft || keydownRight) {
            const dir = keydownRight ? 1 : -1,
                v = speed * dir;

            force.x += transform.right[0] * v;
            force.z += transform.right[2] * v;
        }

        if (keydownJump && this.canJump()) {
            force.y = PlayerController.JUMP_ACCELERATION;
        }

        if (keydownCrouch) {
            if (this.mode === Modes.FLY || this.mode === Modes.GHOST) {
                force.y = -PlayerController.JUMP_ACCELERATION;
            }
        }

        return force;
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
        addEventListener('mousemove', this.onMouseMove);
    }

    private discardEventListener() {
        removeEventListener('keypress', this.onKeyPress);
        removeEventListener('keydown', this.onKeyDown);
        removeEventListener('keyup', this.onKeyUp);
        removeEventListener('mousemove', this.onMouseMove);
    }

    private onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
    }

    private onKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();

        // @ts-ignore
        const { key } = event.detail;

        if (this.keyDownSet.has(key)) {
            return;
        }

        this.keyDownSet.add(key);

        if (key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED * PlayerController.SPRINT_FACTOR;
        }
    }

    private onKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();

        // @ts-ignore
        const { key } = event.detail;

        if (!this.keyDownSet.has(key)) {
            return;
        }

        this.keyDownSet.delete(key);

        if (key === ControlMap.SPRINT) {
            this.speed = PlayerController.DEFAULT_SPEED;
        }
    }

    public isBlocking(x: number, y: number, z: number): boolean {
        return this.collisionShape.isBlocking(x, y, z);
    }

    private canJump(): boolean {
        return this.rigidBody.getForce().y === 0;
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