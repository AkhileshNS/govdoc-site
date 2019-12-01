import { decorate, observable, action } from "mobx";
import clone from 'lodash/cloneDeep';

class appStore {
  currRoute = "login";
  user = null;

  setRoute = route => this.currRoute = route;
  setUser = user => this.user = clone(user);
}

decorate(appStore, {
  currRoute: observable,
  user: observable,

  setRoute: action,
  setUser: action
});

export default new appStore();