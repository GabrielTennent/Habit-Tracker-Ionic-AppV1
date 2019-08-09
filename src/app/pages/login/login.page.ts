import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement; 

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {     
    this.loginForm = this.formBuilder.group({
      email:['',
      Validators.compose([Validators.required, Validators.email])],
      password:['',
      Validators.compose([Validators.required, Validators.minLength(4)])
      ],
    })
  }

  ngOnInit() {
  }

  async userLogin(loginForm: FormGroup): Promise<void>{
    if(!loginForm.valid){
      console.log('form is not valid. current val:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;
      
      this.authService.loginUser(email, password).then(
        () => {
            this.loading.dismiss().then(() => {
            this.router.navigateByUrl('profile');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel'}],
            });
            await alert.present();
          });
        }
      );
    }
  }
}
