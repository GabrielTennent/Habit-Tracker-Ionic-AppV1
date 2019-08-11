import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/user/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

//Home page for displaying all of the habit information
export class HomePage implements OnInit {

  //List of habit name - number of days tracked - number of yes days tracked
  public habitCountList: { name: string, days: number, yesDays: number }[]
  //Habit name list
  public habitNames: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.habitCountList = [];

    //Checks to see if a information for adding a new habit has been passed through
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        var habitNameAdd = this.router.getCurrentNavigation().extras.state.name;
        var dateAdd = this.router.getCurrentNavigation().extras.state.date;
        var didItAdd = this.router.getCurrentNavigation().extras.state.didIt;
        this.storageService.setValue(habitNameAdd, [dateAdd, didItAdd]);
      }
    });
  }

  //Runs on every page reload
  //and initalizes all the data from storageSevice
  async ngOnInit() {
    //returns a list of all the habit names
    await this.storageService.getKeyList()
      .then(val => this.habitNames = val);
    //iterates through list of arrays computing day values
    for (let i = 0; i < this.habitNames.length; i++) {
      var habit = this.habitNames[i];
      var dayCount = 0;
      var yesCount = 0;
      await this.computeDayCount(habit).then(val => dayCount = val);
      await this.computeYesCount(habit).then(val => yesCount = val);
      var dayInfo = {
        name: habit,
        days: dayCount,
        yesDays: yesCount
      }
      this.habitCountList.push(dayInfo);
    }
    console.log(this.habitCountList);
  }


  //calculates # days that are yes stored for each habit
  //imports data using storageService

  async computeYesCount(habit: string) {
    var yesCount = 0;
    var list: string[];
    await this.storageService.getValueList(habit)
      .then(val => list = val);
    for (let i = 0; i < list.length; i++) {
      if (list[i] == "yes") {
        yesCount++;
      }
    }
    return yesCount;
  }

  //calculates # days stored for each habit
  //imports data using storageService

  async computeDayCount(habit: string) {
    var dayCount = 0;
    var list: string[];
    await this.storageService.getValueList(habit)
      .then(val => list = val);
    for (let i = 0; i < list.length; i++) {
      if (list[i] != "yes") 
        if(list[i] != "no")
          dayCount++;
    }
    return dayCount;
  }

  //Old method used for debugging

  // async computeDays() {
  //   var habitList: string[];
  //   await this.storageService.getKeyList()
  //     .then(list => habitList = list);
  //   //this.habitList = habitList;
  //   for (let i = 0; i < habitList.length; i++) {
  //     this.computeYesCount(habitList[i]);
  //     this.computeDayCount(habitList[i]);
  //   }
  // }
}
