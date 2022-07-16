import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-airflight',
  templateUrl: './airflight.component.html',
  styleUrls: ['./airflight.component.scss'],
})
export class AirflightComponent implements OnInit {
  @Input() airFlight: any;

  @Input() tickets: any;

  getLogo(): string {
    return `./assets/images/${this.tickets.info.companyName}.svg`;
  }

  getActualTimeDuration(time: number): string {
    const date = new Date(time);
    return date.getHours() + 'ч ' + date.getMinutes() + 'м';
  }

  getActualTimeFlight(time: number): string {
    const date = new Date(time);
    return date.getHours() + ':' + date.getMinutes();
  }

  costAirFlight(): string {
    let showCost = 'Р';
    let costsAirFlight = this.tickets.price;
    while (costsAirFlight > 0) {
      showCost = (costsAirFlight % 1000) + ' ' + showCost;
      costsAirFlight = Math.floor(costsAirFlight / 1000);
    }
    return showCost;
  }

  amountTransfers(): string {
    if (this.tickets.info.stops.length > 1) {
      return this.tickets.info.stops.length + ' Пересадки';
    } else if (this.tickets.info.stops.length > 0) {
      return '1 Пересадка';
    } else {
      return 'Без пересадок';
    }
  }

  transferInformation(): string {
    return this.tickets.info.stops.join(', ');
  }

  constructor() {}

  ngOnInit(): void {}
}
