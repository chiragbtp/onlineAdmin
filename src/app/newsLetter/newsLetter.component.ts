import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NewsLetter } from 'app/model/newsLetter';
import { NewsLetterService } from 'app/services/newsLetter.service  ';

@Component({
  selector: 'app-newsLetter',
  templateUrl: './newsLetter.component.html',
  styleUrls: ['./newsLetter.component.css']
})
export class NewsLetterComponent implements OnInit {

    

  newsLetter:NewsLetter;
  id:number
  item: NewsLetter;
  editForm: FormGroup;
  disabled =false;
  submitted = false;

  itemId:any;

 constructor(private newsLetterservice: NewsLetterService,private route:Router,
   private fb: FormBuilder,
   private modalService: NgbModal,
  private notifier: NotifierService,

   ) { }

    ngOnInit() {
      this.editForm = this.fb.group({
      title: ['',],
      status: ['',],
      description: ['',],
      });
      this.reloadData();
    }


      reloadData() {
        this.newsLetterservice.getNewsLetter().subscribe(data => {
          this.newsLetter = data;
          console.log("save",this.newsLetter);
      })  
    }


    remove(id:number) {  
      this.newsLetterservice.deleteCms(id).subscribe((res)=>{
        this.notifier.notify( 'success','Successfully Deleted' );
        console.log("SSSSSSS",res)
        this.reloadData();
      },error => console.log(error) 
      );
    }

      
}
