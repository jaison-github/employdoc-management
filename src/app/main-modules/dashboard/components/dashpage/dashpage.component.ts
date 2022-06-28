import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MasterDataLookUpTypes } from '@shared/models/master.models';
import { IconsService } from '@shared/services/icons.service';
import { MasterdataService } from '@shared/services/masterdata.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import * as _ from 'lodash';
import { DashService } from '../../services/doc.service';

@Component({
  selector: 'app-dashpage',
  templateUrl: './dashpage.component.html',
  styleUrls: ['./dashpage.component.scss'],
  providers: [],
})
export class DashpageComponent implements OnInit, AfterViewInit {
  vm$ = this.store.vm$;
  listingRequest = null;
  sourceData = [];
  alertList = [];

  constructor(
    private masterService: MasterdataService,
    private store: MasterDataStoreService,
    private dashService: DashService,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);

    this.getAlters();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.vm$.subscribe(it => {
    //   this.genderList = it.genderList;
    //    console.log('masterData = >', it);
    // });
  }

  loadMasterData(): void {
    this.masterService.getMasterdata('6').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  getAlters(): void {
    this.dashService.getAlerts().subscribe({
      next: (res) => {
        this.sourceData = res;
        this.processAlerts(this.sourceData);
      },
      error: (error) => {},
    });
  }

  processAlerts(data): void {
    var array = [];
    data.forEach((element) => {
      let item = [];
      if (element.message) {
        item = element.message.split(',');
        item.forEach((item, idx) => {
          if (idx == 0) {
            element.employee = item.split(':')[1];
          }

          if (idx == 1) {
            element.msg = item;
          }

          if (idx == 2) {
            element.remDays = item.split('-')[1];
          }
        });
      }
      array.push(element);
    });
    let obj = _.groupBy(array, 'heading');
    for (let key in obj) {
      this.alertList.push({
        document: key,
        list: obj[key],
        show: false,
        collapsed: false
      });
    }
    console.log(this.alertList);
  }


  private get icons(): Array<string> {
    return [
      "pdf-icon",
      "icon-pdf",
      "jpg-icon",
      "pdf-file-icon",
      "png-icon",
      "file-remove",
      "folder",
      "view-files",
      "download",
      "icon-delete",
      "icon-signout"
    ];
  }

}
