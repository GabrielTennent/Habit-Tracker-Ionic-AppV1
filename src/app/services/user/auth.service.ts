import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  //service for authenticating the user exists in the database
  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //Service for signing new user up to firebasedb using the provided email/passw
  signUpUser(email: string, password: string
  ): Promise<any>{
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) =>{
        firebase
          .firestore()
          .doc('/userProfile/${newUserCredential,user.uid}')
          .set({email});
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      })
  }

  //pass word reset method sends pass word reset email to user
  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //log out the user from the firebase
  logOutUser():Promise<void>{
    return firebase.auth().signOut();
  }
}
