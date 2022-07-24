import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

const months: Array<string> = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const dayOfWeek: Array<string> = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
})
export class DateSelectComponent implements OnInit {
  @Output() onSelectDate: EventEmitter<{ day: string; dayOfWeek: string; month: string }> =
    new EventEmitter<{ day: string; dayOfWeek: string; month: string }>();

  allMonths: Array<string> = months;

  daysOfWeek: Array<string> = dayOfWeek;

  date = new Date();

  day: number = this.date.getDate();

  numberMonth: number = this.date.getMonth();

  actualDayOfWeek: string = '';

  year: number = this.date.getFullYear();

  allDaysInMonth: Array<number> = [];

  firstDayOfMonth: number = -1;

  selectMonthArray: Array<any> = [];

  actualMonthAndYearControl = this.formBuilder.group({
    date: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstDayOfMonth = this.getFirstDayOfMonth(this.numberMonth);
    this.actualDayOfWeek = this.daysOfWeek[this.firstDayOfMonth];
    this.getArrayAllDaysInMonth(this.numberMonth, this.year);
    this.getAllMonthInThisYear();

    this.actualMonthAndYearControl.get('date')?.valueChanges.subscribe((res) => {
      const [month, year] = res.split(' ');
      this.numberMonth = this.allMonths.indexOf(month);
      this.year = year;
      this.firstDayOfMonth = this.getFirstDayOfMonth(this.numberMonth);
      this.getArrayAllDaysInMonth(this.numberMonth, this.year);
      console.log(this.numberMonth, this.year);
    });
    console.log(this.year, this.numberMonth, this.day, this.date, this.firstDayOfMonth);
  }

  getFirstDayOfMonth(numberMonth: number): number {
    let firstDayOfMonth = String(new Date(this.year, numberMonth, 1));
    switch (firstDayOfMonth.slice(0, 3)) {
      case 'Mon':
        return 1;
      case 'Tue':
        return 2;
      case 'Wed':
        return 3;
      case 'Thu':
        return 4;
      case 'Fri':
        return 5;
      case 'Sat':
        return 6;
      case 'Sun':
        return 7;
      default:
        return -1;
    }
  }

  getArrayAllDaysInMonth(month: number, year: number) {
    let daysInMonth: number = 0;
    this.allDaysInMonth = [];
    let firstDayOfMonth = this.getFirstDayOfMonth(month);
    for (let i = 1; i < firstDayOfMonth; i++) {
      this.allDaysInMonth.push(0);
    }

    if ([1, 3, 5, 7, 8, 10, 12].includes(month + 1)) {
      daysInMonth = 31;
    } else if ([4, 6, 9, 11].includes(month + 1)) {
      daysInMonth = 30;
    } else {
      let isLeap = new Date(year, 1, 29).getMonth() == 1;
      daysInMonth = isLeap ? 29 : 28;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.allDaysInMonth.push(i);
    }
  }

  getAllMonthInThisYear() {
    for (let i = this.numberMonth; i < 12; i++) {
      this.selectMonthArray.push({
        text: this.allMonths[i] + ' ' + this.year,
        year: this.year,
        month: this.allMonths[i],
      });
    }

    for (let i = 0; i < this.numberMonth; i++) {
      this.selectMonthArray.push({
        text: this.allMonths[i] + ' ' + (this.year + 1),
        year: this.year + 1,
        month: this.allMonths[i],
      });
    }

    this.actualMonthAndYearControl.setValue({
      date: this.selectMonthArray[0].text,
    });
  }

  selectDateClick(day: any): void {
    this.day = day;
    this.onSelectDate.emit({
      day: day,
      dayOfWeek: this.daysOfWeek[new Date(this.year, this.numberMonth, day).getDay()],
      month: this.allMonths[this.numberMonth],
    });
  }
}
