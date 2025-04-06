import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangTransService {
  private currentLangSubject: BehaviorSubject<string>;
  currentLang!: any
  constructor() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLangSubject = new BehaviorSubject<string>(savedLang);
    this.currentLang = this.currentLangSubject.asObservable();
  }

  setLanguage(lang: string): void {
    this.currentLangSubject.next(lang);
    localStorage.setItem('language', lang);
  }

  getLanguage(): string {
    return this.currentLangSubject.value;
  }
}
