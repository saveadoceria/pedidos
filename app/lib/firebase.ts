import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
// 1. Importe o getFirestore
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyB3_xJf1GSEgjkEtrxb_taYTXJ8NIANUVQ",
  authDomain: "savea-doceria.firebaseapp.com",
  projectId: "savea-doceria",
  storageBucket: "savea-doceria.appspot.com",
  messagingSenderId: "320876567662",
  appId: "1:320876567662:web:5ec737d33559b204475a7f",
  measurementId: "G-8MNVG5DRP5"
};

const app = initializeApp(firebaseConfig);

export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 60000;
remoteConfig.defaultConfig = {
  loja_bloqueada: false,
  texto_aviso: ""
};

// 2. Exporte a constante db
export const db = getFirestore(app);