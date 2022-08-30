console.log('worker .ts');

addEventListener('message', (message) => {
    console.log('in message handler: ', message);
    postMessage('response test: ' + message.data);
});