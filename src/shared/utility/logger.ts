export default function logger(payload: any) {
    // @ts-ignore
    if (!self.__DEBUG__) {
        return;
    }

    console.debug(payload);
}