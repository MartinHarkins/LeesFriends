import "@angular/compiler";
import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, PreloadAllModules} from "@angular/router";
// import {removeNgStyles, createNewHosts, createInputTransfer} from "@angularclass/hmr";
import {RestangularModule} from "ngx-restangular";
// UI
import {AgmCoreModule} from "@agm/core";
/*
 * Platform and Environment providers/directives/pipes
 */
// import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
// App is our top level component
import {AppComponent} from "./app.component";
import {APP_RESOLVER_PROVIDERS} from "./app.resolver";
import {AppState, InternalStateType} from "./app.service";
import {HomeComponent} from "./components/home";
import {NoContentComponent} from "./components/no-content";
import {OurMissionComponent} from "./components/our-mission/our-mission";
import {HeaderComponent} from "./components/header/header";
import {HistoryComponent} from "./components/history/history";
import {ServicesComponent} from "./components/services/services";
import {ServiceItemComponent} from "./components/service-item/service-item";
import {AwardsComponent} from "./components/awards/awards";
import {FaqComponent} from "./components/faq/faq";
import {ContactUsComponent} from "./components/contact-us/contact-us";
import {AdminModule} from "./admin/admin.module";
import {EventsModule} from "./components/events/events.module";
import {LoginComponent} from "./components/login/login.component";
import {PublicService} from "./services/public.service";
import {EventsComponent} from "./components/events/events.component";
import {FadeInDirective} from "./directives/fade-in";
import {FooterComponent} from "./components/footer/footer";
import {environment as env} from "../environments/environment";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HistoryComponent,
    AwardsComponent,
    OurMissionComponent,
    EventsComponent,
    FaqComponent,
    ServicesComponent,
    ServiceItemComponent,
    ContactUsComponent,
    NoContentComponent,
    FadeInDirective
  ],
  imports: [ // import Angular's modules
    AdminModule,
    EventsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({apiKey: env.GOOGLE_MAP_API_KEY}),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    RestangularModule.forRoot((restangularProvider) => {
      // API_URL is declared in /config/webpack.{env}.js
      restangularProvider.setBaseUrl(env.API_URL);
      restangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });
      // Server returns _.id
      restangularProvider.setRestangularFields({
        id: '_id'
      });
    })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    PublicService
  ]
})
export class AppModule {}

