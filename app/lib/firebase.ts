import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyCGL0sQhom7cQadEcJI2fpWLRUPK2kSRtQ",
  authDomain: "savea-doceria.firebaseapp.com",
  projectId: "savea-doceria",
  storageBucket: "savea-doceria.appspot.com",
  messagingSenderId: "320876567662",
  appId: "1:320876567662:web:5ec737d33559b204475a7f",
  measurementId: "G-8MNVG5DRP5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics e Remote Config
const analytics = getAnalytics(app);
export const remoteConfig = getRemoteConfig(app);

// Configuração para o Remote Config buscar novas regras a cada 1 minuto
remoteConfig.settings.minimumFetchIntervalMillis = 60000;