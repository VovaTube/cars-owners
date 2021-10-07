import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCarEntity } from 'src/app/models/AddCarEntity';
import { AddOwnerEntity } from 'src/app/models/AddOwnerEntity';
import { CarEntity } from 'src/app/models/CarEntity';
import { OwnerEntity } from 'src/app/models/OwnerEntity';
import { CarOwnersServiceService } from 'src/servises/car-owners-service.service';
import { AddownerComponent } from './addeditmodal/addowner/addowner.component';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.scss']
})
export class CarOwnersComponent implements OnInit {
data: any;
databaseowners:OwnerEntity[];
owners: OwnerEntity[] = new Array<OwnerEntity>();
cars: CarEntity[] = new Array<CarEntity>();
  constructor(private dataservise : CarOwnersServiceService, 
              private modalService: NgbModal  
    ) { }

  ngOnInit(): void {
  this.genereteDatabaseCars(5);
  this.generateDatabaseOwners(20);
  this.writeAllOwnersInDatabase(this.owners);
  setTimeout(()=>{
    this.dataservise.getOwners().subscribe((owmers: OwnerEntity[])=>{
      this.databaseowners = owmers;
    })
  },1000)
}

genereteDatabaseCars(counCars: number){
for (let index = 0; index < counCars; index++) {
  let car = new CarEntity("Toyota", " Prius", "КА5041ВС", 2004)
  this.cars.push(car);
}
}

  generateDatabaseOwners(countOvners: number): OwnerEntity[]{
     for (let index = 0; index < countOvners; index++) {
      
      let onwner = new OwnerEntity('Yourievith', 'Kotyubin', 'Volodimir', this.cars )
      this.owners.push(onwner);
    }
    return this.owners;
  }

  writeAllOwnersInDatabase(owners: AddOwnerEntity[]){
    this.owners.forEach(owner => {
      this.dataservise.createOwner(owner.aLastName,owner.aFirstName, owner.aMiddleName, owner.aCars).subscribe((resp)=>{
        console.log(resp)
      })
    });
  }

  showDetails(event, owner: OwnerEntity){
    const addupdateownerModal = this.modalService.open(AddownerComponent, {size:'lg', windowClass:"window-xl-add"});
    addupdateownerModal.result.then((updateowner: OwnerEntity) => {
      this.dataservise.editOwner(updateowner).subscribe((resp)=>{
        this.dataservise.getOwners().subscribe((updetedOwners:OwnerEntity[])=>{
          let x = updetedOwners;
        })
      })
    })
    addupdateownerModal.componentInstance.owner = owner;
    addupdateownerModal.componentInstance.Info = "Редактирование";
    addupdateownerModal.componentInstance.Button = "Сохранить";



  }

}
