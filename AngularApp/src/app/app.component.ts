import { Component, ViewChild } from '@angular/core';
import { GiphySavingService } from '../giphySaving.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  saved: boolean = false;
  giphyId: string[] = [ 'ZRrbwYCGzpjoY' ];

  constructor(private saveSvc: GiphySavingService) { }
}
