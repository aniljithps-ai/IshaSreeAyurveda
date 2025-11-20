import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
		{ path: '', component: HomeComponent },
			{ path: 'doctor/:id', loadComponent: () => import('./doctor.component').then(m => m.DoctorComponent) },
			{ path: 'treatments', loadComponent: () => import('./treatments.component').then(m => m.TreatmentsComponent) },
			{ path: 'rejuvination', loadComponent: () => import('./rejuvination.component').then(m => m.RejuvinationComponent) },
			{ path: 'about', loadComponent: () => import('./about.component').then(m => m.AboutComponent) },
			{ path: 'packages', loadComponent: () => import('./package.component').then(m => m.PackageComponent) },
			{ path: 'contact', loadComponent: () => import('./contactus.component').then(m => m.ContactusComponent) },
			{ path: 'karkidaka', loadComponent: () => import('./karkidaka.component').then(m => m.KarkidakaComponent) },
	{ path: '**', redirectTo: '' }
];
