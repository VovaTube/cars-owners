import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataServiseService implements InMemoryDbService{

  constructor() { }
  createDb() {
    let carowners = [
      { id: 0,
        aLastName: "Volodimir",
        aFirstName: "Kotyubin",
        aMiddleName: "Yourievith",
        aCars: [
          {
            aBrand: "Toyota",
            aModel: " Prius",
            aModelName: "КА5041ВС",
            aYearProduction: 2004,
          },
          {
            aBrand: "Toyota",
            aModel: " Prius",
            aModelName: "КА5041ВС",
            aYearProduction: 2004,
          },
          {
            aBrand: "Toyota",
            aModel: " Prius",
            aModelName: "КА5041ВС",
            aYearProduction: 2004,
          },
          {
            aBrand: "Toyota",
            aModel: " Prius",
            aModelName: "КА5041ВС",
            aYearProduction: 2004,
          },
          {
            aBrand: "Toyota",
            aModel: " Prius",
            aModelName: "КА5041ВС",
            aYearProduction: 2004,
          },
        ],
        
      }
    ];
    return {carowners};
  }

}
