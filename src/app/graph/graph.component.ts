import { Component, Input, OnInit } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SunMoonDay } from '../models/SunMoonDay';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() dataSource : SunMoonDay[] | undefined;

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
    this.dataSource && this.parseData(this.dataSource);
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
  }

  onSelect(event) {
    console.log(event);
  }

}
