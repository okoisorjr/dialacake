// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //developmentIP: 'http://' + location.hostname + ':3000',
  //developmentIP: 'http://52.73.222.43:3000/yvette_baker/api/v1',
  developmentIP: 'http://localhost:3000/yvette_baker/api/v1',
  FLUTTER_PUBLIC_API_KEY: 'FLWPUBK_TEST-058f34601258b1c0978ddff041b7442c-X',
  FLUTTER_SECRET_API_KEY: 'FLWSECK_TEST-b1a0642238abdea69fc7aef976e2e9ab-X',
  AWS_ACCESS_KEY_ID: 'AKIAVXWYTVDTFGJCI6WN',
  AWS_ACCESS_SECRET_KEY: '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',
  AWS_BUCKET_NAME: 'dial-a-cake',
  AWS_S3_REGION: 'us-east-1',
  firebaseConfig: {
    apiKey: 'AIzaSyAbvoEERB0kWFjD5G2d14LaZxj6V5LiZwM',
    authDomain: 'dialacake-c7957.firebaseapp.com',
    projectId: 'dialacake-c7957',
    storageBucket: 'dialacake-c7957.appspot.com',
    messagingSenderId: '456891044602',
    appId: '1:456891044602:web:675604ad4f761036ba6f43',
    measurementId: 'G-3DJQ3BVLWB',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
