import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GiphySavingService} from '../giphySaving.service'
import { GiphyRetrievalService } from '../giphyRetrieval.service';
import { ImageCardComponent } from './components/image-card.component';
import { TopBarComponent } from './Components/top-bar.component'

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
    ReactiveFormsModule
  ],
  providers: [ GiphySavingService, GiphyRetrievalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
