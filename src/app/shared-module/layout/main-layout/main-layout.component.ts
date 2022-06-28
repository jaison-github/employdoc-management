import { Component, OnInit } from '@angular/core';
import { IconsService } from '@shared/services/icons.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private _icon: IconsService) {
    this._icon.registerIcons(this.icons);
   }

  ngOnInit(): void {
  }


  private get icons(): Array<string> {
    return [
      "pdf-icon",
      "jpg-icon",
      "pdf-file-icon",
      "png-icon",
      "file-remove",
      "folder",
      "view-files",
      "icon-calender",
      "icon-profile",
      "management-icon",
      "folder-1439",
      "skill-8805",
      "resume-9873",
      "icon-dashboard",
      "comp-icon-two",
      "comp-icon-one",
      "law-firm-icon"
    ];
  }

}
