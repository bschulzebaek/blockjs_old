<template>
    <mc-background />

    <div class="menu-grid">
        <h1>Options</h1>

        <div class="row">
            Use LocalStorage
        </div>

        <div class="row">
            Foo
        </div>

        <div class="row">
            Bar
        </div>

        <div class="row">
            <mc-button @click="$router.go(-1)">Back</mc-button>
        </div>
    </div>
</template>

<style scoped>
.menu-grid {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>