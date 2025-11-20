import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('IshaSreeAyurveda');
  // mobile nav open state
  protected readonly isNavOpen = signal(false);
  // track which menu is selected for items that don't use routerLink
  protected readonly selectedMenu = signal('');
  
  protected toggleNav() {
    this.isNavOpen.update(v => !v);
  }

  constructor(private router: Router) {
    this.selectedMenu.set('Home');

    // keep selectedMenu in sync with the current route so the active
    // menu highlights correctly when navigating (including browser
    // back/forward or programmatic navigation)
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        const url = ev.urlAfterRedirects || ev.url;
        if (url === '/' || url === '') {
          this.selectedMenu.set('Home');
        } else if (url.startsWith('/about')) {
          this.selectedMenu.set('About');
        } else if (url.startsWith('/treatments')) {
          this.selectedMenu.set('Ayurvedic Treatments');
        } else if (url.startsWith('/rejuvination')) {
          this.selectedMenu.set('Rejuvenation');
        } else if (url.startsWith('/packages')) {
          this.selectedMenu.set('Packages');
        } else if (url.startsWith('/contact')) {
          this.selectedMenu.set('Contact');
        } else if (url.startsWith('/doctor')) {
          this.selectedMenu.set('Ayurvedic Treatments');
        } else {
          this.selectedMenu.set('');
        }
      }
    });
  }

  protected selectMenu(name: string) {
    this.selectedMenu.set(name);
    // close mobile nav when a menu is selected
    this.isNavOpen.set(false);
  }

  protected isRouteActive(path: string) {
    return this.router.url === path;
  }

  // Show offers popup by default on page load
  protected readonly showOffers = signal(true);

  protected closeOffers() {
    this.showOffers.set(false);
  }
}
