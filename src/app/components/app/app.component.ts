import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Airflight } from '../../Types/Airflight';
import { Filter } from '../../Types/Filter';

const airFlights: Array<Airflight> = [
  {
    cost: 13400,
    companyName: 's7',
    companyLogo: './assets/images/s7.svg',
    travel: 'MOW – HKT',
    startTravel: '10:45',
    endTravel: '8.00',
    timeInTravel: '21ч 15м',
    transfers: [],
  },
  {
    cost: 13400,
    companyName: 's7',
    companyLogo: './assets/images/s7.svg',
    travel: 'MOW – HKT',
    startTravel: '10:45',
    endTravel: '8.00',
    timeInTravel: '21ч 15м',
    transfers: ['HKG', 'JNB'],
  },
  {
    cost: 13400,
    companyName: 's7',
    companyLogo: './assets/images/s7.svg',
    travel: 'MOW – HKT',
    startTravel: '10:45',
    endTravel: '8.00',
    timeInTravel: '21ч 15м',
    transfers: ['HKG'],
  },
];

const filters: Array<Filter> = [
  {
    name: 'amountTransfer',
    title: 'Количество пересадок',
    type: 'checkbox',
    value: [
      {
        name: 'Без пересадок',
        value: '0',
      },
      {
        name: '1 Пересадка',
        value: '1',
      },
      {
        name: '2 Пересадки',
        value: '2',
      },
      {
        name: '3 Пересадки',
        value: '3',
      },
    ],
  },
  {
    name: 'company',
    title: 'Компания',
    type: 'radio',
    value: [
      {
        name: 'Все',
        value: 'All',
      },
      {
        name: 'S7 Airlines',
        value: 'S7',
      },
      {
        name: 'XiamenAir',
        value: 'Xiamen',
      },
    ],
  },
  {
    name: 'popularFilter',
    type: 'radio',
    value: [
      {
        name: 'Самый дешевый',
        value: 'Cheaper',
      },
      {
        name: 'Самый быстрый',
        value: 'Faster',
      },
      {
        name: 'Оптимальный',
        value: 'Optimal',
      },
    ],
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  airFlights: Array<Airflight> = airFlights;

  filters: Array<Filter> = filters;

  title = 'Aviasales';

  filterForm: FormGroup;

  subject: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      amountTransfer: new FormControl([]),
      company: new FormControl('All'),
      popularFilter: new FormControl('Cheaper'),
    });
  }

  ngOnInit() {
    this.filterForm.get('company')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
    this.filterForm.get('amountTransfer')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
    this.filterForm.get('popularFilter')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  change(e: any, value: any, filterName: any) {
    e.preventDefault();
    this.filterForm.get(filterName)?.setValue(value);
  }

  onCheckChange(event: any) {
    const formArray: any = this.filterForm.get('amountTransfer') as FormControl;

    if (event.target.checked) {
      formArray.setValue([event.target.value, ...formArray.value]);
    } else {
      let i: number = 0;
      const array = formArray.value;

      formArray.value.forEach((ctrl: any) => {
        if (ctrl == event.target.value) {
          array.splice(i, 1);
          formArray.setValue(array);
          return;
        }

        i++;
      });
    }
  }
}
