import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserSignUpService} from "./service/user-sign-up.service";
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
    private userSignUpService: UserSignUpService,
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
    this.userSignUpService.registerUser(user).subscribe(response => {
      console.log(response)
    });
    this.onSucess("User registered.")
  }
}
