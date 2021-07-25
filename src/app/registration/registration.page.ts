import { Component, OnInit } from '@angular/core';
import { AlertController ,NavController, ToastController , LoadingController } from '@ionic/angular';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//import * as firebase from 'firebase';       // have to delcare in each .TS if use firebase
import firebase from "firebase/app";     //new add to replace * as firebase
import "firebase/auth";
import "firebase/database";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
// export class RegistrationPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


export class RegistrationPage implements OnInit {
  // gender=undefined;
  // genderArray=[
  //   'male',
  //   'female',
  //   'trans',
  //   'N/A',
  //   'rathe not say',
  // ]
  validationMessages = {
    names: [{type:"required", message:"Please Enter your Full Names"}],
    
    unitno: [{type:"required", message:"Please Enter your Unit Number."}],
    
    email: [
      {type: 'required',message:"Enter your Email Adress"},
      {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
    ],
    password: [
      {type: "required", message: "password is required here"},
      {type:"minlength", message: "Passwrd must be at least 6 character"}
    ]
 }

 ValidationFormUSer : FormGroup;
 loading:any;
  preference: any;
  
  constructor(public toastController: ToastController, public navCtrl:NavController,
    public loadingCtrl : LoadingController,
    private alertCtrl: AlertController,
    public formbuilder: FormBuilder, public authservice: AuthService,
    private router: Router , 
    private firestore: AngularFirestore, 
    private auth: AngularFireAuthModule, 
    public navctrl:NavController
     ) { 
     this.loading = this.loadingCtrl
    }

    userprofile={
      email:'',
      password:'',
      unitno:'',
    
  }


//   public form = [
//     { val: 'Male', isChecked: true },
//     { val: 'Female', isChecked: false },
    
//   ];
// }
  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      // names: new FormControl('', Validators.compose([
      //    Validators.required
      // ])),
  
      unitno: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
  
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
  
    })
  
    }
  
    registerUser(value){
     this.showalert();
      try{
     this.authservice.userRegistration(value).then( response =>{
       console.log(response);
       if(response.user){
         response.user.updateProfile({
           email: value.email,
           password: value.password,
           unitno: value.unitno
           
         });
         this.userprofile['email']= value.email,
         this.userprofile['password']= value.password,
         this.userprofile['unitno']= value.unitno,

         console.log(this.userprofile['email']);
         console.log(this.userprofile['password']);
         console.log(this.userprofile['unitno']);

         firebase.database().ref('users/' + firebase.auth().currentUser.uid).
         update(this.userprofile)
         console.log('successfull register and my user ID is '+ firebase.auth().currentUser.uid)
         
         alert('successfull register');
      // firebase.auth().createUserWithEmailAndPassword(this.userprofile['email'].trim(), this.userprofile['password'])
      // this.preference.store(value.unitno,'userPhoneNumber');
       this.loading.dismiss();
       this.router.navigate(['login']);
       }
     }, error=>{
      //  this.loading.dismiss();
       this.errorLoading(error.message);
  
     })
   }catch(erro){
     console.log(erro)
  }
    }
  
  
    async errorLoading(message: any){
      const loading = await this.alertCtrl.create({
        header:"Error Registering",
        message:message,
        buttons:[{
          text:'ok',
          handler: ()=>{
          this.navCtrl.navigateBack(['registration'])
        }
        }]
      })
       await loading.present();
    }
  
  
  
  
    async showalert(){
        var load = await this.loadingCtrl.create({
         message:"please wait....",
  
         })
        load.present();
        }   
  
  }


 // register(){
//    console.log(this.userprofile);
 // }


  // register(){
  //   console.log(this.userprofile);
  //   firebase.auth().createUserWithEmailAndPassword(this.userprofile['email'].trim(), this.userprofile['password']).then(()=>{
  //   // firebase.auth().createuser(this.userprofile['UnitNo'].trim(), this.userprofile['password'])
  //   // firebase.auth().signInWithCredential()
    
  //     console.log('successfull register and my user ID is '+ firebase.auth().currentUser.uid)
      
  //     firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(this.userprofile)
  //     alert('successfull register');
  //     this.navCtrl.navigateRoot('login');
  //   //}).catch(()=> {

  //   }).catch((err)=> {
  //      console.log(err)
  //     alert(err.message);
  //     //alert('something wrong');
  //     this.navCtrl.navigateRoot('registration'); //back to login page after sign out
  //   })
  // }


  // back(){
  //   this.navCtrl.pop();
  // }
  
// }
