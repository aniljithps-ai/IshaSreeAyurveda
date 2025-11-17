import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [CommonModule, NgForOf]
})
export class AboutComponent {
  downloadFile(fileName: string): void {
    const link = document.createElement('a');
    link.href = `/${fileName}.pdf`;
    link.download = `${fileName}.pdf`;
    link.click();
  }

}
