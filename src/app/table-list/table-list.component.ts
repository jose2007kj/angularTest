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
  @ViewChild(MatTable) table: MatTable<any>;
  showform: boolean =false;
  displayedColumns: string[] = ['name', 'position', 'office', 'salary'];
  constructor(private http : HttpClient, private formBuilder: FormBuilder){ 
      } 
  
  ngOnInit(): void { 
     this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            position: ['', Validators.required],
            office: ['', Validators.required],
            salary: ['', Validators.required]
        });
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
    }); 
    function hideloader(){ 
      document.getElementById('loading').style.display = 'none';} 
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {

            return;
        }

        // display form values on success
        this.lis.push(this.registerForm.value)
            console.log(this.lis);this.table.renderRows()
            this.showform =false
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    showForm(){
      this.showform=true
    }


    } 

  