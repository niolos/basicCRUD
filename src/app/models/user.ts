export class Users{
    _id:string;
    fName: string;
    lName: string;
    alias: string;
    email: string;
    tele:Number;
    dob: string;

    constructor(_id?: string, fName?: string, lName?: string, alias?:string, email?: string, tele?: Number, dob?:string){
        this._id = _id!;
        this.fName = fName!;
        this.lName = lName!;
        this.email = email!;
        this.alias = alias!;
        this.tele = tele!;
        this.dob = dob!;
    }

}