
export interface SunMoonDay {
  date: Date;
  moontimes: {
    rise: Date;
    set: Date;
  };
  moonPhase: {
    fraction: number;
    phase: number;
    angle: number;
  };
  suntimes: {
    solarNoon: Date;
    nadir: Date;
    sunrise: Date;
    sunset: Date;
    sunriseEnd: Date;
    sunsetStart: Date;
    dawn: Date;
    dusk: Date;
    nauticalDawn: Date;
    nauticalDusk: Date;
    nightEnd: Date;
    night: Date;
    goldenHourEnd: Date;
    goldenHour: Date;
  };
}
