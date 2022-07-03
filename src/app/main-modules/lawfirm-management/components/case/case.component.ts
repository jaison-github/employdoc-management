import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToDetails(empId) {
    this.route.navigate(['/lawfirm/casesprofile', empId])
  }


}
