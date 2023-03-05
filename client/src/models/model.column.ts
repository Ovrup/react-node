class ColumnAttribute {
    dataField: string;
    caption: string;
    dataType: string;
    alignment: string;
    allowSorting: boolean;
    visible: boolean;
    width: string

    constructor(dataField: string, caption: string, dataType: string, alignment: string, allowSorting: boolean, visible: boolean, width: string) {
        this.dataField = dataField;
        this.caption = caption;
        this.dataType = dataType;
        this.alignment = alignment;
        this.allowSorting = allowSorting;
        this.visible = visible;
        this.width = width
    }
}


export default ColumnAttribute;