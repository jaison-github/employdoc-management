import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-account-info',
  templateUrl: './header-account-info.component.html',
  styleUrls: ['./header-account-info.component.scss']
})
export class HeaderAccountInfoComponent implements OnInit {
  @Input() activeUser: any = {fullName: 'Test user'};
  @Input() acType: any = null;
  profilePicUrl: any = 'assets/images/avatar.png';
  constructor() { }

  ngOnInit(): void {
    
  }

  logOut(): void {
  }



}
