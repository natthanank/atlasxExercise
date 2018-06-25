import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lat-long',
  templateUrl: './lat-long.component.html',
  styleUrls: ['./lat-long.component.scss']
})
export class LatLongComponent implements OnInit {

  @Output() lalong = new EventEmitter<Array<number>>();
 
  constructor() { }

  ngOnInit() {
  }

  getLaLong(lalong) {
    console.log("in Get Lat Long : " + lalong[0] + " " + lalong[1]);
    this.lalong.emit(lalong);
  }

}
