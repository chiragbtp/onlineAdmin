import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Queries } from 'app/model/queries';
import { QueriesService } from '../services/queries.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @ViewChild('closebutton',{ static: false }) closebutton:ElementRef;
  
  

   items:Queries;
   id:number
   item: Queries;
   editForm: FormGroup;

   itemId:any;

  constructor(private queriesservice: QueriesService,private route:Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
   private notifier: NotifierService,

    ) { }

  ngOnInit() {
    
   this.editForm = this.fb.group({
    fullname: ['',[Validators.required]],
    phone: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
    email: ['',[Validators.required, Validators.email]],
    skype: ['',[Validators.required]],
    date: [''],
    market: [''],
    target: [''],
    agent: [''],
    company: [''],
    country: [''],
    industry: [''],
    vol: ['']
   });
   this.reloadData();

  }

    reloadData() {
      this.queriesservice.getData().subscribe(data => {
        this.items = data;
        console.log(this.items);
    })  
  }

 
  remove(id:number) {  
    this.queriesservice.deleteData(id).subscribe((res)=>{
      this.notifier.notify( 'success','Successfully Deleted' );

      console.log("SSSSSSS",res)
      this.reloadData();

    },error => console.log(error)
    
    );

  }

  edit(exampleModalview,item,i) {
    this.itemId = item.id;
    this.modalService.open(exampleModalview, {
      centered: true,
     backdrop: 'static'
     });
    this.editForm.patchValue({
      fullname: item.full_name,
      phone: item.phone,
      email: item.email,
      skype: item.skype_id,
      date: item.date_to_live,
      market: item.target_market,
      target: item.target_processing,
      agent: item.referring_agent,
      company: item.company_name,
      country: item.country,
      industry: item.industry,
      vol: item.volume_per_month
     
     });
  }

  view(exampleModalview,item) {
    this.modalService.open(exampleModalview, {
      centered: true,
     backdrop: 'static'
     });
    this.editForm.patchValue({
      fullname: item.full_name,
      phone: item.phone,
      email: item.email,
      skype: item.skype_id,
      date: item.date_to_live,
      market: item.target_market,
      target: item.target_processing,
      agent: item.referring_agent,
      company: item.company_name,
      country: item.country,
      industry: item.industry,
      vol: item.volume_per_month
     
     });

     
  }
  // updateEmployee(id:number) {
  //   this.queriesservice.updateData(id, this.items)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.item = new Queries();
  //       this.reloadData();
  //     }, error => console.log(error));
  // }

  save(){
    
   console.log(".......................",this.editForm.value)
    let obj = {
     
      "full_name":this.editForm.get('fullname').value,
      "phone": this.editForm.get('phone').value,
      "email": this.editForm.get('email').value,
      "skype_id":  this.editForm.get('skype').value,
      "date_to_live": this.editForm.get('date').value,
      "target_market":this.editForm.get('market').value,
      "target_processing": this.editForm.get('target').value,
      "referring_agent":this.editForm.get('agent').value,
      "company_name": this.editForm.get('company').value,
      "country": this.editForm.get('country').value,
      "industry": this.editForm.get('industry').value,
      "volume_per_month": this.editForm.get('vol').value
  }
  console.log("hiii",obj)

    this.queriesservice.updateData(this.itemId, obj)
    .subscribe(data => {
      console.log(data)
      this.notifier.notify( 'success','Successfully Update' );
      this.modalService.dismissAll()
      this.reloadData();
    }, error => console.log(error));

  }

}
