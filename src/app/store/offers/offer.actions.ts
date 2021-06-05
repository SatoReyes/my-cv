import { createAction,props } from "@ngrx/store";
export const setOffers =createAction('[Products Component] setOffers',props<{offers:Array<object>}>());