import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Pagination, FilterOperator, MasterDataLookUpTypes } from '@shared/models/master.models';
import { MasterdataService } from '@shared/services/masterdata.service';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { Subscription } from 'rxjs';
import { EmpService } from 'src/app/main-modules/employee-management/services/emp.service';
import { EmpStoreService } from 'src/app/main-modules/employee-management/store/emp-management.state';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-in-out-list',
  templateUrl: './doc-in-out-list.component.html',
  styleUrls: ['./doc-in-out-list.component.scss']
})
export class DocInOutListComponent implements OnInit {

  @Input() displayedColumns: string[] = ['empcode', 'docdate','remarks'];
 
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
     private docService: DocService,
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
    this.docService.getDocList(MasterDataLookUpTypes.doclocationlist).subscribe({
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

  
  goToDocAction(empId) {
    empId == null
      ? this.route.navigate(['/documentmanagement/docinoutaction', 'new'])
      : this.route.navigate(['/documentmanagement/docinoutaction', empId]);
  }
}
