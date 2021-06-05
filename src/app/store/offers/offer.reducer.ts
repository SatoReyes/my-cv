import { createReducer, on, State } from "@ngrx/store";
import * as offerActions from "./offer.actions";

export const initialState = [];

const _offerReducer = createReducer(
    initialState,
    on(offerActions.setOffers, (state, { offers }) => offers )
);

export function offerReducer(state, action) {
    return _offerReducer(state, action);
}
