import { Notification as Toast } from 'rsuite';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
 apiKey: "AIzaSyCDQtUuyBjQ6hYH4lRGKKsVd8H8Ch-xkOQ",
  authDomain: "chat-web-app-920f7.firebaseapp.com",
  databaseURL: "https://chat-web-app-920f7-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-920f7",
  storageBucket: "chat-web-app-920f7.appspot.com",
  messagingSenderId: "687538669484",
  appId: "1:687538669484:web:e5beeedca20e766767dc09"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BISEZh24W0ufnBBprJKl_407784JWR2KKFJQAW3PPcxhqilMScfTQqGZsb0BnABW-tTmzlhFdzfoFxE0gS6azVo'
  );

  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useFunctionsEmulator('http://localhost:5001');
}
