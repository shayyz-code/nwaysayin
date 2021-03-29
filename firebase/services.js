import { firebaseAuth, firebaseDatabase } from './firebase';

const db = firebaseDatabase.ref('/lists');

class Services {
  getAll(key) {
    return db.child(key);
  }

  add(data) {
    return db.child(data.case).push(data);
  }

  addReport(data, report) {
    return db.child(data.case).child(data.key).child('reports').push(report);
  }

  update(key, data) {
    return db.child(data.case).child(key).update(data);
  }

  delete(key, data) {
    return db.child(data.case).child(key).remove();
  }

  signIn(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return firebaseAuth.signOut();
  }
}

export default new Services();
