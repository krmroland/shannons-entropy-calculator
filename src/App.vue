<template>
  <div id="app" class="container-fluid">
    <FlashComponent></FlashComponent>
    <zoom>
      <LoginPage v-if="!isLoggedIn"></LoginPage>
      <div v-else>
        <div class="row mt-5">
          <TablesSideBar></TablesSideBar>
          <div class="col-md-9"  v-if="activeTable">
            <TablesComponent/>
            <EntropyCalculator/>
          </div>
        </div>
       
      </div>
    </zoom>



  </div>
</template>

<script>
import LoginPage from "./components/LoginComponent.vue";
import TablesComponent from "./components/TablesComponent.vue";
import FlashComponent from "./flash/FlashComponent";
import TablesSideBar from "./components/TablesSideBar.vue";
import EntropyCalculator from "./components/EntropyCalculator";
export default {
  name: "app",
  components: {
    LoginPage,
    TablesComponent,
    FlashComponent,
    TablesSideBar,
    EntropyCalculator
  },
  created() {
    // window.onbeforeunload = function(e) {
    //   e.returnValue = "You are about to Leave";
    //   return e.returnValue;
    // };
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
    activeTable() {
      return this.$store.state.activeTable;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/variables";
@import "~bootstrap/scss/bootstrap";
@import "src/assets/utilities";
@import "src/assets/custom";
</style>
