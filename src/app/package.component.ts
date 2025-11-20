import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  imports: [CommonModule]
})
export class PackageComponent {
  downloadFile(fileName: string): void {
    const link = document.createElement('a');
    link.href = `/${fileName}.pdf`;
    link.download = `${fileName}.pdf`;
    link.click();
  }

}
