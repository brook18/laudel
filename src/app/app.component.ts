import { Component } from '@angular/core';
import firebase from 'firebase/app';     //new add to replace * as firebase
import { FIREBASE_CONFIG } from './app.firebase.config';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private storage: Storage,
    public datepipe: DatePipe,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
     //private authService: AuthService,     //new addedd for Facebook login auth service link to "auth.services.ts"

     //private nativeStorage: NativeStorage,   //new added
    //  private router: Router                  //new added
   ) {

     //this.sideMenu();          //new added for toggle menu

     this.initializeApp();
   }

initializeApp() {
  //this.authService.init();            //new addedd for Facebook login auth service link to "auth.services.ts"
  firebase.initializeApp(FIREBASE_CONFIG);

    this.platform.ready().then(() => {

    // this.statusBar.styleDefault();
    // this.splashScreen.hide();

    });
}
async ngOnInit() {
  // If using a custom driver:
  // await this.storage.defineDriver(MyCustomDriver)
  await this.storage.create();
}
// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
// async ngOnInit() {
//   // If using a custom driver:
//   // await this.storage.defineDriver(MyCustomDriver)
//   await this.storage.create();
// }
}
// }
