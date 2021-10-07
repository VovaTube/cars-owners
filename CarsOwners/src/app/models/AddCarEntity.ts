import { ICar } from "./interfaces/ICar";

export class AddCarEntity implements ICar {
    carNumber:string;
    aBrand: string;
    aModel: string;
    aYearProduction: number
constructor(brand: string, model:string, carnumber:string, yearproduction:number){
    this.aBrand = brand;
    this.aModel = model;
    this.aYearProduction = yearproduction;
    this.carNumber = carnumber;
}
}