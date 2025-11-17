import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css'],
  imports: [CommonModule, NgForOf]
})
export class TreatmentsComponent implements OnInit {
  @ViewChild('slides', { static: true }) slides!: ElementRef<HTMLElement>;
  @ViewChild('slidesTrack', { static: true }) slidesTrack!: ElementRef<HTMLElement>;

  // Active overlay index (only one open at a time)
  activeIndex: number | null = null;
  treatmentId: string | null = null;
  // Twelve treatment items (use existing images where possible)
  items = [
    { img: '/abhyanga.jpg', title: 'Abhyanga', desc: 'Abhyangam is the traditional Ayurvedic full body treatment performed using medicated herbal oils in long flowing strokes. It helps in lymphatic drainage, reduces fatigue, prevents aging while mitigating the aggravated vata dosa.' },
    { img: '/shirodhara.jpg', title: 'Shirodhara', desc: 'Shirodhara is an ayurvedic healing technique of slow rhythmic dipping of medicated herbal oil on the forehead. It is effective in : Insomnia, Enhances cognitive abilities, Relieves stress, calms the mind and body.' },
    { img: '/pizhichil.jpg', title: 'Pizhichil', desc: 'Pizhichil is a traditional ayurveda treatment practiced in Kerala, in which linen dipped in warm ayurveda oil is squeezed over the body with long strokes. Beneficial in relievingmuscle spasm, Calming body and mind. It is used in the treatment of arthritis, muscular atrophy and degenerative nerve disorders.' },
    { img: '/podikizhi.jpg', title: 'Podi Kizhi', desc: 'Podi kizhi is a linen poultice prepared out of carefully curated herbal powders. The poultice is applied on the body as dry heat or after dipping in warm medicated oil. This fomentation treatment is effective in : Reducing degeneration, Muscle spasm, Low back ache, Arthritis & Joint pains and alleviates swelling.' },
    { img: '/udvarthanam.jpg', title: 'Udwarthanam', desc: 'Udwarthanam is an Ayurveda full body treatment using dry herbal powders. In this therapy, herbal powder is scrubbed on the body, in the direction opposite to that of body hairs. This opens the fine pores in the body and cleanse them while improving circulation and lymphatic drainage. This is effective in reducing cellulite, kapha and fat from the body.' },
    { img: '/mukhalepam.jpg', title: 'Mukha Lepam', desc: 'Mukha lepam is a comprehensive treatment with stimulation of marma points on face, hands and feet. This treatment includes  gentle cleansing of face, neck and shoulder followed by nourishing therapy with Njavara rice and traditionally used herbal powders.' },
    { img: '/elakizhi.jpg', title: 'Ela Kizhi', desc: 'Ela kizhi is a herbal poultice containing medicinal leaves, turmeric, lemon and other herbal powders. In this full body treatment kizhi or pouch is applied on the body after dipping in warm medicated oil. This treatment is effective in : Stimulating nerves, Reducing swelling, Relieving stress, Relieving Joint pains and Muscle spasms.' },
    { img: '/narangakizhi.jpg', title: 'Naranga Kizhi', desc: 'Naranga kizhi is a linen poultice curated with lemon and medicinal herbs. Naranga kizhi is applied on the body after dipping in warm medicated oil. This is highly effective in: Relieving muscle spasm, improving circulation and is anti-inflammatory.' },
    { img: '/njavarakizhi.jpg', title: 'Njavara Kizhi', desc: 'Njavara kizhi is a linen poultice containing medicated Njavara rice. In this treatment the pouch is dipped in warm medicated milk and applied on the whole body in long strokes. ' },
    { img: '/pichu.jpg', title: 'Pichu', desc: 'Pichu is application of cotton dipped in warm medicated oil, on the part of the body where healing is required. This treatment is anti-inflammatory, cures acute pain, injury to ligaments, tendons or muscles.' },
    { img: '/swedanam.jpg', title: 'Swedanam', desc: 'Swedanam is an ayurveda fomentation therapy with steam. This treatment opens pores of the skin for perspiration and detoxification.' }
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
