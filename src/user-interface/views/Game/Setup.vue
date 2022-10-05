<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
import Lifecycle from '../../../threads/main/Lifecycle';

export default {
    inject: ['$store'],
    mounted() {
        Lifecycle.create(this.$store, this.$router);
    },
}
</script>