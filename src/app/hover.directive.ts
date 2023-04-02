import { DOCUMENT } from '@angular/common';
import { Directive, OnInit, ElementRef, Inject, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  color: string = 'red';

  @Input() colornew: string = 'green';


  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document, private rendere: Renderer2) {
    console.log(this.element.nativeElement)

  }

  ngOnInit(): void {
    // this.element.nativeElement.style.backGroundColor = this.color
    this.rendere.setStyle(this.element.nativeElement, 'backgroundColor', 'red')
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.rendere.setStyle(this.element.nativeElement, 'backgroundColor', 'green')

  }

}
