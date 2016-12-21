import {Directive, ElementRef, AfterViewInit} from "@angular/core";
/**
 * Created by mharkins on 6/19/16.
 */
@Directive({
  inputs: ['fadeIn'],
  selector: '[fadeIn]'
})
export class FadeInDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const that = this;

    this.el.nativeElement.classList.add('ng-hide-remove');
    this.el.nativeElement.onload = () => {
      console.log('Loaded');
      that.el.nativeElement.classList.add('ng-hide-add');
    };
  }
}
