import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarEntity } from 'src/app/models/CarEntity';
import { OwnerEntity } from 'src/app/models/OwnerEntity';

@Component({
  selector: 'app-addowner',
  templateUrl: './addowner.component.html',
  styleUrls: ['./addowner.component.scss']
})
export class AddownerComponent implements OnInit {

  @Input() owner: OwnerEntity;
  @Input() Info: string;
  @Input() Button: string;

  ownerForm: FormGroup;
  cars:FormArray = new FormArray([]);
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initSettingsForm()
  }
  initSettingsForm(){
    if(this.owner.aCars.length){
      Array.from(this.owner.aCars).forEach(carelement => {
        this.cars.push(this.formBuilder.group({
          carnumber: [carelement.carNumber, Validators.required],
          carbrand: [carelement.aBrand, Validators.required],
          carmodelname: [carelement.aModel, Validators.required],
          yearproduction: [carelement.aYearProduction, Validators.required],
        }));
    });

    }
    this.ownerForm = this.formBuilder.group({
      firsname: [this.owner.aFirstName, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)])
      ],
      middlename: [this.owner.aMiddleName, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
      lastName: [this.owner.aMiddleName, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
      cars:[this.cars]
    })
      
  }
  get form() { return this.ownerForm.controls; }

  addNewCar(){
    this.cars.push(this.formBuilder.group({
      carnumber: ['', Validators.required],
      carbrand: ['', Validators.required],
      carmodelname: ['', Validators.required],
      yearproduction: ['', Validators.required],
    }));
    let newcar = new CarEntity('','','',1990,) 
    this.owner.aCars.push(newcar);

  }

  
  delleteCar( index:number){
    
    this.cars.removeAt(index);
    this.owner.aCars.splice(index,1);
    
  }

  submit(){
    this.submitted = true;
    if(this.ownerForm.invalid)
      {return false}
    this.owner.aFirstName = this.form.firsname.value;
    this.owner.aMiddleName = this.form.middlename.value;
    this.owner.aLastName = this.form.lastName.value;
    if(this.form.cars.value.value.length>0){
      for (let index = 0; index < this.owner.aCars.length; index++) {
        this.owner.aCars[index].carNumber = this.form.cars.value.value[index].carnumber;
        this.owner.aCars[index].aBrand = this.form.cars.value.value[index].carbrand;
        this.owner.aCars[index].aModel = this.form.cars.value.value[index].carmodelname;
        this.owner.aCars[index].aYearProduction = this.form.cars.value.value[index].yearproduction;
      }
    }
    this.activeModal.close(this.owner);

  }

}
