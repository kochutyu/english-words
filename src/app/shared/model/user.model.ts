import { User } from '../interfaces/user.interface';

export class IUser implements User{
    constructor(
        public nickName: string,
        public password: string,
    ){

    }
}