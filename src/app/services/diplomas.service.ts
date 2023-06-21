import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiplomas } from '../interfaces/IDiploma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {
  _getURL='https://testproj2.cloudiax.com/api/Course/SearchDiploma';
  _addURL='https://testproj2.cloudiax.com/api/Diploma/PostDiploma';
  _delURL='https://testproj2.cloudiax.com/api/Course/DeleteCourses';
  _editURL='https://testproj2.cloudiax.com/api/Diploma/PutDiploma'

  constructor(private http:HttpClient) { }
  token=localStorage.getItem('token');
  headObj=new HttpHeaders().set('Authorization','bearer '+this.token);
  getAllDiplomas(page:number):Observable<IDiplomas[]>{
    return this.http.post<IDiplomas[]>(this._getURL,{"diplomaName":null, "page": page, "eduCompId": 2},{headers:this.headObj})
  }
  addDiploma(obj:any){
    return this.http.post(this._addURL,obj,{headers:this.headObj});
  }
  editDiploma(obj:any){
    return this.http.put(this._editURL+'/'+obj.id,obj,{headers:this.headObj})
  }
  deleteDiploma(id:number){
    return this.http.delete(this._delURL+'/'+id,{headers:this.headObj})
  }
}
