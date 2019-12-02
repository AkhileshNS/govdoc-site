import React from 'react';
import { observer, inject } from 'mobx-react';

import firebase from 'global/firebase';

const Controller = ({ setRoute, setUser, addPending, changePending, removePending, addToChain }) => {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('govdoc/users')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value')
          .then(snap => {
            if (snap.exists()) {
              let type = snap.val().type;
              setUser({
                name: snap.val().name,
                email: snap.val().email,
                url: snap.val().url,
                mobile: 'mobile' in snap.val() ? snap.val().mobile : null,
                type
              });

              if (type === 'approver') {
                setRoute('dashboard');
              } else {
                setRoute('search');
              }
            }
          })
          .catch(err => console.log(err));
      }
    });

    const pendingRef = firebase.database().ref('govdoc/pending');
    pendingRef.on('child_added', snap => addPending({key: snap.key, ...snap.val()}));
    pendingRef.on('child_changed', snap => changePending({key: snap.key, ...snap.val()}));
    pendingRef.on('child_removed', snap => removePending(snap.key));

    const chainRef = firebase.database().ref('govdoc/chain');
    chainRef.on('child_added', snap => addToChain({key: snap.key, ...snap.val()}));
  }, []);

  return null;
};

export default inject(({ appStore }) => ({
  setRoute: appStore.setRoute,
  setUser: appStore.setUser,
  addPending: appStore.addPending,
  changePending: appStore.changePending,
  removePending: appStore.removePending,
  addToChain: appStore.addToChain
}))(observer(Controller));
