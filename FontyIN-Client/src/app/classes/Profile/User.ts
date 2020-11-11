import { UserDTO } from './UserDTO';
import { UserType } from './UserType';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    userEmail: string;
    password: string;; 
    phoneNumbar: string;; 
    addressId: number;
    locationId: number;
    departmentId: number; 
    userNumber: string;; 
    img: string;; 
    userType: UserType;
    user: UserDTO;
    
    constructor(
        public id: number,
        public userPhoneNumber: string,
    ) {  }
}