import { AddCarEntity } from "./AddCarEntity";
import { CarEntity } from "./CarEntity";
import { IOwner } from "./interfaces/IOwner";

export class AddOwnerEntity implements IOwner {
    aLastName: string;
    aFirstName: string;
    aMiddleName: string;
    aCars: AddCarEntity [];
    constructor (lastname:string, firstname: string, middlename: string, cars: AddCarEntity[]){
        this.aLastName = lastname;
        this.aFirstName = firstname;
        this.aMiddleName = middlename;
        this.aCars = cars;
    }
}