import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public numberOfRequests = 0;

  public constructor() {}
}
