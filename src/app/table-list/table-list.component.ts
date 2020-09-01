import { Component, OnInit,ViewChild } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTable} from '@angular/material/table';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})


export class TableListComponent implements OnInit {
  
  li:any; 
  lis=[]; 
  registerForm: FormGroup;
  submitted = false;
  @ViewChild(MatTable) table: MatTable<any>; //for refreshing table on update of lis
  showform: boolean =false;
  displayedColumns: string[] = ['name', 'position', 'office', 'salary']; //table heading
  
  constructor(private http : HttpClient, private formBuilder: FormBuilder){ //intialise hhtp,formbuilder
  } 
  
  ngOnInit(): void { 

    this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            position: ['', Validators.required],
            office: ['', Validators.required],
            salary: ['', Validators.required]
        }); //for form validation

    
    this.http.get('http://www.mocky.io/v2/5ea172973100002d001eeada') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      if(Response){   
        hideloader(); 
      } 
      console.log(Response) 
      this.li=Response; 
      this.lis=this.li.list; 
    }); //for fetching api

    function hideloader(){ //hide loading
      document.getElementById('loading').style.display = 'none';} 
    }

    get f() { return this.registerForm.controls; } //validation check

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {

            return;
        }

        
        this.lis.push(this.registerForm.value)  // insertform values on success validation
        console.log(this.lis);
        this.table.renderRows() //reload table
        this.showform =false //to hide form
        
    }

    onReset() { //clear form
        this.submitted = false;
        this.registerForm.reset();
    }

    showForm(){ //show form
      this.showform=true
    }


} 

  