import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    selectedTab: string = 'student';  // Mặc định là tab User
}
