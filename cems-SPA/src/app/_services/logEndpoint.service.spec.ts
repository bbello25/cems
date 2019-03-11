/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogEndpointService } from './logEndpoint.service';

describe('Service: LogEndpoint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogEndpointService]
    });
  });

  it('should ...', inject([LogEndpointService], (service: LogEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
