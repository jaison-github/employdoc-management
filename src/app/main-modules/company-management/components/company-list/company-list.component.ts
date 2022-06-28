import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Pagination, FilterOperator, MasterDataLookUpTypes } from '@shared/models/master.models';
import { MasterdataService } from '@shared/services/masterdata.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { Subscription } from 'rxjs';
import { DocService } from 'src/app/main-modules/document-management/services/doc.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {


  @Input() displayedColumns: string[] = ['cmpnycode', 'cmpnyname', 'licencenumber','cmpnyaddress', 'noofstaff'];
 
  @Output() selectactiveCourse = new EventEmitter<any>();
  @Input() activeRow = null;
  vm$ = this.store.vm$;

  gridList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.gridList);
  selection = new SelectionModel<any>(false, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;
  sortOrder: Order = new Order;
  pagination: Pagination = new Pagination;
  filter: FilterOperator = new FilterOperator;

  pageIndex: number = 1;
  pageSize: number = 12;
  length: number = 0;
  subscription: Subscription[] = [];
  constructor(    private store: MasterDataStoreService,
     private route: Router,
     private activatedRoute: ActivatedRoute,
     private compservice: CompanyService,
     private mdService: MasterdataService,
     private ref: ChangeDetectorRef

    ) { 
      this.getEmpWithDocDetials();
    }

  ngOnInit(): void {
    this.subscription.push(
      this.vm$.subscribe((it) => {
       
      })
    );
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchitem(val = '') {
    this.dataSource.filter = val.trim().toLowerCase();;
  }


  getEmpWithDocDetials(): void{
    this.compservice.getList(MasterDataLookUpTypes.companylist).subscribe({
      next:(res)=>{
        this.gridList = res;
        this.dataSource.data = this.gridList;
        this.ref.detectChanges();
      },
      error:(err)=>{
        
      }
    })
  }

  
  sortData(item): void { }



  goToDetails(empId) {
    this.route.navigate(['/companyprofile/companyprofile', empId])
  }

}
