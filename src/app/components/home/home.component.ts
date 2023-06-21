import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { DiplomasService } from 'src/app/services/diplomas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pagesArr:number[]=[];
  page:number=1;
  arrNumbers=[1,2,3,4,5,6,7,8,9,10];
  dropdownList :any= [];
  selectedItems :any= [];
  dropdownSettings :any= {};
  flag:boolean=false;
  addDiploma=this.fb.group({
    id:[''],
    diploma_en_name:[''],
    diploma_ar_name:[''],
    price:[''],
    from_date:[''],
    to_date:[''],
    diploma_description:[''],
    diploma_attach:[''],
    eduCompId: [2],
    categoryIds:[this.selectedItems],
    category:['']
  })

  constructor(private fb:FormBuilder,private catService:CategoriesService,private diplomSer:DiplomasService) { }
  diplomasArr:any;
  ngOnInit(): void {
    this.getAllData(this.page);
    this.dropdownList = this.catService.getAllCategories();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'en_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 24,
      allowSearchFilter: true
    };
  }
  getAllData(page:number){
    this.diplomSer.getAllDiplomas(page).subscribe(res=>{
      this.diplomasArr=res;
    });
  }
  goNext(page:number){
     this.getAllData(page)
  }
  onItemSelect(item: any) {
    console.log(item.id); 
    this.selectedItems.push(item.id)
    console.log(this.selectedItems)
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  saveData(){
     if(this.flag==true){
       this.diplomSer.editDiploma(this.addDiploma.value).subscribe((res:any)=>{
        if(res.returnValue===1){
          alert('Updated Sucessfully');
          this.addDiploma.reset();
          window.location.reload();
         }
         else{
          alert('Something went wrong')
         }
       },err=>console.log(err))
     }
     else{
      this.diplomSer.addDiploma(this.addDiploma.value).subscribe((res:any)=>{
        console.log(res);
        if(res.returnValue===1){
           alert('Added Successfully');
           this.addDiploma.reset();
           window.location.reload();
        }
        else{
          alert('Something is wrong')
        }
        },err=>console.log(err))   
     }
    }
    delData(id:number){
      this.diplomSer.deleteDiploma(id).subscribe((res:any)=>{
        if(res.returnValue===1){
           alert('Deleted Successfully');
            window.location.reload();
            this.diplomSer.getAllDiplomas(this.page);
        }
        else{
          alert('Something went Wrong')
        }
      })
    }
    editData(obj:any){
        this.flag=true;
        this.addDiploma=this.fb.group({
        id:obj.id,
        diploma_en_name:obj.diploma_en_name,
        diploma_ar_name:obj.diploma_ar_name,
        price:obj.price,
        from_date:obj.from_date.slice(0,obj.from_date.indexOf('T')),
        to_date:obj.to_date.slice(0,obj.from_date.indexOf('T')),
        diploma_description:obj.diploma_description,
        diploma_attach:obj.diploma_attach,
        categoryIds:[this.selectedItems],
        eduCompId: 2,
      })
    }   
}
