import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin, of, Subject } from 'rxjs';
import { Airflight } from '../../Types/Airflight';
import { Filter } from '../../Types/Filter';
import { ApiService } from '../../services/Api/api.service';
import { switchMap } from 'rxjs/operators';

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
  tickets: Array<any> = [];

  airlines: Array<any> = [];

  isCalendarShow: boolean = false;

  filters: Array<Filter> = filters;

  activeFilter: string = '';

  title = 'Aviasales';

  filterForm: FormGroup;

  subject: Subject<any> = new Subject<any>();

  @ViewChild('calendar') calendar: any;

  @HostListener('click', ['$event.target']) onClick(e: any) {
    console.log(this.calendar, typeof this.calendar);
  }

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.filterForm = this.formBuilder.group({
      amountTransfer: new FormControl([]),
      company: new FormControl('All'),
      popularFilter: new FormControl('Cheaper'),
      thereDate: new FormControl(''),
      backDate: new FormControl(''),
      fromPlace: new FormControl(''),
      wherePlace: new FormControl(''),
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
    this.filterForm.get('thereDate')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
    this.filterForm.get('backDate')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
    this.filterForm.get('fromPlace')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
    this.filterForm.get('wherePlace')?.valueChanges.subscribe((res) => {
      console.log(res);
    });

    this.apiService
      .getAllTickets()
      .pipe(
        switchMap((res) => {
          return forkJoin([of(res), this.apiService.getAllCompanies()]);
        }),
      )
      .subscribe(([res, companies]: any) => {
        console.log(res);
        res.forEach((ticketData: any) => {
          let nameCompany: string = '';
          companies.forEach((company: any) => {
            if (company.id === ticketData.companyId) {
              nameCompany = company.name;
            }
          });
          ticketData.info.companyName = nameCompany;
        });
        this.tickets = res;
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

  isInputDateActive(e: any): void {
    console.log(e.target.type);
  }

  clickInputDate(id: string) {
    this.activeFilter = id;
    this.isCalendarShow = !this.isCalendarShow;
  }

  selectDateTrigger(e: { day: string; dayOfWeek: string; month: string }) {
    console.log(e.day + ' ' + e.month + ', ' + e.dayOfWeek.toLowerCase());
    switch (this.activeFilter) {
      case 'there':
        this.filterForm
          .get('thereDate')
          ?.setValue(e.day + ' ' + e.month + ', ' + e.dayOfWeek.toLowerCase());
        break;
      case 'back':
        this.filterForm
          .get('backDate')
          ?.setValue(e.day + ' ' + e.month + ', ' + e.dayOfWeek.toLowerCase());
        break;
    }
  }
}
