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
    'sunset',
    'proximity'
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
      const suntimes = SunCalc.getTimes(date, coords.latitude, coords.longitude);
      const moontimes = SunCalc.getMoonTimes(
        date,
        coords.latitude,
        coords.longitude
      );
      const proximity = moontimes.rise ? (suntimes.sunset.getTime() - moontimes.rise.getTime()) : undefined;

      result.push({
        date,
        moontimes,
        moonPhase: SunCalc.getMoonIllumination(date),
        suntimes,
        proximity
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

  formatMs(ms: number | undefined) {
    if (ms === undefined) {
      return '';
    } else {
      const minutes = ms / 1000 / 60;
      if (minutes > 60) {
        return `${(minutes / 60).toFixed(1)} hours`
      } else {
        return `${Math.round(minutes)} mins`
      }
    }
  }

  getMoonShadowStyle(moonPhase: any) {
    const f = moonPhase.fraction;
    let offset = ((moonPhase.phase - 0.5) * 2); // 0.5: full mooon. 0: new (waxing), 1: new (waning)

// console.log('getMoonShadowStyle : ' + offset, moonPhase);

    return `left: ${offset * 100}%`;
  }

  getProximityGraphStyle(proximityMs: number | undefined) {
    if (proximityMs === undefined) {
      return 'visibility: invisible';
    } else {
      return `width: ${Math.abs(proximityMs / MS_PER_DAY) * 100}%`;
    }
  }
}
