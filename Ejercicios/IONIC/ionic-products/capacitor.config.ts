import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arturober.ionic.products',
  appName: 'Ionic Products',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    "allowMixedContent": true
  },
  server: {
    "cleartext": true,
    "hostname": "localhost"
  }
};

export default config;
