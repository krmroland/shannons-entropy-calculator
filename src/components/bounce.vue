<template>
     <transition
     enter-active-class="animated bounceInDown"
     leave-active-class="animated bounceOutUp"
     appear
     mode="out-in" 
     >
     <slot></slot>
    </transition>
</template>

<script>
export default {};
</script>
<style scoped lang="scss">
@import "~animate.css/source/bouncing_entrances/bounceInDown";
@import "~animate.css/source/bouncing_exits/bounceOutUp";
</style>
