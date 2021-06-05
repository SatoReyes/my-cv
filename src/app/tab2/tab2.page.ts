import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import * as OfferActions from "../store/offers/offer.actions";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  _storage:any = null;
  offer:any = {
    id:null,
    nombres:"",
    cargo:"",
    ciudad:"",
    correo:"",
    celular:"",
    estudios:"",
    genero:"",
    fechaNacimiento:"",
    descripcionProfesional:"",
    descripcionPersonal:""
  };
  formOffer:FormGroup;
  constructor(
    private router:Router,
    private store:Store<{offer: Array<Object>}>,
    private storage:Storage,
    private formBuilder:FormBuilder,
    private activateRoute: ActivatedRoute) {


 
    this.formOffer = this.formBuilder.group({
      id:new FormControl(null,[]),
      nombres:new FormControl('',[Validators.required, Validators.minLength(10),
        Validators.maxLength(200)]),
      cargo:new FormControl("",[Validators.required, Validators.minLength(10),
        Validators.maxLength(200)]),
      ciudad:new FormControl("",[Validators.required]),
      celular:new FormControl("",[Validators.required,Validators.pattern(/[0-9]{10}/)]),
      correo:new FormControl("",[Validators.required,Validators.pattern( /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      estudios:new FormControl("",[Validators.required, Validators.minLength(10),
        Validators.maxLength(200)]),
      genero:new FormControl("",[Validators.required]),
      fechaNacimiento:new FormControl("",[Validators.required]),
      descripcionProfesional:new FormControl("",[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      descripcionPersonal:new FormControl("",[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
    });    
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)

    this.activateRoute.queryParams.subscribe(async(d)=>{
      
      if(d.id !== undefined){
        let offers = await this.getOffers();
        if(offers && offers !== undefined){
          this.formOffer.patchValue(offers.find((a)=>a.id == d.id));
        }
      
      }
    });

    this._storage = await this.storage.create();
  }

  async addOffer(){
    if(this.formOffer.valid){
      let offers = await this.getOffers();
      let offer = {...this.formOffer.value};
      offer.id = Math.random();
      offers = [...offers,offer];
      console.log(offers);
      await this._storage.set("offers",JSON.stringify(offers)); 
      offers = await this.getOffers();
      this.store.dispatch(OfferActions.setOffers({offers:offers }));
      this.router.navigate(['/tabs','tab1']);
      this.formOffer.reset();
    }
  }
  backToList(){
    this.router.navigate(['/tabs','tab1']);
      this.formOffer.reset();
  }
  hasErrors(field: any) {
    return (this.formOffer.get(field).invalid && this.formOffer.get(field).touched && this.formOffer.get(field).errors);
  }

  async getOffers(){
      let offerStorage = await this._storage.get("offers");
      let offers = offerStorage && offerStorage != undefined && JSON.parse(offerStorage).length > 0 ? JSON.parse(offerStorage):[];
      return offers;
    }

}

