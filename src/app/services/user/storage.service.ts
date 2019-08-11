import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ArrayType } from '@angular/compiler';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

//Storage class for storing all of the data needed for the home page
export class StorageService {
  public keyList: string[];
  public valueList: string[];

  constructor(
    private storage: Storage
  ) {
    this.keyList = [];
    this.valueList = [];
  }

  //sets value in storage
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      this.getValue(key);
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  //returns value in storage
  getValue(key: string) {
    this.storage.get(key).then((val) => {
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
  }

  //adds a day and yes/no value to the given habit
  addDayToHabit(key: string, dateAdd: Date, didItAdd: string) {
    this.storage.get(key).then((val) => {
      var adding = [dateAdd, didItAdd];
      var newVal = val.concat(adding);
      this.setValue(key, newVal);
    }).catch((error) => {
      console.log('get error for setting ' + key + '', error);
    });
  }

  //returns a list of all the habits
  getValueList(keyToGet: string){
    var valueList: string[] = [];
    var promise = new Promise<string[]>((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        if (key == keyToGet) {
          valueList = value;
        }
      }).then((d) => {
        resolve(valueList);
      });
    });
    return promise;
  }

  //returns a list of all the habit names
  getKeyList() {
    var promise = new Promise<string[]>((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        if (!this.keyList.includes(key)) this.keyList.push(key);
      }).then((d) => {
        resolve(this.keyList);
      });
    });
    return promise;
  }

  //removes the given habit
  removeKey(key: string) {
    this.storage.remove(key).then(() => {
    }).catch((error) => {
      console.log('removed error for ' + key + '', error);
    });
  }

  //clears storage
  clearStorage() {
    this.storage.clear();
  }

}

