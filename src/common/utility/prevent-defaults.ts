// @ts-ignore
navigator.keyboard?.lock(['Escape']);

window.addEventListener('wheel', (event) => {
    event.preventDefault();
}, { passive: false });