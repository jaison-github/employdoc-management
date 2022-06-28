import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { IconsService } from '@shared/services/icons.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit  {
  title = 'lowfirmapp';
  constructor( private authService: AuthService){
  }

  ngOnInit(): void{

  }
  ngAfterViewInit(): void{
    // this.vm$.subscribe(it => {
    //   if (!it.user && !this.authService.isTokenExpired){
     
    //   }
    // });
  }
}
