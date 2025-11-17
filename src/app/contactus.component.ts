import { Component,OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  // form model
  name = '';
  phone = '';
  email = '';
  message = '';

  // simple UI state
  submitting = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch { (document.documentElement || document.body).scrollTop = 0; }
  }

  async submit(e?: Event) {
    if (e) e.preventDefault();
    this.error.set(null);
    this.success.set(null);
    if (!this.name || !this.email || !this.message) { this.error.set('Please fill required fields'); return; }
    this.submitting.set(true);
    try {
      const payload = { name: this.name, phone: this.phone, email: this.email, message: this.message };
      const res: any = await this.http.post('/api/send-contact', payload).toPromise();
      if (res && res.ok) {
        this.success.set('Message sent successfully');
        this.name = this.email = this.phone = this.message = '';
      } else {
        this.error.set('Sending failed');
      }
    } catch (err: any) {
      console.error('send error', err);
      this.error.set(err?.error?.error || 'Sending failed');
      this.name = this.email = this.phone = this.message = '';
    } finally { this.submitting.set(false); }
  }
}
