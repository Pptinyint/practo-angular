import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { HospitalService } from '../../core/services/hospital.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { IApiResponse, IAppointment, IHospital, InitialAppointmentValue } from '../../core/classes/interface/interface';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointmentService = inject(AppointmentService);
  appointmentHosService = inject(HospitalService);
  // appointmentForm!:FormGroup;
  appointmentForm: FormGroup = new FormGroup({});
  appointmentDataList = signal<IAppointment[]>([])
  loggedUserData = signal<IHospital | null>(null)
  constructor() {

    const loggedData = localStorage.getItem("loginUser");
    if (loggedData) {
      this.loggedUserData.set(JSON.parse(loggedData));
    }
  }
  ngOnInit(): void {
    this.validation();
    const userData = this.loggedUserData();
    if (userData && userData.hospitalId) {
      this.getAppointmentById(userData.hospitalId);
    }
  }

  validation() {
    this.appointmentForm = new FormGroup({
      name: new FormControl(InitialAppointmentValue.name, [Validators.required, Validators.minLength(3)]),
      mobileNo: new FormControl(InitialAppointmentValue.mobileNo, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      city: new FormControl(InitialAppointmentValue.patientCity, [Validators.required]),
      age: new FormControl(InitialAppointmentValue.age, [Validators.required, Validators.min(1)]),
      gender: new FormControl(InitialAppointmentValue.gender, [Validators.required]),
      appointmentDate: new FormControl(InitialAppointmentValue.appointmentDate, [Validators.required]),
      appointmentTime: new FormControl(InitialAppointmentValue.appointmentTime, [Validators.required]),
      isFirstVisit: new FormControl(InitialAppointmentValue.isFirstVisit),
      naration: new FormControl(InitialAppointmentValue.naration),
      hospitalId: new FormControl(InitialAppointmentValue.hospitalId)
    });
  }

  createAppointments() {
    if (this.appointmentForm.invalid) {
      alert("Please fill all required fields");
      return;
    }

    const appointmentData = { ...this.appointmentForm.value };
    const userData = this.loggedUserData();
    if (userData) {
      appointmentData.hospitalId = userData.hospitalId;
    }
    appointmentData.isDone = 0;

    appointmentData.appointmentNo = Math.floor(1000 + Math.random() * 9000); // 4 digit random no.

    this.appointmentHosService.createAppointment(appointmentData).subscribe({
      next: (res: IApiResponse<IAppointment>) => {
        if (res.Result) {
          alert("Patient & Appointment Saved Successfully!");
          this.onReset();
          const modal = bootstrap.Modal.getInstance(document.getElementById('hospitalModal'));
          modal?.hide();
          if (userData && userData.hospitalId) {
            this.getAppointmentById(userData.hospitalId);
          }
        } else {
          alert(res.Message)
        }
      }, error: (err) => {
        console.error("API Error:", err);
      }
    })
  }


  getAppointmentById(id: number) {
    const userData = this.loggedUserData();
    const userName = userData ? userData.userName : '';
    this.appointmentHosService.getAppointmentsByHospitalId(id, userName).subscribe({
      next: (res: IApiResponse<IAppointment[]>) => {
        if (res.Result) {
          this.appointmentDataList.set(res.Data);

        }
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }


  onReset() {
    this.appointmentForm.reset(InitialAppointmentValue);
  }
}
