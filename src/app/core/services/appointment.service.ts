import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
http = inject(HttpClient)
  constructor() { }

//getAppointmentsByHospitalId)
getAppointmentsByHospitalId(){
  
}
}
