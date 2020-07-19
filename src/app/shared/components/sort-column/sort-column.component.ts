import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sort-column',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

  @Input() name: string;
  @Input() sort: string;
  @Input() dir: string;
  @Input() current: string;

  @Output() onSortBy: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSort() {
    if (this.current !== this.sort) {
      this.dir = '';
      this.current = this.sort;
    }

    else {
      this.dir = this.dir === '' ? 'desc' : '';
      if (this.dir === '') {
        this.current = '';
      }
    }

    this.onSortBy.emit({ sort: this.current, dir: this.dir });
  }

  isSortBy(dir) {
    return this.sort === this.current && this.dir === dir;
  }

  get isCurrentSort() {
    return this.sort === this.current;
  }
}
