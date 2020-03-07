import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  languages: string[] = [
    'ru',
    'ua'
  ];
  constructor() { }
}
