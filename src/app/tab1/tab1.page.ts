import { Component, OnDestroy, OnInit } from '@angular/core';

import  {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { select, Store } from '@ngrx/store';
import * as OfferActions from "../store/offers/offer.actions";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,OnDestroy {
  
  offers:any = [];
  _storage:any = null;
  subOffers:any = null;
  search:string = '';
  constructor(
    private router:Router,
    private store: Store<{ offer: Array<Object> }>,
    private storage:Storage) {
    this.subOffers = this.store.pipe(select("offer")).subscribe((d: any) => {
      this.offers =  d;
      console.log(d);
    });
  }
  ngOnDestroy(): void {
   this.subOffers.unsubscribe();
  }

  async ngOnInit() {
    this._storage = await this.storage.create();
    this.getOffers();
  }
  async searchCandidates(event){
    if(this.search && this.search != '' && this.search != undefined){
      let offerStorage = await this._storage.get("offers");
      let offers = offerStorage && JSON.parse(offerStorage).length > 0 ? JSON.parse(offerStorage):[];
      let offersSearched = offers.filter((offer) => offer.cargo.toLowerCase() == this.search.toLowerCase());
      this.store.dispatch(OfferActions.setOffers({offers:offersSearched})); 
    }else{
      let offerStorageb = await this._storage.get("offers");
      let offersb = offerStorageb && JSON.parse(offerStorageb).length > 0 ? JSON.parse(offerStorageb):[];
      this.store.dispatch(OfferActions.setOffers({offers:offersb})); 
    }
  
  }

  showOffer(offer:any){
    this.router.navigate(['tabs','tab2'],
    { 
      queryParams: { 
        id:offer.id
      } 
    });
  }

  async getOffers(){
    let offerStorage = await this._storage.get("offers");
    console.log(offerStorage);
    let offers = offerStorage && JSON.parse(offerStorage).length > 0 ? JSON.parse(offerStorage):[];
    this.store.dispatch(OfferActions.setOffers({offers:offers}));
  }
  


}
