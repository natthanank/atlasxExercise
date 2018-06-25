import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() index = new EventEmitter<number>();
  @Input() resultList;

  constructor() { }

  ngOnInit() {
  }

  rowClick(index: number) {
    this.index.emit(index);
  }

}
