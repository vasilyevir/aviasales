import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-airflight',
  templateUrl: './airflight.component.html',
  styleUrls: ['./airflight.component.scss']
})
export class AirflightComponent implements OnInit {
  @Input() airFlight: any;

  costAirFlight(): string {
    let showCost = 'Р';
    let costsAirFlight = this.airFlight.cost
    while (costsAirFlight > 0) {
      showCost = costsAirFlight % 1000 + ' ' + showCost
      costsAirFlight = Math.floor(costsAirFlight / 1000)
    }
    return showCost;
  }

  amountTransfers(): string {
    if (this.airFlight.transfers.length > 1) {
      return this.airFlight.transfers.length + ' Пересадки'
    } else if (this.airFlight.transfers.length > 0) {
      return '1 Пересадка'
    } else {
      return 'Без пересадок'
    }
  }

  transferInformation(): string {
    return this.airFlight.transfers.join(', ')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
