import { decorate, observable, action } from "mobx";

class appStore {
  currRoute = "login";

  setRoute = route => this.currRoute = route;
}

decorate(appStore, {
  currRoute: observable,

  setRoute: action
});

export default new appStore();