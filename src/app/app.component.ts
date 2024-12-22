import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {
  number1: number = 0;
  number2: number = 0;
  result: number = 0;

  calculate() {
    this.result = this.number1 + this.number2;
  }
}