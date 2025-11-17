import { Component, ViewChild, ElementRef, AfterViewInit, HostListener,OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-karkidaka',
  templateUrl: './karkidaka.component.html',
  styleUrls: ['./karkidaka.component.css'],
  imports: [CommonModule, NgForOf]
})
export class KarkidakaComponent implements OnInit {
  ngOnInit(): void {
    // Ensure the page is scrolled to top when this component is displayed
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for environments where window is not available
      (document.documentElement || document.body).scrollTop = 0;
    }
  }

}


