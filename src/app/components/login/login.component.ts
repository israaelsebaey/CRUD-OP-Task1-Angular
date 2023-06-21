import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router) { }

  loginIms={
    waveImg:'../assets/images/wave.png',
    bgImg:'../assets/images/bg.svg',
    avatarImg:'../assets/images/avatar.svg'
  }
  loginForm=this.fb.group({
    account_email:['',[Validators.required]],
    account_password:['',[Validators.required]]
  })
  get Email(){
    return this.loginForm.get('account_email');
  }
  get Password(){
    return this.loginForm.get('account_password');
  }
  get EmailValue(){
    return this.loginForm.value.account_email;
  }
  get PasswordValue(){
    return this.loginForm.value.account_password;
  }
  submitLogin(){
    this.loginService.login(this.loginForm.value).subscribe(res=>{
      console.log(res.authToken.token);
      if(this.EmailValue==='admin@mozakrety.com' && this.PasswordValue==='frgh'){
        alert('Login Success');
        this.loginForm.reset();
        localStorage.setItem('token',res.authToken.token);
        setTimeout(()=>{
          this.router.navigate(['/home'])
        },500)
      }
      else{
        alert('Wrong Email or Password');
      }
    },err=>console.log(err))
  }
  ngOnInit():void {
  }

}
