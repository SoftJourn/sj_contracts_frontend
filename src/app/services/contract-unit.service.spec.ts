/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContractUnitService } from './contract-unit.service';

describe('ContractUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractUnitService]
    });
  });

  it('should ...', inject([ContractUnitService], (service: ContractUnitService) => {
    expect(service).toBeTruthy();
  }));
});
