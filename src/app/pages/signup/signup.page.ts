import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signUpForm: FormGroup;
  public loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: ['',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
    });
  }

  async signUpUser(signUpForm: FormGroup): Promise<void> {
    if (!signUpForm.valid) {
      console.log('form is not valid. current val:', signUpForm.value);
    } else {
      const email = signUpForm.value.email;
      const password = signUpForm.value.password;

      this.authService.signUpUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  ngOnInit() {
  }

}
