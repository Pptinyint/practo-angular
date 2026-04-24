export interface IHospital {
  hospitalId?: number;
  hospitalName: string;
  hospitalAddress: string;
  hospitalCity: string;
  hospitalContactNo: string;
  hospitalOwnerName: string;
  hospitalOwnerContactNo: string;
  hospitalEmailId: string;
  userName: string;
  password: string;
}


export const InitialHospitalValue: IHospital = {
  hospitalId: 0,
  hospitalName: '',
  hospitalAddress: '',
  hospitalCity: '',
  hospitalContactNo: '',
  hospitalOwnerName: '',
  hospitalOwnerContactNo: '',
  hospitalEmailId: '',
  userName: '',
  password: ''
};


export interface IUser {
  userName: string;
  password: string;
  hospitalEmailId?: string;
}
export const InitialLoginValue: IUser = {
  userName: '',
  password: '',
  hospitalEmailId: ""
};

export interface IAppointment {
  appointmentId?: number;
  name: string;
  mobileNo: string;
  patientCity: string;
  age: number;
  gender: string;
  appointmentDate: Date; // ISO Date string format
  appointmentTime: string;
  isFirstVisit: boolean;
  naration: string;
  hospitalId: number;
}

export const InitialAppointmentValue: IAppointment = {
  name: "",
  mobileNo: "",
  patientCity: "",
  age: 0,
  gender: "",
  appointmentDate: new Date(),
  appointmentTime: "",
  isFirstVisit: false,
  naration: "",
  hospitalId: 0
  
};
// export const InitialAppointmentValue: IAppointment = {

// appointmentId 	patientId 	hospitalId 	appointmentDate 	appointmentTime 	isFirstVisit 	naration 	isDone 	appointmentNo 	
// }


export interface IApiResponse<T> {
    Message: string;
    Result: boolean;
    Data: T; 
}



// export interface IUser {

// }

// export interface ISocialLinks {
 
// }
// export interface ICategory {
 
// }