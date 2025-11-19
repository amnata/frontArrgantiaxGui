import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arrgantiax.app',
  appName: 'ArrGantiaxGui',
  webDir: 'dist/front-arrgantiax-gui/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;