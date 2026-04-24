import { Component, inject, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IApiResponse, IHospital, InitialHospitalValue } from '../../core/classes/interface/interface';
import { HospitalService } from '../../core/services/hospital.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-hospital',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-hospital.component.html',
  styleUrl: './new-hospital.component.css'
})
export class NewHospitalComponent implements OnInit {

hospitalForm!: FormGroup;
hospitalService=inject(HospitalService)
private sub!: Subscription;
constructor(){}
ngOnInit(): void {
    this.validation();
  }
  ngOnDestroy(): void {
 this.sub?.unsubscribe();
  }

validation() {
    this.hospitalForm = new FormGroup({
      hospitalId: new FormControl(InitialHospitalValue.hospitalId),
      hospitalName: new FormControl(InitialHospitalValue.hospitalName),      hospitalAddress: new FormControl(InitialHospitalValue.hospitalAddress),
      hospitalCity: new FormControl(InitialHospitalValue.hospitalCity),
      hospitalContactNo: new FormControl(InitialHospitalValue.hospitalContactNo, [Validators.required]), 
      hospitalOwnerName: new FormControl(InitialHospitalValue.hospitalOwnerName), 
      hospitalOwnerContactNo: new FormControl(InitialHospitalValue.hospitalOwnerContactNo),
      hospitalEmailId: new FormControl(InitialHospitalValue.hospitalEmailId, [Validators.required, Validators.email]),
      userName: new FormControl(InitialHospitalValue.userName),
      password: new FormControl(InitialHospitalValue.password, [Validators.required])
    });
  }

  onRegistration() {
  if (this.hospitalForm.invalid) {
    this.hospitalForm.markAllAsTouched();
    return;
  }

  const newHospital = this.hospitalForm.value;
  console.log(newHospital)

  this.sub?.unsubscribe();

  this.sub = this.hospitalService.addNewHospital(newHospital).subscribe({
    next: (res: IApiResponse<IHospital>) => {
      alert(res.Message);
      this.onReset();
    },
    error: (err) => {
      console.error(err);
    }
  });
}


  onReset() {
  this.hospitalForm.reset(InitialHospitalValue);
}

}
