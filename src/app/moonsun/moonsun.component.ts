import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';

import SunCalc from "suncalc";
import { GeolocationService } from '../geolocation.service';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-moonsun',
  templateUrl: './moonsun.component.html',
  styleUrls: ['./moonsun.component.scss']
})
export class MoonsunComponent implements OnInit {

  times: Observable<any>;

  numDays = 365;

  error: string|undefined;

  columnsToDisplay = ['date', 'phase'];

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.times = this.geolocationService.getCurrentPosition()
      .pipe(flatMap(this.onLocationUpdate));
  }

  onLocationUpdate(position: Position): Observable<any> {
    return new Observable((observer) => {
      console.log('onLocationUpdate', position);

      const coords = position.coords;
      const curTimeMs = Date.now();
      for (let i = 0; i < this.numDays; i++) {
        const date = new Date(curTimeMs + i * MS_PER_DAY);
        observer.next({
          date,
          moontimes: SunCalc.getMoonTimes(date, coords.latitude, coords.longitude),
          moonPhase: SunCalc.getMoonIllumination(date),
          suntimes: SunCalc.getTimes(date, coords.latitude, coords.longitude)
        });
      }

    });
  }

  onError(error: Error) {
    this.error = error.message;
  }
}
