import React from 'react';
import {observer, inject} from 'mobx-react';

import firebase from 'global/firebase';

const Controller = ({setRoute, setUser}) => {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref("govdoc/users/" + user.email)
        .once('value')
        .then(snap => {
          if (snap.exists()) {
            let type = snap.val().type;
            setUser({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              url: user.photoURL,
              type
            });

            if (type === "approver") {
              setRoute("dashboard");
            } else {
              setRoute("search");
            }
          }
        })
      }
    })
  }, []);
  
  return null;
}

export default inject(({appStore}) => ({
  setRoute: appStore.setRoute,
  setUser: appStore.setUser
}))(observer(Controller));