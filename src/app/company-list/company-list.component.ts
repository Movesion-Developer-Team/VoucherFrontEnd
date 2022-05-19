import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewCompanyBodyDto } from '../models/company';
import { Router } from '@angular/router';
import { GeneralResponseDto } from '../models/GeneralResponseDto';

import { companyBodyDto } from '../models/companyBodyDto'
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';

import { NewcompanyComponent } from '../newcompany/newcompany.component'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  playerForm!: FormGroup
  searchTerm!: string;
  // countries!: Company[];
  term!: string;
  search: String = "";
  isUpdating = false;
  showForm = true;
  id!: number;

  

  listData!: companyBodyDto[];

  collection: any = [];
  page: number = 0;
  isShown: boolean = false; // hidden by default

  // id :number| undefined;
  // isCreated= false;
  isLoggedIn = false;
  


  constructor(private dialog: MatDialog, 
    private companyService: CompanyService,
     private authService: AuthService, private http: HttpClient, private router: Router) {


  }


  ngOnInit(): void {
    this.getcompany();
  }
  onClickButton() {
    this.dialog.open(NewcompanyComponent, {
      width: '750px',
      height: '100%',
      data: {

      },
    }).afterClosed().subscribe(res => {
      this.getcompany();
    });





  }

  onClick() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      height: '900px',
      panelClass: 'custom-modalbox',

      data: {


      },
    })

    //   .afterClosed().subscribe(res=>{
    // this.getcompany();

    //   });
  }


  onRemoveCompany(element: companyBodyDto) {
    //   
    if (confirm('Are you sure you want to remove')) {
      this.listData.forEach((value: any, index: any) => {
        if (value == element)
          this.listData.splice(index, 1);
      })


      // alert('Are you sure you want to delete this company?')






      this.companyService.deleteCompany(element.id).pipe(
        catchError(er => {
          alert('there is an error');
          return of(null);
        })
      )
        .subscribe({
          next: data => {
            // console.log(data.shortName);
            this.isLoggedIn = true;
            



          },
          error: err => {
            alert(err);
          }
        });
    }
  }




  private getcompany() {
    this.companyService.getAll().subscribe(res => {
      this.listData = res;
    })

  }


  gohere() {
    this.router.navigateByUrl('./company-list.component.html');
  }


  onClickForm(item: CreateNewCompanyBodyDto) {
    this.dialog.open(TestComponent, {
      width: '800px',
      height: '900px',
      panelClass: 'custom-modalbox',

      data: {
        companyid: item.id
      },
    })
    //   .afterClosed().subscribe(res=>{
    // this.getcompany();

    //   });
  }
  // this.router.navigateByUrl('/superadmin/update')








}


