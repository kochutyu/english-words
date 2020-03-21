export interface User{
    nickName: string;
    password: string;
    learnedWords: string[];
    notLarnedWords: string[];
    id?: string;
}