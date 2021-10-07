import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from 'src/app/modal-windows/action/confirm-action/confirm-action.component';
import { AddCarEntity } from 'src/app/models/AddCarEntity';
import { CarEntity } from 'src/app/models/CarEntity';
import { OwnerEntity } from 'src/app/models/OwnerEntity';

@Component({
  selector: 'app-addowner',
  templateUrl: './addowner.component.html',
  styleUrls: ['./addowner.component.scss'],
})
export class AddownerComponent implements OnInit {
  @Input() owner: OwnerEntity;
  @Input() owners: OwnerEntity[];
  @Input() Info: string;
  @Input() Button: string;
  @Input() disableEditing: boolean;

  ownerForm: FormGroup;
  cars: FormArray = new FormArray([]);
  submitted = false;
  existingcarflag = false;
  editindflag = false;
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private modalServise: NgbModal
  ) {}

  ngOnInit(): void {
    this.initSettingsForm();
  }
  initSettingsForm() {
    if (this.owner.aCars.length) {
      Array.from(this.owner.aCars).forEach((carelement) => {
        this.cars.push(
          this.formBuilder.group({
            carnumber: [
              carelement.carNumber,
              Validators.compose([
                Validators.required,
                Validators.pattern(
                  '[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}'
                ),
              ]),
            ],
            carbrand: [
              carelement.aBrand,
              Validators.compose([
                Validators.required,
                Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
              ]),
            ],
            carmodelname: [
              carelement.aModel,
              Validators.compose([
                Validators.required,
                Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
              ]),
            ],
            yearproduction: [
              carelement.aYearProduction,
              Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{4}'),
              ]),
            ],
          })
        );
      });
    }
    this.ownerForm = this.formBuilder.group({
      firsname: [
        this.owner.aFirstName,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
        ]),
      ],
      middlename: [
        this.owner.aMiddleName,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
        ]),
      ],
      lastName: [
        this.owner.aMiddleName,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
        ]),
      ],
      cars: [this.cars],
    });
  }

  get form() {
    return this.ownerForm.controls;
  }

  addNewCar() {
    this.editindflag =false;
    this.submitted = false;
    this.existingcarflag = false;
    this.cars.push(
      this.formBuilder.group({
        carnumber: [
          '',
            Validators.compose([
            Validators.required,
            Validators.pattern(
              '[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}'
            ),
          ]),
        ],
        carbrand: [
          '',
            Validators.compose([
            Validators.required,
            Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
          ]),
        ],
        carmodelname: [
          '',
            Validators.compose([
            Validators.required,
            Validators.pattern('[A-Za-zA-Яа-яЁёІіЇїЄє]{2,20}'),
          ]),
        ],
        yearproduction: [
          '',
            Validators.compose([
            Validators.required,
            Validators.max(this.getCarrentYear()),
            Validators.pattern('[0-9]{4}'),
          ]),
        ],
      })
    );
    let newcar = new CarEntity('', '', '', 1990);
    this.owner.aCars.push(newcar);
  }

  delleteCar(index: number) {
    this.cars.removeAt(index);
    this.owner.aCars.splice(index, 1);
  }

  submit() {
    this.submitted = true;
    if (this.ownerForm.invalid || this.form.cars.value.invalid) {
      return false;
    }
    this.owner.aFirstName = this.form.firsname.value;
    this.owner.aMiddleName = this.form.middlename.value;
    this.owner.aLastName = this.form.lastName.value;
    if (this.form.cars.value.value.length > 0) {
      for (let index = 0; index < this.owner.aCars.length; index++) {
        this.owner.aCars[index].carNumber =
          this.form.cars.value.value[index].carnumber;
        this.owner.aCars[index].aBrand =
          this.form.cars.value.value[index].carbrand;
        this.owner.aCars[index].aModel =
          this.form.cars.value.value[index].carmodelname;
        this.owner.aCars[index].aYearProduction =
          this.form.cars.value.value[index].yearproduction;
      }
    }
    if (!this.editindflag) {
      if (this.checkExistingCar(this.owner.aCars)) {
        this.existingcarflag = true;
        return false;
      }
    }
    this.activeModal.close(this.owner);
  }

  checkExistingCar(cars: AddCarEntity[]): boolean {
    var exist = 0;
    var existingcarnumber = -1;
    if (cars) {
      for (let index = 0; index < cars.length; index++) {
        if (exist >= 0) {
          this.owners.forEach((owner, idex) => {
            exist = owner.aCars.findIndex(
              (el) => el.carNumber === cars[index].carNumber
            );
            if (exist >= 0) {
              existingcarnumber = index;
            }
          });
        }
      }
      return exist !== -1 ? true : false;
    }
  }
  getCarrentYear(){
    let date = new Date();
    return date.getFullYear(); 
  }
}
