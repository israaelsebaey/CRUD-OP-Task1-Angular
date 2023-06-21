import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  userEmail:any;
  ngOnInit(): void {
    this.userEmail=localStorage.getItem(JSON.parse('userEmail'))
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
