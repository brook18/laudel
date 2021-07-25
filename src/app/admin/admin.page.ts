/* eslint-disable @typescript-eslint/member-ordering */
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular'
// import { NavController, LoadingController } from '@ionic/angular';
import {Router} from '@angular/router';
//import * as firebase from 'firebase';
import firebase from 'firebase/app';     //new add to replace * as firebase
import 'firebase/auth';
import 'firebase/database';
import { AuthService } from '../services/auth.service';
// import {FormControl} from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { getLocaleTimeFormat } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  // date: Date;
  tdate: string ;
  mydate: string ;
  date: Date;
  // tdate: Date ;
  // datepipe: any;

  // signInform = new FormControl({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

constructor(public datepipe: DatePipe, private navCtrl: NavController, private fb: FormBuilder,private router: Router,public loadingController: LoadingController) { }


// date: Date;
// tdate: Date ;
// tdate: string ;

postObjarry: any = [];

// postObjarry : Array <postObj2> = [];



postObj={
    unitno:'',
    trackno:'',
    // tdate: Date ,
    mydate: '',
    // date: new Date(),
    
};

  ngOnInit() {
  }



//   for (let i = 0; i < idx ; i++) {
//   this.postObjarry.push({
//     idx: i + 1,
//     interestPaid: MonthlyintPaid,
//     principalPaid: (this.emiInfo.loanEmi - MonthlyintPaid),
//     balance: totalAmountTemp
//   });
// }
// getDate(datepar){

//   var dateParts = datepar.split("-");
//   var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
//   return date;
// }

addparcel() {
  // const postObjarry = this.postObj(unitno.value,trackno.value);
  // mydate: new Date();
  // let mydate=new Date().getTime();
  this.date = new Date();
  // let tdate=new Date().getTime();
  // let mydate =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  // console.log(this.date);
    // let mydate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.postObj.mydate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    
    console.log(this.postObj.unitno)
    console.log(this.postObj.trackno)
    console.log(this.postObj.mydate); 
    
  

  this.postObjarry.push({
    unitno : this.postObj.unitno,
    trackno: this.postObj.trackno,
    tdate: this.postObj.mydate,
  // date: this.postObj['date'],
  
});

console.log(this.postObj.unitno)
console.log(this.postObj.trackno)
console.log(this.postObj.mydate)
// console.log('myDate'),
}

removeparcel() {
// const postObjarry = this.postObj(unitno.value,trackno.value);
 const index = this.postObjarry.indexOf();
    this.postObjarry.splice(index,1);
}



  async postnow(){
    await this.presentLoading();                     //to run the presentloading 1st
 
    // this.postObj['userid']=firebase.auth().currentUser.uid;
    // this.postObj['date']=firebase.database.ServerValue.TIMESTAMP;
    // this.postObjarry['mydate']= this.postObj.tdate;
    
    // firebase.database().ref('post/').push(this.postObj).then(()=>{
    // firebase.database().ref('post/').push(this.postObj).then(()=>{  
      firebase.database().ref('post/').push(this.postObjarry).then(()=>{  
      this.loader.dismiss();                  ///////dismiss the loading
      alert('upload succesfully!!');
      // this.backtohome();
      // this.addparcel();
    })
  }

  
  

// let unitno = this.postObj.unitno;
// let totalPaymentPercentage = this.calcInfo.loanAmount / this.emiInfo.totalPayment * 100;



                                                                               /////////////////loading process so user cant click anything//////////////////////////////////
  loader;
  async presentLoading() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
      });
      await this.loader.present();
  }

  // for (let i = 0; i < this.calcInfo.term; i++) {
    // let MonthlyintPaid = totalAmountTemp / 100 * this.calcInfo.interestRate / 12;
    // totalAmountTemp -= (this.emiInfo.loanEmi - MonthlyintPaid);

   
  // }

  // signout() {
  //   this.auth.signout();
  // }
  signout(){
    firebase.auth().signOut().then(()=>{
      alert('successful logout');
      this.navCtrl.navigateRoot('login');           //back to login page after sign out
    }).catch(()=>{
      alert('signout failed');
    })
  }
}
// function unitno(unitno: any) {
//   throw new Error('Function not implemented.');
// }

// function trackno(trackno: any) {
//   throw new Error('Function not implemented.');
// }

