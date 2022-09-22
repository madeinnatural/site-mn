import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Submitable } from '../mn-form/mn-form.component';

@Component({
  selector: 'mn-button',
  templateUrl: './mn-button.component.html',
})
export class MnButtonComponent implements OnInit {

  @Input() submitable?: Submitable;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'light' | 'link' = 'primary';
  @Input() innerClass: string = "";
  @Input() size = "";  
  @Input() innerId = '';
  @Input() disabled = false;
  @Output() goClick = new EventEmitter<any>();

  
  public waiting = false;
  
  constructor() { }
  ngOnInit(): void {
  }

  press() {
     this.goClick.emit();
  }
  
  public click() {
     if (!this.waiting) {
        this.waiting = true;
        
        if (this.submitable) {
           this.submitable.submit().then(
              (ok: any) => {
                 if(ok){
                    this.waiting = false;
                 }
              }).catch(() => {
                 this.waiting = false;
              }
           );
        } else {
           this.waiting = false;
        }
     }
  }

}
