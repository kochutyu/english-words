import { User } from '../interfaces/user.interface';

export class IUser implements User{
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
    ){

    }
}