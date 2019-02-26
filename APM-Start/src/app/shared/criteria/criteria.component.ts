import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {
  listFilter: string;
  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

}
