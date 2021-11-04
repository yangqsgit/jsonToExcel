import jsonExportExcel from './jsonExportExcel'
let plugin = {}
plugin.install = function (Vue) {
    Vue.component(jsonExportExcel.name, jsonExportExcel)
}
export default plugin