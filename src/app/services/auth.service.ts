import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage' ;
import { AngularFireAuth } from "@angular/fire/auth";
import {Router} from '@angular/router';

import firebase from "firebase/app";  
// import * as firebase from 'firebase'; //new add to replace * as firebase
import "firebase/auth";
import "firebase/database";
import { filter } from 'rxjs/operators';

// const TOKEN_KEY = 'user-access-token';

// @Injectable({
//   providedIn: 'root'
// })

export  interface UserPro{
  username: string;
  uid: string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  // userole : Observable<any>;
  // private authState = new BehaviorSubject(null);

  private user : UserPro;

  constructor(public auth: AngularFireAuth, private storage : Storage, private router : Router) { 
    // this.loadUser();

    // this.userole = this.authState.asObservable().pipe(
    //   filter(response => response)
    // )

   }

   userprofile={
    email:'',
    unitno:'',
    password:'',
    
  }

  
  // loadUser(){
  //   this.storage.get(TOKEN_KEY).then(data=> {
  //     console.log('loaded user:', data);
  //     if (data)  {
  //     // if (data && data.email && data.role) {
  //      this.authState.next(data);
  //     }else{
  //       this.authState.next({email:null, role:null})
  //     }
  //   });
  // }

  loginFireauth(value) {
   return new Promise<any> ( (resolve, reject)=>{
     firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
       res => resolve(res),
       error => reject(error)
     )
  //    let email = value.email;
  //    let pw = value.pw;
  //    let userole =null;
 
  //    // if (email === 'admin' && pw === 'admin') {
  //    if (email === 'admin@lau.com') {
  //      userole = { email , role : 'ADMIN'};
 
  //    // } else if (email === 'user' && pw === 'user'){
  //    // } else{
  //    } else if (email ! === '12@lau.com') {
  //      userole = { email , role : 'USER'};
  //    }
 
  //    this.authState.next(userole);
 
  //    this.storage.set(TOKEN_KEY, userole);
  //  // this.storage.create(TOKEN_KEY, userole);
 
  //    return of(userole);

   })
  }


  setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }



  userRegistration(value){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
      )
            
    })
    
  }
  
  //  async signout() {
  //    await this.storage.set(TOKEN_KEY, null);
  //    this.authState.next(null);
  //    this.router.navigateByUrl('/login');
  // }

}








// userRegistration(value){

//      return new Promise<any> ( (resolve, reject)=>{
//       console.log(this.userprofile);
//            firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(()=>{
//              console.log('successfull register and my user ID is '+ firebase.auth().currentUser.uid)
//             firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(this.userprofile)
//                alert('successfull register');
//       // this.navCtrl.navigateRoot('login');
  
//     }).catch((err)=> {
//        console.log(err)
//       alert(err.message);
//       //alert('something wrong');
//       // this.navCtrl.navigateRoot('registration'); //back to login page after sign out
//     })
//   }
// })

// export class AuthService {
//   user : Observable<any>;
//   private authState = new BehaviorSubject(null);
  
//   constructor(private storage : Storage) { 
//     this.user = this.authState.asObservable();
//   } 

//   login(credentials) : Observable<any> {
//      let email = credentials.email;
//     let pw = credentials.pw;
//     let userole =null;

//     // if (email === 'admin' && pw === 'admin') {
//     if (email === 'admin@lau.com') {
//       userole = { email , role : 'ADMIN'};

//     // } else if (email === 'user' && pw === 'user'){
//     // } else{
//     } else if (email === 'test@test.com') {
//       userole = { email , role : 'USER'};
//     }

//     this.authState.next(userole);

//     this.storage.set(TOKEN_KEY, userole);
//    // this.storage.create(TOKEN_KEY, userole);

//     return of(userole);
//   }

//   signout() {
//   }

