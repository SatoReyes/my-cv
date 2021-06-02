import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  _storage:any = null;
  offer:any = {
    id:null,
    nombres:null,
    cargo:null,
    ciudad:null,
    correo:null,
    estudios:null,
    genero:null,
    fechaNacimiento:null,
    descripcionProfesional:null,
    descripcionPersonal:null
  };
  formOffer:FormGroup;
  constructor(private storage:Storage,private formBuilder:FormBuilder) {
 
    this.formOffer = this.formBuilder.group({
      id:new FormControl(null,[]),
      nombres:new FormControl(null,[Validators.required]),
      cargo:new FormControl(null,[Validators.required]),
      ciudad:new FormControl(null,[Validators.required]),
      correo:new FormControl(null,[Validators.required,Validators.pattern( /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      estudios:new FormControl(null,[Validators.required]),
      genero:new FormControl(null,[Validators.required]),
      fechaNacimiento:new FormControl(null,[Validators.required]),
      descripcionProfesional:new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      descripcionPersonal:new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
    });
    
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    this._storage = await this.storage.create();
  }

  async addOffer(){
    if(this.formOffer.valid){
      let offerStorage = await this._storage.get("offers");
      console.log(offerStorage);
      let offers = offerStorage && JSON.parse(offerStorage).length > 0 ? JSON.parse(offerStorage):[];
      let offer = {...this.formOffer.value};
      offer.id = Math.random();
      offers = [...offers,offer];
      console.log(offers);
      await this._storage.set("offers",JSON.stringify(offers)); 
    }
  }
  hasErrors(field: any) {
    return (this.formOffer.get(field).invalid && this.formOffer.get(field).touched && this.formOffer.get(field).errors);
  }

}

