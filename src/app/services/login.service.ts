import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url='https://testproj2.cloudiax.com/api/user/login'
  constructor(private http:HttpClient) { }

  login(userObj:any){
    console.log(userObj)
    return this.http.post<any>(this._url,userObj)
  }

}
