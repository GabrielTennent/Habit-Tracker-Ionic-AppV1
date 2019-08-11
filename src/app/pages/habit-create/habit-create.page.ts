import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/user/storage.service';

@Component({
  selector: 'app-habit-create',
  templateUrl: './habit-create.page.html',
  styleUrls: ['./habit-create.page.scss'],
})

//This class is used to obtain the neccessary data to make a habit and returns the information to the home page
export class HabitCreatePage implements OnInit {

  protected habitName : string;
  protected date : Date;
  protected didIt : string;
  private habitList: string[];

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.getKeyList();
    this.habitList = this.storageService.keyList;
  }

  //adds habit to the habit storage
  addHabit(){
    this.storageService.setValue(this.habitName, [this.date, this.didIt]);
    this.router.navigate(['home']);
  }

  removeHabit(habit: string){
    this.storageService.removeKey(habit);
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
