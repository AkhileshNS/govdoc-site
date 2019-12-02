import { decorate, observable, action } from "mobx";
import clone from 'lodash/cloneDeep';

class appStore {
  currRoute = "dashboard";
  user = null;

  // User
  search = {
    state: "",
    city: "",
    locality: ""
  }
  approver = null;

  // Common
  pending = [{
    name: "Akhilesh NS",
    email: "nsakhilesh02@gmail.com",
    mobile: "9611129344",
    url: "https://firebasestorage.googleapis.com/v0/b/shoppinglistplusplus-nsa.appspot.com/o/govdoc%2FLab%20record%20(4).pdf?alt=media&token=7d32e991-dbe8-4dd0-9e2b-61ee659dae99"
  }];

  setRoute = route => this.currRoute = route;
  setUser = user => this.user = clone(user);

  // User
  setSearch = _search => {
    let search = clone(_search);
    for (let key in search) {
      if (key in this.search) {
        this.search[key] = search[key];
      }
    }
  }
  setApprover = approver => this.approver = clone(approver);
  
  // Common
  addPending = document => this.pending.push(clone(document));
  removePending = i => this.pending.splice(i, 1);
}

decorate(appStore, {
  currRoute: observable,
  user: observable,
  search: observable,
  approver: observable,

  setRoute: action,
  setUser: action,
  setSearch: action,
  setApprover: action
});

export default new appStore();