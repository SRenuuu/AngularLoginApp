import {Injectable} from '@angular/core';
import UserDTO from "../dto/UserDTO";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public signUp(userDTO: UserDTO): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/v1/user/signUp',
      {
        name: userDTO.name,
        dob: userDTO.dob,
        email: userDTO.email,
        password: userDTO.password
      });
  }

  public signIn(email: string, password: string): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/v1/user/signIn',
      {
        headers: {email, password}
      })
  }
}
