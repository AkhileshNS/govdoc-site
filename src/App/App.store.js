import { decorate, observable, action } from "mobx";
import clone from 'lodash/cloneDeep';

class appStore {
  currRoute = "login";
  user = null;

  // User
  search = {
    state: "",
    city: "",
    locality: ""
  }
  approver = null;

  // Common
  pending = [];
  chain = [];

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
  changePending = document => {
    let index = -1;
    for (let i in this.pending) {
      if (this.pending[i].key===document.key) {
        index = i;
      }
    }
    if (index!==-1) {
      this.pending[index] = clone(document);
    }
  };
  removePending = key => {
    let index = -1;
    for (let i in this.pending) {
      if (this.pending[i].key===key) {
        index = i;
      }
    }
    if (index!==-1) {
      this.pending.splice(index, 1);
    }
  };
  addToChain = document => this.chain.push(clone(document));
}

decorate(appStore, {
  currRoute: observable,
  user: observable,
  search: observable,
  approver: observable,
  pending: observable,
  chain: observable,

  setRoute: action,
  setUser: action,
  setSearch: action,
  setApprover: action,
  addPending: action,
  changePending: action,
  removePending: action,
  addToChain: action
});

export default new appStore();