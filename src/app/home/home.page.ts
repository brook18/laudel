
//import { Component, OnInit } from "@angular/core";   //new addedd for Facebook login auth service link to "auth.services.ts"
// import { NavController } from '@ionic/angular';
//import * as firebase from 'firebase';       // have to delcare in each .TS if use firebase
import { ActionSheetController, ToastController, Platform,} from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';

import firebase from "firebase/app";     //new add to replace * as firebase
import "firebase/auth";
import "firebase/database";

//import { Router } from '@angular/router';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
//import { AuthService } from "./services/auth.service";
import { ActivatedRoute } from '@angular/router';
//agm googlemap
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core'
import { ElementSchemaRegistry } from '@angular/compiler';
//import { MapsAPILoader, AgmMap } from '@agm/core';  //this will cause MapHandlerMap<T>' requires 1 type argument(s)'//
//agm googlemap
import { File} from '@ionic-native/File/ngx';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})  

export class HomePage implements OnInit {

  //agm googlemap
  // title: string = 'AGM project';
  // latitude: number;
  // longitude: number;
  // zoom: number;
  // address: string;
  // private geoCoder;
  

  // @ViewChild('search',{static:false})
  // public searchElementRef: ElementRef;
//agm googlemap

  //constructor() {}
 //constructor(private navCtrl: NavController, activateRoute:ActivatedRoute, private mapsAPILoader: MapsAPILoader,
//private ngZone: NgZone) {}
    constructor(private navCtrl: NavController, activateRoute:ActivatedRoute,private menu: MenuController ,
      private auth : AuthService , private storage: Storage) {}

    // constructor(private actionSheetController: ActionSheetController, private toastController: ToastController,
    //   private storage: Storage, private plt: Platform, private loadingController: LoadingController, public navCtrl:NavController ,private router: Router ,
    //   public activateRoute:ActivatedRoute) { }

 
  myid='';
  postArray=[];
  userObj={};

  getprofile ={
    unitno:'',
   
    }





  ngOnInit() {
      // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
   this.storage.create();

   firebase.auth().onAuthStateChanged((user)=>{

    if(user){
      firebase.database().ref('users/' + firebase.auth().currentUser.uid ).once('value',data=>{
        //on   = when look for this directory it will grab real time data
        //once = when look for this directory but only grab once (no need keep getting data)
          this.getprofile=data.val();
          console.log(this.getprofile);
       })
        
        }else{

        }

      })
    }
  // calc(){
  //   this.navCtrl.navigateForward('calc')
  //   }

  // goprofile(){
  //   // console.log(postObj)
  //   // if( postObj['userid'] == firebase.auth().currentUser.uid) {
  //   //   this.navCtrl.navigateForward('loginusrprf/' + this.postArray[i])
    
  //   //////////////////this.navCtrl.navigateForward('profile/')  -> why got slashes also can work???
  //     this.navCtrl.navigateForward('profile')
    // }
    // else {
    //   console.log('something wrong');
    // // }
    // }
  // this.navCtrl.navigateForward('loginusrprf/' + info['uid']);  
  // this.navCtrl.navigateForward('loginusrprf');  
// }
  // Get Current Location Coordinates
  //private setCurrentLocation() {
 //   if ('geolocation' in navigator) {
 //     navigator.geolocation.getCurrentPosition((position) => {
 //       this.latitude = position.coords.latitude;
 //       this.longitude = position.coords.longitude;
 //       this.zoom = 8;
 //       this.getAddress(this.latitude, this.longitude);
 //     });
 //   }
 // }

 // markerDragEnd($event: any) {
 //   console.log($event);
 //   this.latitude = $event.coords.lat;
 //   this.longitude = $event.coords.lng;
//    this.getAddress(this.latitude, this.longitude);
 // }

 // getAddress(latitude, longitude) {
 //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
 //     console.log(results);
 //     console.log(status);
 //     if (status === 'OK') {
 //       if (results[0]) {
 //         this.zoom = 12;
//          this.address = results[0].formatted_address;
 //       } else {
 //         window.alert('No results found');
//        }
//      } else {
 //       window.alert('Geocoder failed due to: ' + status);
 //     }

 //   });
 // }
  //////////////////////////////agm googlemap///////////////////////////////////////////////////////
  

  // firebase.database().ref('users/').on('value', data=>{
   
  //   this.userObj=data.val();
  //   // console.log(this.userObj);
  //    });
  // }
  // async updateprofile(){
  //   firebase.database().ref('users/' + firebase.auth().currentUser.uid ).update(
  //     {
  //       name:this.getprofile['name'],
  //       picture :this.getprofile['picture'],
  //       gender:this.getprofile['gender'],
  //       DOB:this.getprofile['DOB'],

  //     }).then(()=>{
  //     // this.loader.dismiss();                  ///////dismiss the loading
  //     alert('update succesfully!!');
  //     this.backtohome();                         
  //   })
  // }
  search(){

        
        firebase.database().ref('post/').on('value', data=>{
          this.postArray=Object.values(data.val());  
          // this.userObj=data.val();
          console.log(this.postArray);
       });

       
       }



  signout(){
    firebase.auth().signOut().then(()=>{
      alert('successful logout');
      this.navCtrl.navigateRoot('login');           //back to login page after sign out
    }).catch(()=>{
      alert('signout failed');
    })
  }

  backtohome(){
    // this.navCtrl.navigateBack('Home');
    // this.navCtrl.navigateRoot('Home');
   this.navCtrl.pop();
   }


}
