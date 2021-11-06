import jsonGenerateExcel from './jsonGenerateExcel'
let plugin = {}
plugin.install = function (Vue) {
    Vue.component(jsonGenerateExcel.name, jsonGenerateExcel)
}
export default plugin