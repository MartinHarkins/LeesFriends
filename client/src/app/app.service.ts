import {Injectable} from "@angular/core";

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  internalState: InternalStateType = { };

  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this.internalState = this.clone(this.internalState);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this.internalState[prop] = value;
  }


  private clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
