import { TestBed } from '@angular/core/testing';
import { DynamoDBService } from './dynamodb.service';

describe('DynamoDBService', () => {
  let service: DynamoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save calculation history', async () => {
    const calculation = {
      id: '1',
      expression: '2 + 2',
      result: '4',
      timestamp: new Date().toISOString(),
    };

    spyOn(service, 'saveCalculationHistory').and.callThrough();

    await service.saveCalculationHistory(calculation);

    expect(service.saveCalculationHistory).toHaveBeenCalledWith(calculation);
  });
});
