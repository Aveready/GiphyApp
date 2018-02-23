import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { GiphySavingService } from '../giphySaving.service';
import { GiphyRetrievalService } from '../giphyRetrieval.service';
import { SearchService } from '../search.service';
import { UserAddingService } from '../userAdding.service';
import { ImageCardComponent } from './components/image-card.component';
import { TopBarComponent } from './Components/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCardComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [GiphySavingService, GiphyRetrievalService, SearchService, CookieService, UserAddingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
