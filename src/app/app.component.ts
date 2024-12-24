// このファイルで計算処理を行います。
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Amplify } from 'aws-amplify';


import { DynamoDBService } from './services/dynamodb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule],
  providers: [DynamoDBService]  // 
})
export class AppComponent {
  number1: number = 0;
  number2: number = 0;
  operator: string = '+';
  result: number = 0;

  constructor(private dynamoDBService: DynamoDBService) { }

  async calculate() {
    switch (this.operator) {
      case '+':
        this.result = this.number1 + this.number2;
        break;
      case '-':
        this.result = this.number1 - this.number2;
        break;
      case '*':
        this.result = this.number1 * this.number2;
        break;
      case '/':
        this.result = this.number2 !== 0 ? this.number1 / this.number2 : 0;
        break;
    }

    // 計算履歴を保存
    const calculation = {
      id: Date.now().toString(),
      expression: `${this.number1} ${this.operator} ${this.number2}`,
      result: this.result.toString(),
      timestamp: new Date().toISOString()
    };

    await this.dynamoDBService.saveCalculationHistory(calculation);
  }
}