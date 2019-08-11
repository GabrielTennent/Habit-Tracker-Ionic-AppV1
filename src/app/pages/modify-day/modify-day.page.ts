import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/user/storage.service';

@Component({
  selector: 'app-modify-day',
  templateUrl: './modify-day.page.html',
  styleUrls: ['./modify-day.page.scss'],
})
//class used to add day with input to the given day
export class ModifyDayPage implements OnInit {

  protected habitName: string;
  protected date : Date;
  protected didIt : string;

  public habitList: string[];

  constructor(
    private router: Router,
    private storage: Storage,
    private storageService: StorageService
  ) { 
    this.storageService.getKeyList();
    this.habitList = this.storageService.keyList;
  }

  ngOnInit() {
  }

  //adds the day to the habit
  addHabitDay(){
    this.storageService.addDayToHabit(this.habitName, this.date, this.didIt);
    this.router.navigateByUrl('home');
  }



}
