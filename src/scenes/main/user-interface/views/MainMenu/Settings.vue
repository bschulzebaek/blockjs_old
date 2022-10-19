<template>
    <mc-background />

    <div class="menu-grid center-absolute center-absolute--menu">
        <h1>Options</h1>

        <div class="row">
            <div>W, A, S, D</div>
            <div>Walk</div>
        </div>

        <div class="row">
            <div>Space</div>
            <div>Jump</div>
        </div>

        <div class="row">
            <div>Ctrl</div>
            <div>Sprint</div>
        </div>

        <div class="row">
            <div>Left click</div>
            <div>Destroy blocks</div>
        </div>

        <div class="row">
            <div>Right click</div>
            <div>Use item / Interact</div>
        </div>

        <div class="row">
            <div>E</div>
            <div>Inventory</div>
        </div>

        <div class="row">
            <div>Escape</div>
            <div>Pause menu</div>
        </div>

        <div class="row mt-4">
            <mc-button @click="$router.push({ name: 'main-menu' })">Back</mc-button>
        </div>
    </div>
</template>