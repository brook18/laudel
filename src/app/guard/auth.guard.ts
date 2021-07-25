// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { take , map } from 'rxjs/operators';
// import { AlertController ,NavController, ToastController , LoadingController } from '@ionic/angular';

// @Injectable({
//   providedIn: 'root'
// })
// // export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
// export class AuthGuard implements CanActivate  { 

//   constructor(private router : Router , private auth :AuthService,private alertCtrl: AlertController,) {}
   
  
//   canActivate( route: ActivatedRouteSnapshot) {

//     return this.auth.userole.pipe(
//        take (1),
//        map(userole => {
//          const expectedrole = route.data.role;
//         //  console.log('log: ', userole);
//          console.log('expected: ', expectedrole);

//           if(userole){
//             let role = userole['role'];

//             if (expectedrole == role ){
//               return true;
//             }

          
//           }else{
//             this.showAlert();
//           return this.router.parseUrl('login');
//           }

//         })
//      )
//   }
// // }

// async showAlert() {
//   let alert = await this.alertCtrl.create({
//     header: 'Unauthorized',
//     message: 'You are not authorized to visit that page!',
//     buttons: ['OK']
//   });
//   alert.present();
// }
// }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
// }
