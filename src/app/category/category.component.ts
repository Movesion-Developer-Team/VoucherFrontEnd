import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { Observable, of } from 'rxjs';
import { CreateNewCompanyBodyDto } from '../models/company';
import { tokenName } from '@angular/compiler';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';
import { TestComponent } from '../test/test.component';
import {  GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import { AddcategoryComponent } from '../addcategory/addcategory.component';



import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { NewcompanyComponent } from '../newcompany/newcompany.component';
import { EditCategoryDialogComponent } from '../editcategorydialog/editcategorydialog.component';
import { CategoryBodyDto } from '../models/CategoryBodyDto';
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchTerm!: string;
  categoryForm!: FormGroup
  term!: string;

  listCategory!: Category[];
  isLoggedIn = false;
  listData!: CategoryBodyDto[];
  isShown: boolean = false;

  page: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder, 
    private authService: AuthService,
     private http: HttpClient,
     private categoryService: CategoryService,
      private router: Router) {

    this.categoryForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],

    })
  }




  removeItem(element: CategoryBodyDto) {
    if (confirm('Are you sure you want to remove ?')) {
      // this.listCategory.forEach((value: any,index: any)=>{
      //     if(value == element )
      //     this.listCategory.splice(index,1);
      // })
      this.categoryService.deleteCategory(element.id).pipe(
        catchError(er => {
          alert('there is an error');
          return of(null);
        })
      )
        .subscribe({
          next: data => {
            // console.log(data.shortName);
            this.isLoggedIn = true;
            this.getcategory();



          },
          error: err => {
            alert(err);
          }
        });
    }

  }
  onEditCategory(item: CategoryBodyDto) {

    this.dialog.open(EditCategoryDialogComponent, {
      width: '800px',
      height: '900px',
      data: { categoryid: item.id },
    })

    // .afterClosed().subscribe(res=>{
    //   this.getcategory();
    // });
  }






  ngOnInit(): void {

    this.getcategory();


  }
  getcategory() {
    this.categoryService.getAll().subscribe((res)=>{
      this.listData = res;
    });

  }


  onNewCategory() {
    this.dialog.open(AddcategoryComponent, {
      width: '750px',
      // height:'100%',
      data: {

      },
    }).afterClosed().subscribe(res => {
      this.getcategory();
    });



  }





}
