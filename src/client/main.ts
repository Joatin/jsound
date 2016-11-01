import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

if (process.env.ENV === 'production') {
    enableProdMode();
}

document.addEventListener('WebComponentsReady', () => {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
});