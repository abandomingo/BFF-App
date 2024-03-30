import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface SavingsData {
  initial: number;
  contribution: number;
  contributionFrequency: number;
  time: number;
  apy: number;
}

export interface GraphSettings {
  view: [number, number];
  showLabels: boolean;
  animations: boolean;
  xAxis: boolean;
  yAxis: boolean;
  showYAxisLabel: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean;
}

class SavingsCalculator {
  calculateSavingsData(savingsData: SavingsData): { noInterest: any[]; compoundInterest: any[] } {
    const currentYear = new Date().getFullYear();
    const contributionEachYear = savingsData.contribution * savingsData.contributionFrequency;

    let futureValue = savingsData.initial;
    let noInterest = [];
    let compoundInterest = [];

    for (let i = 0; i <= savingsData.time; i++) {
      let principalEachYear = savingsData.initial + contributionEachYear * i;

      if (i === 0) {
        futureValue = principalEachYear;
      } else {
        futureValue = (futureValue + contributionEachYear) * (1 + savingsData.apy / 100);
      }

      noInterest.push({
        name: (currentYear + i).toString(),
        value: Math.round(principalEachYear * 1e2) / 1e2,
      });

      compoundInterest.push({
        name: (currentYear + i).toString(),
        value: Math.round(futureValue * 1e2) / 1e2,
      });
    }

    return { noInterest, compoundInterest };
  }
}

@Component({
  selector: 'savings-page',
  templateUrl: './savings-page.component.html',
  styleUrls: ['./savings-page.component.scss'],
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('350ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('350ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class SavingsPageComponent implements OnInit {
  dataset =  [
    {
      "name": "Saved Money",
      "series": [
        {
          "name": "2023",
          "value": 0
        },
        {
          "name": "2024",
          "value": 0
        }
      ]
    },
  
    {
      "name": "Invested Money",
      "series": [
        {
          "name": "2023",
          "value": 0
        },
        {
          "name": "2024",
          "value": 0
        }
      ]
    }
  ];;

  graphSettings: GraphSettings = {
    view: [900, 600],
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    xAxisLabel: 'Time',
    yAxisLabel: 'Money',
    timeline: true,
  };

  

  public savingsForm!: FormGroup;

  ngOnInit() {
    this.savingsForm = new FormGroup({
      initial: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      contribution: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      contributionFrequency: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(50)]),
      apy: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    });
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustViewSize();
  }

  private adjustViewSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 700) {
      this.graphSettings.view = [screenWidth, screenWidth * 2/3]; 
    }
  }

  public submitForm() {
    if (this.savingsForm && this.savingsForm.valid) {
      const savingsData: SavingsData = this.savingsForm.value;
      const calculator = new SavingsCalculator();
      const { noInterest, compoundInterest } = calculator.calculateSavingsData(savingsData);

      const newDataset = [
        {
          name: 'No Interest',
          series: noInterest,
        },
        {
          name: 'Invested Money',
          series: compoundInterest,
        },
      ];

      this.dataset = newDataset;
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.savingsForm.controls[controlName].hasError(errorName);
  };
}

