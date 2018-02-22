<template>
     <transition
     enter-active-class="animated zoomIn"
     leave-active-class="animated zoomOut"
     appear
     mode="out-in" 
     >
     <slot></slot>
    </transition>
</template>

<script>
export default {};
</script>
<style lang="scss">
/* zoom */
@import "~animate.css/source/zooming_entrances/zoomIn";
@import "~animate.css/source/zooming_exits/zoomOut";
</style>
