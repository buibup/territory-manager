import { Component, OnInit,EventEmitter } from '@angular/core';
import { TerritoryService } from '../territory.service';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import * as FileSaver  from 'file-saver';
 import 'rxjs/Rx' ;

declare var $ : any;
declare var Materialize :any;

console.log(FileSaver);

@Component({
  selector: 'app-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.css']
})
export class MonitorSearchComponent implements OnInit {

  errorMessage : string;
  sub : any;
  problem :boolean = false;
  loading = false;
  users;
  usersHash = {};
  macroareas;
  area_names;
  query = {
    macroarea:'',
    available:'',
    user:'',
    area_name:'',
    last:'',
    more_than:''
  };
  result;
  constructor(private territoryService:TerritoryService,private userService:UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      response=>{
        this.users = response;
        for(let user of this.users){
          this.usersHash[user['id']] = user['name'];
        }
        this.usersHash[0] = 'Nobody';
        console.log(this.usersHash);
        this.users.splice(0,1);
        this.territoryService.getMacroareas().subscribe(
          response=>{
            this.macroareas = response;
            this.territoryService.getNeighborhoods().subscribe(
              response=>
              {
                this.area_names=response;
                this.loading = false;
              },
              error=>this.problem=true
            )
          },
          error => this.problem = true
        );
      },
      error => this.problem = true
    );
  }
  log(){
    this.loading = true;
    console.log(this.query);
    this.territoryService.getCustomQuery(this.query).subscribe(
      response=>{
        this.result = response;
        this.loading = false;
      },
      error=>this.problem = true
    );
  }
  excel(){
    this.territoryService.downloadExcel(this.query).subscribe(
      blob=>{
        if (window.navigator.msSaveOrOpenBlob) { //IE 11+
          window.navigator.msSaveOrOpenBlob(blob, "search-territory.xlsx");
        } else if (navigator.userAgent.match('FxiOS')) { //FF iOS
          alert("Cannot display on FF iOS");
        }
      else if (navigator.userAgent.match('CriOS')) { //Chrome iOS
          var reader = new FileReader();
          reader.onloadend = function () { window.open(reader.result);};
          reader.readAsDataURL(blob);
        } else if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) { //Safari & Opera iOS
          var url = window.URL.createObjectURL(blob);
          window.open(url);
      }
      else {
        FileSaver.saveAs(blob,'territory.xlsx');
      }
    },
      error=>this.problem = true
    )
  }
}
