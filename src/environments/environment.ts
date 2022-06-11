// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint:'https://aurora-heroka.herokuapp.com/',
  apiClient:'client/',
  apiProduct:'product/',
  apiShoppingCart:'shoppingcart/',
  apiImage:'image/',
  apiOrder:'order/',
  firebaseConfig:{
    apiKey: "AIzaSyAAe7YGAR4Nsitwrx8SCiNvrFTVdV73qKU",
    authDomain: "aurora-382b9.firebaseapp.com",
    projectId: "aurora-382b9",
    storageBucket: "aurora-382b9.appspot.com",
    messagingSenderId: "757963375288",
    appId: "1:757963375288:web:f8d076c03ed00b6e016a4d",
    measurementId: "G-MFHPKFDL5E"
  }
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
