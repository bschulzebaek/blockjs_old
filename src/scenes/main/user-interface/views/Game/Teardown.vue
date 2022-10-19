<template>
    <div class="center-absolute">
        Saving ...
    </div>
</template>

<script lang="ts">
// @ts-ignore
import Lifecycle from '@/threads/main/Lifecycle';

export default {
    mounted() {
        Lifecycle.discard();
    },
}
</script>