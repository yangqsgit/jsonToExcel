
function template () {
    /**
     * 
     * @param {Array} xmlSheets xmlSheet list
     * @returns 
     */
    const xml = function (xmlSheets) {
        let sheetsText = ''
        xmlSheets.forEach(sheet => {
            sheetsText += sheet
        })
        return `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <?mso-application progid="Excel.Sheet"?>
        <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
            <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
                <WindowWidth>20805</WindowWidth>
                <WindowHeight>17190</WindowHeight>
                <ProtectStructure>False</ProtectStructure>
                <ProtectWindows>False</ProtectWindows>
            </ExcelWorkbook>
            <Styles>
                <Style ss:ID="Default" ss:Name="Normal">
                    <Alignment ss:Vertical="Center"/>
                    <Borders/>
                    <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000"/>
                    <Interior/>
                    <NumberFormat/>
                    <Protection/>
                </Style>
                <Style ss:ID="s49"/>
                <Style ss:ID="s50">
                    <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                    <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000" ss:Bold="1"/>
                </Style>
                <Style ss:ID="s51">
                    <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                    <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000" ss:Bold="1"/>
                </Style>
                <Style ss:ID="s52">
                    <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                    <Font ss:FontName="宋体" x:CharSet="134" ss:Size="11" ss:Color="#000000" ss:Bold="1"/>
                </Style>
            </Styles>
            ${sheetsText}
        </Workbook>`
    }
    /**
     * 
     * @param {string} xmlTable 
     * @returns 
     */
    const xmlSheet = function (xmlTable, sheetName) {
        return `
    <Worksheet ss:Name="${sheetName}">
		${xmlTable}
		<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
			<PageSetup>
				<Header x:Margin="0.3"/>
				<Footer x:Margin="0.3"/>
				<PageMargins x:Left="0.7" x:Right="0.7" x:Top="0.75" x:Bottom="0.75"/>
			</PageSetup>
			<TopRowVisible>0</TopRowVisible>
			<LeftColumnVisible>0</LeftColumnVisible>
			<PageBreakZoom>100</PageBreakZoom>
			<ProtectObjects>False</ProtectObjects>
			<ProtectScenarios>False</ProtectScenarios>
		</WorksheetOptions>
	</Worksheet>`
    }
    /**
     * 
     * @param {string} xmlRow 
     * @returns 
     */
    const xmlTable = function (xmlRow) {
        return `<Table ss:ExpandedColumnCount="4" ss:ExpandedRowCount="2" x:FullColumns="1" x:FullRows="1" ss:DefaultColumnWidth="54" ss:DefaultRowHeight="13.5">${xmlRow}</Table>`
    }
    /**
     * 
     * @param {Array} cellArray cellArray cell:{MergeCell:1,text:'cell'} or 'cell'
     * @returns 
     */
    const xmlRow = function (cellArray) {
        let cells = ''
        cellArray.forEach(cell => {
            if (typeof cell === 'object') {
                if (cell.MergeCell && typeof cell.MergeCell === 'number' && cell.MergeCell !== 'e') {
                    cells += `<Cell ss:MergeAcross="${parseInt(cell.MergeCell)}"><Data ss:Type="String">${cell.text + ''}</Data></Cell>`
                } else {
                    throw new Error('cell.MergeCell should be number')
                }
            } else if (typeof (cell + '') === 'string') {
                cells += `<Cell><Data ss:Type="String">${cell + ''}</Data></Cell>`
            } else {
                throw new Error('cell should be object or string')
            }
        });
        return `<Row>${cells}</Row>`
    }
    /**
     * 
     * @param {object|string} header header:{MergeCell:1,text:'header'} or 'header'
     */
    const xmlHeader = function (header) {
        let headerText = ''
        if (typeof header === 'object') {
            if (header.MergeCell && typeof header.MergeCell === 'number' && header.MergeCell !== 'e') {
                headerText = `<Cell ss:StyleID="s52" ss:MergeAcross="${parseInt(header.MergeCell)}"><Data ss:Type="String">${header.text + ''}</Data></Cell>`
            } else {
                throw new Error('header.MergeCell should be number')
            }
        } else if (typeof header === 'string') {
            headerText = `<Cell ss:StyleID="s52" ><Data ss:Type="String">${header + ''}</Data></Cell>`
        } else {
            throw new Error('header should be object or string')
        }
        return `<Row>${headerText}</Row>`
    }
    return { xmlSheet, xmlTable, xmlRow, xmlHeader, xml }
}
export default template()
