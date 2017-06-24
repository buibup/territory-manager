/***USERS WILL BE ALLOWED TO UPDATE THE HOUSEHOLDS IN THE cod_cards THEY HAVE
OR RETURN THE COD_CARDS THEY HOLD
***/
import { Component, OnInit,EventEmitter } from '@angular/core';
import { HouseholdService } from '../household.service';
import { TerritoryService } from '../territory.service';
import { UserService } from '../user.service';
import { Codcard } from '../codcard';
import {MaterializeModule} from "angular2-materialize";
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { Router,ActivatedRoute } from '@angular/router';

declare var $ : any;
declare var Materialize :any;
declare var FileSaver : any;
declare var html2canvas :any;

@Component({
  selector: 'app-update-search',
  templateUrl: './update-search.component.html',
  styleUrls: ['./update-search.component.css']
})
export class UpdateSearchComponent implements OnInit {

  errorMessage : string;
  sub : any;
  codCards = Array();
  codsByCard = {} //HASH TABLE
  households;
  householdsByCard = {}; //HASH TABLE CARD -> HOUSEHOLDS
  codCardNames = Array();
  problem :boolean = false;
  user;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private householdService:HouseholdService,
    private territoryService:TerritoryService,
    private userService:UserService
  ) { }
  saveChanges(element){
    Materialize.toast('please, wait...',1000,'');
    this.householdService.updateHousehold(element).subscribe(
      response => Materialize.toast("Saved! Thank you for your help.",4000," green white-text"),
      error => this.problem = true
    )
  }
  deleteHousehold(element,cod_card){
    if(confirm("Are you sure you want to delete this?")){
      Materialize.toast("Please, wait...",1000,'');
      this.householdService.deleteHousehold(element.COD).subscribe(
        response=>{
          Materialize.toast("Household deleted! Thanks for your help.",4000," green white-text");
          let index = this.householdsByCard[cod_card].households.indexOf(element);
          this.householdsByCard[cod_card].households.splice(index,1);
        },
        error => this.problem = true
      )
    }
  }
  returnCard(card,name){
    if(confirm("Are you sure you want to return this card?")){
      Materialize.toast("Please, wait...",1000,'')
      this.territoryService.returnCard(card.cod,this.user.id).subscribe(
        response=>{
          Materialize.toast("Card returned! Thanks for your help",4000,' green white-text');
          let index = this.codCardNames.indexOf(name);
          this.codCardNames.splice(index,1);
          console.log(this.codCardNames);
        }
      )
    }
  }
  ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.territoryService.getCardsByUser(this.user.id).subscribe(
          response => {
            console.log(response);
            let temp = response;
            if(!temp[0])
              return;
            for(let card of temp){
              this.householdsByCard[card['COD_CARD']] = {households:[]};
              this.codsByCard[card['COD_CARD']] = {cod:card['cod']};
              this.codCardNames.push(card['COD_CARD']);
              this.codCards.push(card['cod']);
            }
            this.householdService.getHouseholdsBycardCod(this.codCards).subscribe(
              response => {
                for(let house of response){
                  this.householdsByCard[house.COD_CARD].households.push(house);
                }
              },
              error => this.problem = true
            )
          },
          error => {
            this.errorMessage = error;
            this.problem = true;
          }
        )
    console.log(this);
  }
}
