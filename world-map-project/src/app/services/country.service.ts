import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'https://api.worldbank.org/v2/country/';

  constructor() {}

  getCountryData(countryCode: string): Promise<any> {
    return fetch(`${this.apiUrl}${countryCode}?format=json`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching country data:', error);
        return []; 
      });
  }
}
