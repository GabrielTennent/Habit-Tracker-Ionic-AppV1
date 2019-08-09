import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import * as firebase from 'firebase/app';
import { firebaseConfig } from './fbConfig';

const { SplashScreen, StatusBar } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform : Platform) {
    firebase.initializeApp(firebaseConfig);
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide().catch(error => {
      console.error(error);
    });

    StatusBar.hide().catch(error => {
      console.error(error);
    });

    this.platform.ready().then(()=> {
    });
  }
}
