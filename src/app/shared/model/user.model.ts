import { User } from '../interfaces/user.interface';

export class IUser implements User{
    constructor(
        public nickName: string,
        public password: string,
        public learnedWords: string[],
        public notLarnedWords: string[],
        public id?: string
    ){

    }
}