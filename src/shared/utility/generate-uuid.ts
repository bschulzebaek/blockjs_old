export default function generateUUID(): string {
    let time_a = new Date().getTime(),
        time_b = (performance.now() * 1000) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;

        if(time_a > 0){
            r = (time_a + r) % 16 | 0;
            time_a = Math.floor(time_a / 16);
        } else {
            r = (time_b + r) % 16 | 0;
            time_b = Math.floor(time_b / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}