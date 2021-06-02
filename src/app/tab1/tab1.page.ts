import { Component, OnInit } from '@angular/core';

import  {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  offers:any = [];
  _storage:any = null;
  constructor(private storage:Storage) {
   
  }
  async ngOnInit() {
    this._storage = await this.storage.create();
    this.getOffers();
  }

  async getOffers(){
    let offerStorage = await this._storage.get("offers");
    console.log(offerStorage);
    let offers = offerStorage && JSON.parse(offerStorage).length > 0 ? JSON.parse(offerStorage):[];
    console.log(offers);
    this.offers = offers;
  }
  

}
