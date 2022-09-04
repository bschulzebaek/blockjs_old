<template>
    <img
        class="mc-background"
        :src="$getAssetUrl('main_menu_background.jpg')"
        alt=""
        draggable="false"
    >
</template>

<script lang="ts">
export default {
    inject: ['$getAssetUrl'],
}
</script>