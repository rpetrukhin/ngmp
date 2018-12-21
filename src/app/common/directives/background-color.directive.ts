import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appBackgroundColor]',
})
export class BackgroundColorDirective implements OnInit {
  @Input('appBackgroundColor') creationDate: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const today = moment();
    const fourteenDaysAgo = moment().subtract(14, 'days');
    const date = moment(this.creationDate);

    const isSameOrBeforeToday = moment(date).isSameOrBefore(today);
    const isSameOrAfterFourteenDaysAgo = moment(date).isSameOrAfter(
      fourteenDaysAgo
    );

    if (isSameOrBeforeToday && isSameOrAfterFourteenDaysAgo) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'rgba(231, 120, 131, 0.1)'
      );
    } else if (!isSameOrBeforeToday) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'rgba(52, 183, 222, 0.1)'
      );
    }
  }
}
