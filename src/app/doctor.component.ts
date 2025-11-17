import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  imports: [CommonModule]
})
export class DoctorComponent implements OnInit {
  activeDay: number | null = null;

  doctorId: string | null = null;
  doctor: any = {};

  doctors: Record<string, any> = {
    aishwarya: {
      name: 'Dr. Aishwarya Nair',
      qual: 'B.A.M.S, MD (Ayurveda)',
      reg: '26790',
      photo: '/doc1.jpeg',
      bio: 'Dr. Aishwarya Nair is a renowned Ayurvedic physician with over 6 years of experience in holistic healing. She specializes in Panchakarma therapy, herbal medicine, and lifestyle counseling. Her approach integrates classical Ayurvedic principles with modern wellness strategies.'
    },
    sreeranjini: {
      name: 'Dr. Sreeranjini MK',
      qual: 'B.A.M.S(Calicut University), PGDMH(IGNOU)',
      reg: '15813',
      photo: '/doc2.jpg',
      bio: 'Dr. Sreeranjini MK is a renowned Ayurvedic physician with over 6 years of experience in holistic healing. She specializes in Panchakarma therapy, herbal medicine, and lifestyle counseling. Her approach integrates classical Ayurvedic principles with modern wellness strategies.'
    }
  };

  constructor(route: ActivatedRoute) {
    this.doctorId = route.snapshot.paramMap.get('id');
    this.doctor = this.doctorId && this.doctors[this.doctorId] ? this.doctors[this.doctorId] : this.doctors['aishwarya'];

    // If Aishwarya's profile is loaded, update her availability
    if (this.doctorId === 'aishwarya') {
      this.timings = [
        { day: 'Monday', times: '2:00 PM — 06:00 PM' },
        { day: 'Tuesday', times: '2:00 PM — 06:00 PM' },
        { day: 'Wednesday', times: '2:00 PM — 06:00 PM' },
        { day: 'Thursday', times: '2:00 PM — 06:00 PM' },
        { day: 'Friday', times: '2:00 PM — 06:00 PM' },
        { day: 'Saturday', times: '2:00 PM — 06:00 PM' },
        { day: 'Sunday', times: 'Prior Appointment Only' }
      ];
    }
  }

  ngOnInit(): void {
    // Ensure the page is scrolled to top when this component is displayed
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for environments where window is not available
      (document.documentElement || document.body).scrollTop = 0;
    }
  }

  timings = [
    { day: 'Monday', times: '10:00 AM — 2:00 PM' },
    { day: 'Tuesday', times: '10:00 AM — 2:00 PM' },
    { day: 'Wednesday', times: '10:00 AM — 2:00 PM' },
    { day: 'Thursday', times: '10:00 AM — 2:00 PM' },
    { day: 'Friday', times: '10:00 AM — 2:00 PM' },
    { day: 'Saturday', times: '10:00 AM — 2:00 PM' },
    { day: 'Sunday', times: 'Prior Appointment Only' }
  ];

  toggleDay(i: number) {
    this.activeDay = this.activeDay === i ? null : i;
  }
}
