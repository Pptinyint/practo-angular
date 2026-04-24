  import { HttpClient } from '@angular/common/http';
  import { inject, Injectable, signal } from '@angular/core';
  import { IApiResponse, IAppointment, IHospital, IUser } from '../classes/interface/interface';
  import { Observable } from 'rxjs';
  import { environment } from '../../../environments/environment.development';
  import { Constant } from '../Constent/constant';

  @Injectable({
    providedIn: 'root'
  })
  export class HospitalService {
  http = inject(HttpClient)

  currectUser = signal<IUser | null>(null)
    constructor() { 
      const saveUserdata = localStorage.getItem("loginUser")
      if(saveUserdata){
        this.currectUser.set(JSON.parse(saveUserdata))
        
      }
    }

    addNewHospital(hostpitalObj:IHospital): Observable<IApiResponse<IHospital>>{
      return this.http.post<IApiResponse<IHospital>>(environment.api_url+Constant.API_END_POINT.ADD_NEW_HOSPITAL, hostpitalObj)
    }

    loginuser(loginObj:IUser): Observable<IApiResponse<IUser>>{
      return this.http.post<IApiResponse<IUser>>(environment.api_url+Constant.API_END_POINT.USER_LOGIN,loginObj)
    }

    // /getAppointmentsByHospitalId(){
    
  // getAppointmentsByHospital(loginObj:IAppointment): Observable<IApiResponse<IAppointment[]>>{
  //     return this.http.get<IApiResponse<IAppointment[]>>(environment.api_url+Constant.API_END_POINT.GET_APPOINTMENTS_BY_HOSTPITAL_ID+loginObj.hospitalId)
    
  // }
  createAppointment(obj:IAppointment): Observable<IApiResponse<IAppointment>>{
      return this.http.post<IApiResponse<IAppointment>>(environment.api_url+Constant.API_END_POINT.CREATE_NEW_APPOINTMENT,obj)
    }




getAppointmentsByHospitalId(id: number, userName: string): Observable<IApiResponse<IAppointment[]>> {
  return this.http.get<IApiResponse<IAppointment[]>>(
    `${environment.api_url}${Constant.API_END_POINT.GET_APPOINTMENTS_BY_HOSTPITAL_ID}/${id}?userName=${userName}`
  );
}


  }
