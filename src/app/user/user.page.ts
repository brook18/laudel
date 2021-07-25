
import {Router} from '@angular/router';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
// import * as firebase from 'firebase';
import firebase from "firebase/app";     //new add to replace * as firebase
import "firebase/auth";
import "firebase/database";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeValidator } from  '../validators/age';
import { UsernameValidator } from  '../validators/username';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;

	public submitAttempt: boolean = false;


 constructor(public formBuilder: FormBuilder , public toastController: ToastController, public navCtrl:NavController ) { 

 this.slideOneForm = formBuilder.group({
  email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  password : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  // age: ['', AgeValidator.isValid]
  });
}

  ngOnInit() {
  }

  login(){

    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        // this.signupSlider.slideTo(0);
    } 
   
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }


  }

  }