import { decorate, observable, action } from "mobx";
import clone from 'lodash/cloneDeep';

class appStore {
  currRoute = "list";
  user = null;

  // User
  search = {
    state: "",
    city: "",
    locality: ""
  }
  approver = null;
  approvers = [];

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
  addApprover = approver => this.approver.push(clone(approver));
}

decorate(appStore, {
  currRoute: observable,
  user: observable,
  search: observable,
  approver: observable,
  approvers: observable,

  setRoute: action,
  setUser: action,
  setSearch: action,
  setApprover: action,
  addApprover: action
});

export default new appStore();