import StoreClassInterface from './StoreClassInterface';

export default interface StoreClassConstructorInterface {
    new(...args: any[]): StoreClassInterface;
    createFromRaw(raw: any): StoreClassInterface;
}