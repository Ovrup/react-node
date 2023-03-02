class ColumnAttribute {
    dataField: string;
    caption: string;
    dataType: string;
    alignment: string;
    allowSorting: boolean;
    visible: boolean;

    constructor(dataField: string, caption: string, dataType: string, alignment: string, allowSorting: boolean, visible: boolean) {
        this.dataField = dataField;
        this.caption = caption;
        this.dataType = dataType;
        this.alignment = alignment;
        this.allowSorting = allowSorting;
        this.visible = visible
    }
}

export default ColumnAttribute;