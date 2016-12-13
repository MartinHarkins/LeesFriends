import {Routes} from '@angular/router';
import {HomeComponent} from './components/home';
import {NoContentComponent} from './components/no-content';
import {EventsComponent} from "./components/events/events";
import {HistoryComponent} from "./components/history/history";


export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'history', component: HistoryComponent},
  {path: '**', component: NoContentComponent},
];
