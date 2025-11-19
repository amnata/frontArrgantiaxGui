import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arrgantiax.app',
  appName: 'ArrGantiaxGui',
  webDir: 'dist/front-arrgantiax-gui/browser',
  server: {
    androidScheme: 'https',
    url: 'http://10.160.0.186:4200',  
    cleartext: true
  }
};

export default config;