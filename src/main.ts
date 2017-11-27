import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

import './styles.scss'

if (environment.production) {
  enableProdMode();
  window.console.log = function () { }
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
    console.info('HMR已啟用');
  } else {
    console.error('HMR未啟用 , 請添加 --hmr , example : ng serve --hmr -e=hmr');
  }
} else {
  bootstrap();
}
