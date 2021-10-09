import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})

export class AddBookmarkComponent implements OnInit {

  showValidationErrors: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {

  }

}
