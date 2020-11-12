import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {LoginService} from "./service/login.service";
import UserDTO from "./dto/UserDTO";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  signInEmail = '';

  title = 'myApp';
  signInPassword = '';
  signInEmailErrorState = false;
  signInPasswordErrorState = false;
  loadingState = false;
  signUpName = '';
  signUpDOB = '';
  signUpEmail = '';
  signUpPassword = '';

  constructor(
    private userLoginService: LoginService,
    private toastrService: ToastrService) {

  }

  onWarning(message: string) {
    this.toastrService.warning(message, "Warning!")

  }

  onSucess(message: string) {
    this.toastrService.success(message, "Success!", {
      progressAnimation: 'decreasing',
    })
  }

  onError(message: string) {
    this.toastrService.error(message, "Error!")
  }

  signUp() {
    // this.onError("Please try again.")
    // this.onWarning("Please check your inputs.")
    const user = new UserDTO(
      this.signUpName.trim(),
      this.signUpDOB.trim(),
      this.signUpEmail.trim(),
      this.signUpPassword.trim()
    );
    this.userLoginService.signUp(user).subscribe(response => {
        console.log(response)
        if (response.isSignedUp === true) {
          this.onSucess("User signed-up");
          this.signUpName = '';
          this.signUpDOB = '';
          this.signUpEmail = '';
          this.signUpPassword = '';
        }
      },
      errorObject => {
        this.onWarning("Email already exists");

      }
    );
  }

  signIn() {
    if (this.validateEmail(this.signInEmail)) {
      this.signInEmailErrorState = false;

    } else {
      this.signInEmailErrorState = true;
    }

    if (this.validatePassword(this.signInPassword)) {
      this.signInPasswordErrorState = false;

    } else {
      this.signInPasswordErrorState = true;
    }
    if (this.signInEmailErrorState === false && this.signInPasswordErrorState === false) {
      this.userLoginService.signIn(this.signInEmail, this.signInPassword).subscribe(result => {
        console.log(result);
        this.onSucess("User Signed-in");
        this.signInEmail = '';
        this.signInPassword = ''
      }, errorObject => {
        this.onWarning("User Password is incorrect");
        this.signInPassword = ''
      });
    }
  }

  validateEmail(elementValue) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  validatePassword(elementValue) {
    const passwordPattern = /^[a-zA-Z0-9._-]+$/;
    return passwordPattern.test(elementValue);
  }
}
