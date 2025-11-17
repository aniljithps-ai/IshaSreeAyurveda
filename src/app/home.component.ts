import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  ,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  @ViewChild('slides', { static: true }) slides!: ElementRef<HTMLElement>;
  activeFaq: number | null = null;

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  faqs = [
    { q: 'What is Ayurveda?', a: 'Ayurveda is a traditional system of medicine that promotes holistic healing through natural remedies, diet, and lifestyle practices.' },
    { q: 'Do treatments have side effects?', a: 'Ayurvedic treatments are generally safe and natural, but it\'s important to consult a qualified practitioner for personalized care.' },
    { q: 'How long does a therapy session last?', a: 'Most sessions last between 45 minutes to 1 hour, depending on the treatment type and individual needs.' },
    { q: 'What are the medicine shipment options within India and Outside?', a: 'We offer reliable and efficient shipment options for our Ayurvedic medicines both within India and internationally. Our domestic shipping partners ensure timely delivery across all regions in India. For international shipments, we collaborate with trusted global courier services to ensure your medicines reach you safely and promptly, no matter where you are located.' },
    { q: 'Do you offer consultations over phone or Whatsapp?', a: 'Yes, we do offer online consultation. Patient has to book the slots in advance for online consultation.' },
    { q: 'Is HomeCare service available?', a: 'Yes, we do offer doorstep consultations for your convenience. Our experienced practitioners can visit you at your home to provide personalized Ayurvedic consultations and treatments. Please note the following conditions:- Travel Allowance (TA) & Daily Allowance (DA): Additional charges for travel and daily allowances may apply based on the distance and duration of the consultation.- Safety of Therapist: We prioritize the safety of our therapists. Therefore, we request a safe and conducive environment for the consultation. Our therapists are trained to follow all necessary safety protocols to ensure a secure and comfortable experience for both parties.-Service Limitations: We strictly provide only legitimate Ayurvedic consultations and treatments. No illegal services are offered or tolerated.' }
  ];

  private scroll(amount: number) {
    if (!this.slides) return;
    this.slides.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }

  scrollLeft() { this.scroll(-this.slides.nativeElement.clientWidth); }
  scrollRight() { this.scroll(this.slides.nativeElement.clientWidth); }
}
