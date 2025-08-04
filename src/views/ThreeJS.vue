<template>
     <canvas id="bg"></canvas>
</template>

<script>
import ThreeJSScene from '@/scripts/threejs';

export default {
    name: 'ThreeJS',
    mounted() {
        this.threeScene = new ThreeJSScene('#bg')
        this.threeScene.init()
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize)
    },
};
</script>

<style scoped>
#bg{
    height: 100%;
}
</style>