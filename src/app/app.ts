import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
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
