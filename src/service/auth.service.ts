import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor() {}
 

  saveToken(token: string) {
    if(token){
        localStorage.setItem('jwt_token', token);
    }
    else{
        localStorage.removeItem('jwt_token');
    }
    
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }
}