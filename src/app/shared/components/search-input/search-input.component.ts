import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @Input() search = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onSearchKeyUp: EventEmitter<string> = new EventEmitter();
  @Output() onSearchChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onHandleSearch() {
    this.onSearch.emit(this.search);
  }

  onSearchKeypress(event) {
    this.onHandleSearch();
  }

  onSearchDbKeyUp(e) {
    this.onSearchKeyUp.emit(this.search);
  }

  onSearchChg(e) {
    this.onSearchChange.emit(this.search);
  }

  reset() {
    this.search = '';
  }
}
