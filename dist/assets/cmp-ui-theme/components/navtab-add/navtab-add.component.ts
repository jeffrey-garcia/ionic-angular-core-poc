import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cmp-navtab-add',
  templateUrl: './navtab-add.component.html',
  styleUrls: ['./navtab-add.component.scss']
})
export class NavtabAddComponent implements OnInit {
  @Input() open:boolean;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() options:any[];
  optionsMargintop = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.optionsMargintop = this.options.map((value,idx)=>{
      var margintop = -140;
      var middle = Math.ceil(this.options.length/2);
      return { 
        width: `${100/(this.options.length+1)}vw`,
        'margin-top': (idx < middle)? `${idx * margintop}px` : `${(this.options.length-idx-1) * margintop}px`,
        'transition-delay': `${idx*.1}s`,
      };
    });
  }

  close() {
    this.open = false;
    this.openChange.emit(this.open);
  }

  button_click(idx){
    this.change.emit(this.options[idx]);
    this.close();
  }

}
