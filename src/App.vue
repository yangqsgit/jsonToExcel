<template>
  <div id="app">
    <jsonToExcel :beforeStart="ttttttttest('eeeee')" />
  </div>
</template>

<script>
import jsonToExcel from "./plugin/jsonExportExcel";

export default {
  name: "App",
  components: {
    jsonToExcel,
  },
  methods: {
    ttttttttest(a) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(a, "=========start");
          resolve();
        }, 5000);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
