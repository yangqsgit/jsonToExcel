<template>
  <div id="app">
    <jsonExportExcel/>
  </div>
</template>

<script>
import jsonExportExcel from "./plugin/jsonExportExcel";

export default {
  name: "App",
  components: {
    jsonExportExcel,
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
