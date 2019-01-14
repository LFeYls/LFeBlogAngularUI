import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'blog-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav= new EventEmitter<void>();
  constructor(

  ) { }

  ngOnInit() {
  }

}
