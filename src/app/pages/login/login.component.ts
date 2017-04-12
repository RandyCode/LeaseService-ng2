import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,NavigationExtras} from '@angular/router'
import 'style-loader!./login.scss';
import {BaThemeSpinner} from '../../theme/services'
import {AuthService} from '../../theme/services/authorize'
@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,public authService:AuthService,public router:Router,private _spinner:BaThemeSpinner) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      this.authService.login().subscribe(()=>{
          if(this.authService.isLoggedIn){
            let redirect=this.authService.redirectUrl?this.authService.redirectUrl:'/pages/dashboard';
            let navigationExtras:NavigationExtras={
              preserveQueryParams:true,
              preserveFragment:true
            }
            this.router.navigate([redirect]);
            this._spinner.show();
          }
      });
    }
  }
}
