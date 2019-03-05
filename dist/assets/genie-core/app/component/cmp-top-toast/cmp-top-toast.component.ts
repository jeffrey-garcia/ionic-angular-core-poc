import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { CmpTopToastService } from './cmp-top-toast.service';

@Component({
  selector: 'cmp-top-toast',
  templateUrl: './cmp-top-toast.component.html',
  styleUrls: ['./cmp-top-toast.component.scss']
})
export class CmpTopToastComponent implements OnInit {
  @ViewChild('component', { read: ViewContainerRef }) viewContainerRef?: ViewContainerRef;    

  constructor(
    public cmpTopToastService:CmpTopToastService,
  ) {
    console.log(`creating: ${this.constructor.name}`)
  }

  ngOnInit() {
    this.cmpTopToastService.setViewContainerRef(this.viewContainerRef);
  }
  
}
