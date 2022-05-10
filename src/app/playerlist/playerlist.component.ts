import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlayerBodyDto} from '../models/PlayerBodyDto';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';
import { GetAllPlayerResponseDto } from '../models/GetAllPlayerResponseDto';
import { CategoryBodyDto } from '../models/CategoryBodyDto';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { NewcompanyComponent } from '../newcompany/newcompany.component';
import { AddplayerComponent} from '../addplayer/addplayer.component';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
   playerForm!:FormGroup
  searchTerm!: string;
  players!: PlayerBodyDto[];
  term!: string;

  listData!: CreateNewPlayerBodyDto[];

  isLoggedIn = false;

  collection: any = [];
  page: any=[];
  
  items!:CategoryBodyDto[];

  constructor(private dialog: MatDialog,private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ){
   
   

    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:['',Validators.required],
    categoryId:['',Validators.required],
    id:['',Validators.required],
    
    })
  }
   


  removeItem(element:PlayerBodyDto){


    if(confirm('Are you sure you want to remove')){
  this.listData.forEach((value: any,index: any)=>{
      if(value == element )
      this.listData.splice(index,1);
  })

   this.authService.Deleteplayer(element.id).pipe(
    catchError(er=> {
     alert('there is an error');
     return of(null);
   })
  )
  .subscribe({
    next: data => {
      // console.log(data.shortName);
      this.isLoggedIn = true;
      this.listData.push(this.playerForm.value);
      this.playerForm.reset();
      
   
      
    },
    error: err => {
   alert(err);
     }
 
    });
  }
  }

  public addItem():void{
      this.listData.push(this.playerForm.value);
    
      console.log(this.listData);
         this.playerForm.reset();
  }



 
   reset(){this.playerForm.reset()}

// function RemoveElementFromArray(element: number) {
//     this.arrayElements.forEach((value,index)=>{
//         if(value==element) this.arrayElements.splice(index,1);
//     });
// }





  ngOnInit(): void {
 this.getPlayer();
  }
  
  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
    ).subscribe(res => {
      this.listData = res;
    })
    
  }
  
  onSubmit(): void {
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category} = this.playerForm.value;
    
    this.authService.addPlayer( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category).subscribe({
      next: data => {
        console.log(data.shortName);
        this.isLoggedIn = true;
        this.listData.push(this.playerForm.value);
        this.playerForm.reset();
        
     
        
      },
      error: err => {
     
      }
    });
  }


  
 onClickForm(item: CreateNewPlayerBodyDto){
  this.dialog.open(TestplayerComponentComponent, {
    width: '800px',
    height:'1100px',
    panelClass: 'custom-modalbox',
    data: {
      playerid: item.id
    },})
    .afterClosed().subscribe(res=>{
      this.getPlayer();
  });
}

onClickButton(){
  this.dialog.open(AddplayerComponent, {
    width: '750px',
    height:'100%',
    data: {
    
    },
  });

}

  


  
  

}

