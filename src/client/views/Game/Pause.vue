<template>
    <div class="pause-menu">
        <div class="backdrop"></div>
        <div class="menu-grid center-absolute center-absolute--menu">
            <h1>Pause</h1>

            <div class="row">
                <mc-button @click="$stateMachine.to_GameTeardown">Quit to Main Menu</mc-button>
            </div>

            <div class="row mt-4">
                <mc-button @click="$stateMachine.to_GameDefault">Resume</mc-button>
            </div>
        </div>
    </div>
</template>