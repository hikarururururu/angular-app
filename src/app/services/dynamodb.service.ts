import { Injectable } from '@angular/core';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private client: DynamoDBDocumentClient;

  constructor() {
    const ddbClient = new DynamoDBClient({ region: 'ap-northeast-1' });
    this.client = DynamoDBDocumentClient.from(ddbClient);
  }

  async saveCalculationHistory(calculation: { id: string; expression: string; result: string; timestamp: string }) {
    const params = {
      TableName: 'CalculationHistory',
      Item: calculation,
    };

    try {
      await this.client.send(new PutCommand(params));
      console.log('Calculation history saved successfully');
    } catch (error) {
      console.error('Error saving calculation history:', error);
    }
  }
}
