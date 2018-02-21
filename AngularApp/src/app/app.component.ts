import { Component, ViewChild } from '@angular/core';
import { GiphySavingService } from '../giphySaving.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('testForm') itemForm: NgForm;

  constructor(private saveSvc: GiphySavingService) { }

  saveGiphy() {
    this.saveSvc.saveToDb(this.itemForm.value.userId, this.itemForm.value.giphyId);
  }
}
