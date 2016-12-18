import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home";
import {NoContentComponent} from "./components/no-content";
import {EventsComponent} from "./components/events/events";
import {HistoryComponent} from "./components/history/history";
import {ServicesComponent} from "./components/services/services";
import {AwardsComponent} from "./components/awards/awards";
import {OurMissionComponent} from "./components/our-mission/our-mission";
import {FaqComponent} from "./components/faq/faq";
import {ContactUsComponent} from "./components/contact-us/contact-us";
import {LoginComponent} from "./components/login/login.component";


export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventsComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'awards', component: AwardsComponent},
  {path: 'our-mission', component: OurMissionComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '**', component: NoContentComponent},
];
