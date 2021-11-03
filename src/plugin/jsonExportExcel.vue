<template>
  <span @click="exportExcel">{{ btnText }}</span>
</template>

<script>
import xmlTemplate from "./xmlTemplate";
export default {
  name: "exportToExecl",
  props: {
    btnText: {
      type: String,
      default: "导出表格",
    },
  },
  data() {
    return {
      sheetData: {
        fileName: "示例表格",
        sheetList: [
          {
            sheetName: "sheet1",
            header: "adwdwdadw",
            rowList: [
              ["mmmmmm", "ggggggg"],
              [111111, 222222],
            ],
          },
          {
            sheetName: "sheet2",
            header: { MergeCell: 2, text: "header" },
            rowList: [
              ["mmmmmm", "ggggggg", { MergeCell: 2, text: 1111111111 }],
              [111111, 222222],
            ],
          },
        ],
      },
    };
  },
  methods: {
    exportExcel() {
      const xmlData = this.generateXml(this.sheetData);
      const xmlBlob = this.base64ToBlob(xmlData);
      const _a = document.createElement("a");
      _a.href = URL.createObjectURL(xmlBlob);
      _a.download = `${this.sheetData.fileName || "示例表格"}.xls`;
      _a.click();
    },
    generateXml(data) {
      if (data.sheetList.length === 0) return;
      let xmlSheets = [];
      data.sheetList.forEach((sheet, index) => {
        let xmlTableContent = "";
        if (sheet.header) {
          xmlTableContent += xmlTemplate.xmlHeader(sheet.header);
        }
        if (sheet.rowList && sheet.rowList.length !== 0) {
          sheet.rowList.forEach((row) => {
            xmlTableContent += xmlTemplate.xmlRow(row);
          });
        }
        const xmlTable = xmlTemplate.xmlTable(xmlTableContent);
        const xmlSheet = xmlTemplate.xmlSheet(
          xmlTable,
          sheet.sheetName || `Sheet${index + 1}`
        );
        xmlSheets.push(xmlSheet);
      });
      return xmlTemplate.xml(xmlSheets);
    },
    base64ToBlob(data) {
      let base64 = window.btoa(window.unescape(encodeURIComponent(data)));
      let bstr = atob(base64);
      let n = bstr.length;
      let u8arr = new Uint8ClampedArray(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "application/vnd.ms-excel" });
    },
  },
};
</script>

<style>
</style>
