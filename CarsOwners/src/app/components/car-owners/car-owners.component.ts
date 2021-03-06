import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from 'src/app/modal-windows/action/confirm-action/confirm-action.component';
import { AddCarEntity } from 'src/app/models/AddCarEntity';
import { AddOwnerEntity } from 'src/app/models/AddOwnerEntity';
import { CarEntity } from 'src/app/models/CarEntity';
import { OwnerEntity } from 'src/app/models/OwnerEntity';
import { CarOwnersServiceService } from 'src/servises/car-owners-service.service';
import { AddownerComponent } from './addeditmodal/addowner/addowner.component';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.scss'],
})
export class CarOwnersComponent implements OnInit {
  data: any;
  databaseowners: OwnerEntity[];
  owners: OwnerEntity[] = new Array<OwnerEntity>();
  cars: CarEntity[] = new Array<CarEntity>();
  selectedrowowner = undefined;
  constructor(
    private dataservise: CarOwnersServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.genereteDatabaseCars(5);
    this.generateDatabaseOwners(50);
    this.writeAllOwnersInDatabase(this.owners);
    setTimeout(() => {
      this.dataservise.getOwners().subscribe((owmers: OwnerEntity[]) => {
        this.databaseowners = owmers;
      });
    }, 1000);
  }

  editOwner() {
    if (!this.selectedrowowner) {
      this.selectedrowowner = 0;
    }
    const editownerModal = this.modalService.open(AddownerComponent, {
      size: 'lg',
      windowClass: 'window-xl-add',
    });
    editownerModal.result.then(
      (updateowner: OwnerEntity) => {
        if (updateowner !== null || undefined) {
          this.dataservise.editOwner(updateowner).subscribe((resp) => {
            this.dataservise
              .getOwners()
              .subscribe((updetedOwners: OwnerEntity[]) => {
                let x = updetedOwners;
              });
          });
        }
      },
      (error) => {}
    );
    editownerModal.componentInstance.owner =
      this.databaseowners[this.selectedrowowner];
    editownerModal.componentInstance.Info = '????????????????????????????';
    editownerModal.componentInstance.Button = '??????????????????';
    editownerModal.componentInstance.disableEditing = false;
    editownerModal.componentInstance.owners = this.databaseowners;
    editownerModal.componentInstance.editindflag = true;
  }

  addNewOwner() {
    let car: CarEntity[] = [];
    let owner = new OwnerEntity('', '', '', car);
    const addupdateownerModal = this.modalService.open(AddownerComponent, {
      size: 'lg',
      windowClass: 'window-xl-add',
    });
    addupdateownerModal.result.then(
      (addowner: OwnerEntity) => {
        if (addowner !== null || undefined) {
          this.dataservise
            .createOwner(
              addowner.aLastName,
              addowner.aFirstName,
              addowner.aMiddleName,
              addowner.aCars
            )
            .subscribe((resp) => {
              this.databaseowners.push(resp);
            });
        }
      },
      (error) => {}
    );
    addupdateownerModal.componentInstance.owner = owner;
    addupdateownerModal.componentInstance.Info = '???????????????????? ????????????????????????';
    addupdateownerModal.componentInstance.Button = '????????????????';
    addupdateownerModal.componentInstance.owners = this.databaseowners;
    addupdateownerModal.componentInstance.owners = this.databaseowners;
    addupdateownerModal.componentInstance.editindflag = false;
  }

  deleteOwner() {
    if (!this.selectedrowowner) {
      this.selectedrowowner = 0;
    }
    let car: CarEntity[] = [];
    let owner = new OwnerEntity('', '', '', car);
    const asseptModal = this.modalService.open(ConfirmActionComponent, {
      size: 'sm',
      centered: true,
    });
    asseptModal.result.then(
      (respaseppt) => {
        if (respaseppt) {
          this.dataservise
            .deleteOwner(this.databaseowners[this.selectedrowowner].id)
            .subscribe((resp) => {
              this.databaseowners.splice(this.selectedrowowner, 1);
            });
        }
      },
      (error) => {}
    );
    asseptModal.componentInstance.actionName = `?????????????? ???????????????????????? ${
      this.databaseowners[this.selectedrowowner].aFirstName
    } `;
  }

  viewOwner() {
    if (!this.selectedrowowner) {
      this.selectedrowowner = 0;
    }
    const viewovners = this.modalService.open(AddownerComponent, {
      size: 'lg',
      windowClass: 'window-xl-add',
    });
    viewovners.result.then(
      (addowner: OwnerEntity) => {},
      (error) => {}
    );
    viewovners.componentInstance.owner =
      this.databaseowners[this.selectedrowowner];
    viewovners.componentInstance.Info = '???????????????? ????????????????????';
    viewovners.componentInstance.disableEditing = true;
  }

  selectOwner(event: any, rowcount: number) {
    this.selectedrowowner = rowcount;
  }
  
  genereteDatabaseCars(counCars: number) {
    for (let index = 0; index < counCars; index++) {
      let car = new CarEntity('Toyota', 'Prius', '????5041????', 2004);
      this.cars.push(car);
    }
  }

  generateDatabaseOwners(countOvners: number): OwnerEntity[] {
    for (let index = 0; index < countOvners; index++) {
      let onwner = new OwnerEntity(
        'Yourievich',
        'Kotyubin',
        'Volodimir',
        this.cars
      );
      this.owners.push(onwner);
    }
    return this.owners;
  }

  writeAllOwnersInDatabase(owners: AddOwnerEntity[]) {
    this.owners.forEach((owner) => {
      this.dataservise
        .createOwner(
          owner.aLastName,
          owner.aFirstName,
          owner.aMiddleName,
          owner.aCars
        ).subscribe();
    });
  }
}
