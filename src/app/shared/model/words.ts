import { Words } from '../interfaces/words';

export class IWords implements Words{
    constructor(
        public id: number,
        public word: string,
        public transcription: string,
        public translate: string
    ){

    }
}
