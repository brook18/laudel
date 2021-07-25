import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { NavController, ToastController ,LoadingController } from '@ionic/angular';
import {Router} from '@angular/router';
//import * as firebase from 'firebase';
import firebase from "firebase/app";     //new add to replace * as firebase
import "firebase/auth";
import "firebase/database";
// import { AuthService } from '../services/auth.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';

//import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
//import {Router} from '@angular/router';
//import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // userprofile: Observable <firebase.User>;


  // public submitAttempt: boolean = false;

  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 5 characters or more"}

    ]
  }

  validationFormUser: FormGroup;

  // firebase: any;

 // constructor() { }
//  constructor(public navctrl:NavController , public navParams:NavParams) {}
  constructor(public formbuider: FormBuilder, public authservice: AuthService, 
    private router: Router , 
    private firestore: AngularFirestore, 
    public toastController: ToastController , 
    private auth: AngularFireAuthModule, 
    public navctrl:NavController) {

    // this.userprofile = fireabse.auth.currentUser;
    // // this.userprofile = firebase.auth
    }

    
      // user={
      // email:'',
      // passwordfield :'',
      
      // }


 ngOnInit() {

  this.validationFormUser = this.formbuider.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ]))
  })

  }
    
  // login(){
    // LoginUser(value){ 

    //   this.submitAttempt = true;

    //       this.authservice.loginFireauth(value).then( resp =>{
    //         console.log(resp);
    //         this.router.navigate(['home'])
  
      // // this.auth.login(this.user).subscribe(user => {
      // //       console.log('after login:', user) ;
      // //       let role = user['role'];

      // //       if (role == 'ADMIN') {
      // //         this.router.navigateByUrl('/admin');
      // //       }else if (role == 'USER') {
      // //         this.router.navigateByUrl('/home');
      // //       }
      // // });

      // //    this.navctrl.navigateForward("home");
      //  // firebase.auth().signInWithEmailAndPassword(this.user['email'], this.user['passwordfield']).then(()=>{
      //   firebase.auth().signInWithEmailAndPassword(this.user['email'] , this.user['passwordfield']).then(()=>{  
      //   alert('Succesfull Sigend in!');
      //   // this.navctrl.navigateRoot('home');  
      //  // this.navctrl.navigateRoot('admin');  
      //    // if (email === 'admin' && pw === 'admin') {
      //           if (this.user['email'] === 'admin@lau.com') {
      //             // this.user['email'] = { email , role : 'ADMIN'};
      //             this.navctrl.navigateRoot('admin');  
      //       // } else if (email === 'user' && pw === 'user'){
      //         } else{
      //         //  } else if (email === 'test@test.com') {
      //               this.navctrl.navigateRoot('home'); 
      //           }

      //   }).catch((err)=>{
      //     alert(err)
      //     console.log(err.message)  
      //     alert('Username and password invalid');
      //   })
        
      // }
    
      LoginUser(value){

        let email = value.email;
        let pw = value.pw;
        let userole =null;
        // this.submitAttempt = true;
        console.log("Am logged in");
        try{
          
           this.authservice.loginFireauth(value).then( resp =>{
             console.log(resp);

             if (value.email === 'admin@lau.com') {
              userole = { email , role : 'ADMIN'};
              this.router.navigateByUrl('/admin'); 
            // } else if (email === 'user' && pw === 'user'){
            // } else{
            } else if (value.email !== 'admin@lau.com') {
            // } else if (value.email === '12@lau.com') {
              userole = { email , role : 'USER'};
              this.router.navigateByUrl('/home');
            }
              // this.auth.login(this.userole).subscribe(user => {
            console.log('after login:', userole) ;
            // let role = userole['role'];

            // if (role == 'ADMIN') {
            //   this.router.navigateByUrl('/admin');
            // }else if (role == 'USER') {
            //   this.router.navigateByUrl('/home');
            // }
          //  });
          //    this.router.navigate(['home'])
       
                if(resp.user){
      
                    this.authservice.setUser({
                      username : resp.user.displayName,
                      uid: resp.user.uid
                    })
            
                    // firebase.auth().onAuthStateChanged((user)=>{        
                    //   if(user){
                    //       console.log(firebase.auth().currentUser.uid)
                    //       this.navctrl.navigateRoot('home')
                    //   }else{
                    //       console.log('no user!')
                    //      }
                    //   })
            const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
            // const userProfile = this.firebase.auth().currentUser.uid

            // const userProfile: firebase.auth.userProfile = await this.authService.login(
            //   credentials.email,
            //   credentials.password
            // );
            
             userProfile.get().subscribe( result=>{
      
                        if(result.exists){
                          this.navctrl.navigateForward(['home']);
                        }else{
                        

            //         //     // this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
            //         //     //   name: resp.user.displayName,
            //         //     //   email: resp.user.email
            //         //     // });
                    }
             })
           }     
          })
        }catch(err){
        //   console.log(err);
        // }
      // }).catch(()=>{
        console.log(err);
        alert('Username and password invalid');
      }
      
      }
  

     register(){
      console.log('register');
      this.navctrl.navigateForward('registration');
     }
  
    // forgetpassword(){
    //   firebase.auth().sendPasswordResetEmail(this.user['email']).then(()=>{
    //     alert('email sent');
    //   }).catch(()=>{
    //     alert('incorrect email and password');
    //   })
    // }
}

