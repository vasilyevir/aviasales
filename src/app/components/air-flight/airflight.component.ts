import { Component, Input, OnInit } from '@angular/core';
import { getActualTime, numWord } from '../../utils/helpers';

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

  getActualTimeFlight(time: number, type: string): string {
    const date = new Date(time);
    return getActualTime(date, type);
  }

  costAirFlight(): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(this.tickets.price);
  }

  amountTransfers(): string {
    return (
      this.tickets.info.stops.length +
      ' ' +
      numWord(this.tickets.info.stops.length, ['пересадок', 'пересадка', 'пересадки'])
    );
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
