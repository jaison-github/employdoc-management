import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {    path: '',    redirectTo: 'auth',    pathMatch: 'full'  },
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      title: 'Default page',
    }, children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./main-modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'employeemanagement',
        loadChildren: () =>
          import('./main-modules/employee-management/employee-management.module').then(
            (m) => m.EmployeeManagementModule
          ),
      },

      {
        path: 'documentmanagement',
        loadChildren: () =>
          import('./main-modules/document-management/document-management.module').then(
            (m) => m.DocumentManagementModule
          ),
      },

      {
        path: 'companyprofile',
        loadChildren: () =>
          import('./main-modules/company-management/company-management.module').then(
            (m) => m.CompanyManagementModule
          ),
      },

      
      {
        path: 'lawfirm',
        loadChildren: () =>
          import('./main-modules/lawfirm-management/lawfirm-management.module').then(
            (m) => m.LawfirmManagementModule
          ),
      },

     ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth-module/auth.module').then(
        (m) => m.AuthModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
