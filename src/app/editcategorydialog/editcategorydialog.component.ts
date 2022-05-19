import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CategoryBodyDto } from '../models/CategoryBodyDto';


@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './editcategorydialog.component.html',
  styleUrls: ['./editcategorydialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  items!: CategoryBodyDto[]
  categoryForm: FormGroup | undefined;
  isLoggedIn = false;





  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,

  ) {
    this.loadCategory(data.categoryid as number | undefined);
  }
  private loadCategory(id: number | undefined) {
    if (id) {
      this.categoryService.findById(id)
        .pipe(
          filter(res => (res !== undefined))
        )
        .subscribe(res => {

          this.categoryForm = this.fb.group({

            id: [id, Validators.required],
            name: [res?.name, Validators.required],
            description: [res?.description, Validators.required],
          })
        });
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // closethis() {
  //   this.dialog.closeAll();
  // }

  ngOnInit(): void {

  }


  onSubmit(): void {
    if (this.categoryForm) {
      console.log(this.categoryForm)
      const { id, Name, Description } = this.categoryForm.value;

      this.categoryService.updateCategory(id, Name, Description).subscribe({
        next: data => {
          // console.log(data.Name);
          this.isLoggedIn = true;
          // // if (this.categoryForm){
          // this.categoryForm.reset();
          // // }
          // // this.router.navigateByUrl('/superadmin/category');

        },
        error: err => {

        }
      });

    }
  }
}

