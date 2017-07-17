import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http :Http,private authService: AuthService,private router: Router) {  }
  username:string;
  password:string;
  loading = false;
  ngOnInit() {
     this.router.navigate(['home']);
  }

  login(event, username,password) {
    this.authService.authenticate(username,password);
  }
}
