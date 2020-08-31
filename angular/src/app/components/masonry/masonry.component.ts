import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements OnInit {
  ngOnInit(): void {
  }
  @ViewChild('masonry', { static: true }) masonry: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    const numCols = 3;
    const colHeights = Array(numCols).fill(0);
    Array.from(this.masonry.nativeElement.children).forEach((child: any, i) => {
      const order = i % numCols;
      this.renderer.setStyle(child, 'order', order);
      colHeights[order] += parseFloat(child.clientHeight);
    })
    this.renderer.setStyle(this.masonry.nativeElement, 'height', `${Math.max(...colHeights)}px`)
  }

}



