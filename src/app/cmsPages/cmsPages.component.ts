import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CmsPage } from 'app/model/cmsPage';
import { CmsPagesService } from 'app/services/cmsPages.service ';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cmsPages',
  templateUrl: './cmsPages.component.html',
  styleUrls: ['./cmsPages.component.css']
})
export class CmsPagesComponent implements OnInit {

  @ViewChild('closebutton',{ static: false }) closebutton:ElementRef;
  
  

  cmsPages:CmsPage;
  id:number
  item: CmsPage;
  editForm: FormGroup;
  disabled =false;
  submitted = false;

  itemId:any;

 constructor(private cmsPagesservice: CmsPagesService,private route:Router,
   private fb: FormBuilder,
   private modalService: NgbModal,
  private notifier: NotifierService,

   ) { }

    ngOnInit() {
      this.editForm = this.fb.group({
      title: ['',],
      //  short_description: ['',],
      status: ['',],
      description: ['',],
      //  isdelete: [''],
      });
      this.reloadData();
    }

      changeStatus(e) {
        console.log(e.target.value);
        this.editForm.get('status').setValue(e.target.value, {
          onlySelf: true
        })
      }
  

      reloadData() {
        this.cmsPagesservice.getCms().subscribe(data => {
          this.cmsPages = data;
          console.log("save",this.cmsPages);
      })  
    }


    remove(id:number) {  
      this.cmsPagesservice.deleteCms(id).subscribe((res)=>{
        this.notifier.notify( 'success','Successfully Deleted' );
        console.log("SSSSSSS",res)
        this.reloadData();
      },error => console.log(error) 
      );
    }

      edit(exampleModalview,item,) {
        this.itemId = item.id;
        this.modalService.open(exampleModalview, {
          centered: true,
          backdrop: 'static'
          });
          this.editForm.patchValue({
            title: item.title,
            description: item.description,
            // short_description: item.short_description,
            status: item.status,
            // isdelete: item.is_delete,
          
          });
      }

      view(exampleModalview,item) {
        this.disabled = true
        this.modalService.open(exampleModalview, {
          centered: true,
          backdrop: 'static'
          });
        this.editForm.patchValue({
          title: item.title,
          description: item.description,
          // short_description: item.short_description,
          status: item.status,
          // isdelete: item.is_delete,
          });   
      }

          add(addModal) {
            this.modalService.open(addModal, {
              centered: true,
            backdrop: 'static'
            }); 
            this.editForm.reset();

          }


        save(){
          console.log(".......................",this.editForm.value)
          let obj = {
            "title":this.editForm.get('title').value,
            "description": this.editForm.get('description').value,
            // "short_description": this.editForm.get('short_description').value,
            "status":  this.editForm.get('status').value,
            // "is_delete": this.editForm.get('isdelete').value,      
        }
        console.log("hiii",obj)
          this.cmsPagesservice.updateCms(this.itemId, obj)
          .subscribe({next:() =>{
            this.notifier.notify( 'success','Successfully Update' );
            this.modalService.dismissAll()
            this.reloadData();
            
          }, error: error => { 
            this.notifier.notify( 'error',' Something Wrong...' );
        }
        })
        
        }

        get f() { return this.editForm.controls; }

        submit() {
          this.submitted = true;
          if (this.editForm.invalid) {
            return;
          }else{
          this.cmsPagesservice.saveCms(this.editForm.value).pipe(first()).subscribe({
            next:()=>{
              console.log("subimitteed",this.editForm.value)
              this.submitted = false;
              this.notifier.notify( 'success',' Successfully Added' );
              this.modalService.dismissAll()
              this.reloadData();
              this.editForm.reset();

            },
            error: error => { 
              this.notifier.notify( 'error',' Something Wrong...' );
          }
          })
          }
        }
}
