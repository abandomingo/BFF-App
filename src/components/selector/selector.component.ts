import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';

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
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
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
