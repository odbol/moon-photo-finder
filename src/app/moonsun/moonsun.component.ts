import { Component, OnInit } from '@angular/core';

import SunCalc from 'suncalc';
import { GeolocationService } from '../geolocation.service';

import { SunMoonDay } from '../models/SunMoonDay';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-moonsun',
  templateUrl: './moonsun.component.html',
  styleUrls: ['./moonsun.component.scss'],
})
export class MoonsunComponent implements OnInit {
  times: SunMoonDay[] | undefined;

  numDays = 365;

  error: string | undefined;

  columnsToDisplay = [
    'date',
    'phase',
    'moonrise',
    'moonset',
    'sunrise',
    'sunset'
  ];

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.geolocationService.getCurrentPosition().subscribe({
      next: this.onLocationUpdate.bind(this),
      error: this.onError.bind(this),
    });
  }

  onLocationUpdate(position: Position) {
    console.log('onLocationUpdate', position);

    const coords = position.coords;
    const curTimeMs = Date.now();
    const result = [];
    for (let i = 0; i < this.numDays; i++) {
      const date = new Date(curTimeMs + i * MS_PER_DAY);
      result.push({
        date,
        moontimes: SunCalc.getMoonTimes(
          date,
          coords.latitude,
          coords.longitude
        ),
        moonPhase: SunCalc.getMoonIllumination(date),
        suntimes: SunCalc.getTimes(date, coords.latitude, coords.longitude),
      });
    }

    console.log('onLocationUpdate', result);
    this.times = result;
  }

  onError(error: Error) {
    this.error = error.message;
  }

  formatTime(date: Date) {
    return date && date.toLocaleTimeString();
  }
}
