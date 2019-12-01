import { decorate, observable, action } from "mobx";
import clone from 'lodash/cloneDeep';

class appStore {
  currRoute = "search";
  user = null;

  search = {
    state: "",
    city: "",
    locality: ""
  }

  setRoute = route => this.currRoute = route;
  setUser = user => this.user = clone(user);

  setSearch = _search => {
    let search = clone(_search);
    for (let key in search) {
      if (key in this.search) {
        this.search[key] = search[key];
      }
    }
  }
}

decorate(appStore, {
  currRoute: observable,
  user: observable,
  search: observable,

  setRoute: action,
  setUser: action,
  setSearch: action
});

export default new appStore();