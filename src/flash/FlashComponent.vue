<template>
    <bounce>
        <div v-if="isShowing" class="alert text-center" :class="flashClass">
            <i :class="icon"/>
            <span v-text="message"/>
        </div>
    </bounce>
</template>

<script>
export default {
    props: ["data"],
    mounted() {
        window.GlobalBus.$on("flash-message", (message, icon, flashClass) => {
            this.message = message;
            this.icon = icon;
            this.flashClass = flashClass;
            this.flash();
        });
    },
    data() {
        return {
            isShowing: false,
            message: "",
            icon: "",
            flashClass: ""
        };
    },
    methods: {
        flash() {
            this.isShowing = true;
            setTimeout(() => (this.isShowing = false), 3000);
        }
    }
};
</script>

<style scoped>
.alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1060;
}
</style>
