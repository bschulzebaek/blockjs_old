// @ts-ignore
navigator.keyboard?.lock(['Escape']);

addEventListener('wheel', (event) => {
    event.preventDefault();
}, { passive: false });

addEventListener('contextmenu', (event) => {
    event.preventDefault();
});