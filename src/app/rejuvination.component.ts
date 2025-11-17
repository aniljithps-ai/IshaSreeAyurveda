import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-rejuvination',
  templateUrl: './rejuvination.component.html',
  styleUrls: ['./rejuvination.component.css'],
  imports: [CommonModule, NgForOf]
})
export class RejuvinationComponent implements OnInit {
  @ViewChild('slides', { static: true }) slides!: ElementRef<HTMLElement>;
  @ViewChild('slidesTrack', { static: true }) slidesTrack!: ElementRef<HTMLElement>;

  // Active overlay index (only one open at a time)
  activeIndex: number | null = null;
  treatmentId: string | null = null;
  // Twelve treatment items (use existing images where possible)
  items = [
    { img: '/headmasssage.jpg', title: 'Head Massage', desc: 'A head massage, or scalp massage, is a therapeutic technique focusing on the head, scalp, neck, and shoulders to relieve stress and tension.' },
    { img: '/deeptissue.jpg', title: 'Deep Tissue Massage', desc: 'Deep tissue massage is a therapeutic technique that uses slow, deep strokes and firm pressure to target the inner layers of muscle and connective tissue.' },
    { img: '/ishasreefacial.jpg', title: 'IshaSree Facial', desc: 'IshaSree facial is a multi-step skin treatment that cleanses, exfoliates, hydrates, and moisturizes the face to improve its appearance and health.' },
    { img: '/footmassage.png', title: 'Foot Reflexology', desc: 'Foot reflexology is a therapeutic technique that involves applying pressure to specific points on the feet to promote relaxation and healing in other parts of the body.' },
    { img: '/neckshoulder.jpg', title: 'Neck Shoulder Relaxation', desc: 'Neck and shoulder relaxation therapy focuses on relieving tension and pain in the neck and shoulder areas through various techniques, including massage and stretching.' }
  ];


  ngOnInit(): void {
    this.calculatePages();
    // Ensure the page is scrolled to top when this component is displayed
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for environments where window is not available
      (document.documentElement || document.body).scrollTop = 0;
    }
  }

  private scroll(amount: number) {
    if (!this.slides) return;
    this.slides.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }

  // --- New paging logic (dots) ---
  currentPage = 0;
  pages: number[] = [];
  cardsPerPage = 4;
  selected: { img: string; title: string; desc: string } | null = null;

  ngAfterViewInit(): void {
    this.calculatePages();
    // ensure track is positioned correctly
    this.updateTrack();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatePages();
    this.goToPage(this.currentPage);
  }

  private calculatePages() {
    const containerWidth = this.slides.nativeElement.clientWidth;
    // adjust cardsPerPage based on breakpoints
    if (containerWidth >= 1100) this.cardsPerPage = 4;
    else if (containerWidth >= 800) this.cardsPerPage = 3;
    else if (containerWidth >= 480) this.cardsPerPage = 2;
    else this.cardsPerPage = 1;

    const totalPages = Math.ceil(this.items.length / this.cardsPerPage);
    this.pages = Array.from({ length: totalPages });
    if (this.currentPage >= totalPages) this.currentPage = totalPages - 1;
  }

  private updateTrack() {
    if (!this.slidesTrack) return;
    const shift = -this.currentPage * this.slides.nativeElement.clientWidth;
    this.slidesTrack.nativeElement.style.transform = `translateX(${shift}px)`;
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateTrack();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.updateTrack();
    }
  }

  goToPage(idx: number) {
    if (idx < 0 || idx >= this.pages.length) return;
    this.currentPage = idx;
    this.updateTrack();
  }


  selectItem(i: number) {
    // toggle selected
    const item = this.items[i];
    if (!item) return;
    this.selected = this.selected === item ? null : item;
  }


  toggleOverlay(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }
}
