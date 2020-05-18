import { Component, Input, OnInit } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SunMoonDay } from '../models/SunMoonDay';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  private _dataSource : SunMoonDay[] | undefined;

  // use getter setter to define the property
  get dataSource(): SunMoonDay[] | undefined {
    return this._dataSource;
  }

  @Input()
  set dataSource(val: SunMoonDay[] | undefined) {
    this._dataSource = val;
    this._dataSource && this.parseData(this._dataSource);
  }

  data: any[] | undefined;

  view: any[] = [600, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {}

  ngOnInit(): void {

  }

  parseData(dataSource: SunMoonDay[]) {
    const moon = [], sun = [];
    for (let day of this.dataSource) {
      moon.push({
        name: day.date,
        value: day.moontimes.rise ? day.moontimes.rise.getTime() / 1000 : 0
      });
      sun.push({
        name: day.date,
        value: day.suntimes.sunrise.getTime() / 1000
      });
    }
    this.data = [
      {
        name: 'sun',
        series: sun
      },
      {
        name: 'moon',
        series: moon
      }
    ];
    console.log('parsedata', this.data);
  }

  onSelect(event) {
    console.log(event);
  }

}
