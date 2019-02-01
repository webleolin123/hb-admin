/**
 * Created by yl on 2017/10/10.
 */
export class Dict {
    public id ?: any;
    public data ?: string;
    public isReadOnly ?: any;
    public isSystem ?: any;
    public kind ?: string;
    public parentId ?: any;
    public remarks ?: string;
    public seq ?: any;
    public text ?: string;
    public value ?: string;

    public isSelected ?: any;
    constructor(id ?: any,
                data ?: string,
                isReadOnly ?: any,
                isSystem ?: any,
                kind ?: string,
                parentId ?: any,
                remarks ?: string,
                seq ?: any,
                text ?: string,
                value ?: string,
                isSelected ?: any) {
        this.id = id ? id : null;
        this.data = data ? data : null;
        this.isReadOnly = isReadOnly ? isReadOnly : null;
        this.isSystem = isSystem ? isSystem : null;
        this.kind = kind ? kind : null;
        this.parentId = parentId ? parentId : null;
        this.remarks = remarks ? remarks : null;
        this.seq = seq ? seq : null;
        this.text = text ? text : null;
        this.value = value ? value : null;
        this.isSelected = isSelected ? isSelected : null;
    }
}
