import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

export interface Option {
  content: string;
  title: string;
  desc: string;
  route: string;
}

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideInFromRightOnHover', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})

export class SelectorComponent {

  options: Option[] = [
    { content: '', title: "Savings Calculator", desc: 'Savings Calculator - Reveal the future value of your efforts, find out how your money can grow! Use this simple calculator to estimate your interest over time.', route: '/savings' },
    { content: '', title: "Budget Calculator", desc: 'Budget Calculator - Create a balanced budget based off your personal needs! Empower yourself to make informed decisions, ensuring your money aligns with your goals and aspirations ', route: '' },
    { content: '', title: "Budget Maker PDF", desc: 'Budget Maker PDF - Download your desired budget in an easy-to-read format. Fill out your own desired budget or import from the Budget Calculator!', route: '' }
  ];

  constructor() {
    this.options.forEach((option: Option)=>{
      option.content = option.title
    })
  }

  

  onHover(option: Option) {
    option.content = option.desc;
  }

  onMouseOut(option: Option) {
    option.content = option.title;
  }
}
