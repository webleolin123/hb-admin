export class SalaryInfo {
    public id ?: any;
    public createDate ?: string;
    public month ?: string;
    public status ?: number;

    constructor(
         id ?: any,
         createDate ?: string,
         month ?: string,
         status ?: number,
    ) {
        this.id = id ? id : null;
        this.createDate = createDate ? createDate : null;
        this.month = month ? month : null;
        this.status = status ? status : null;
    }
}
