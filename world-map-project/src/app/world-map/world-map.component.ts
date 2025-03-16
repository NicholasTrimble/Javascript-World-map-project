import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
  standalone: true,
  imports: [HttpClientModule] 
})
export class WorldMapComponent {
  selectedCountry: any = {};

  constructor(private http: HttpClient) { }

  selectCountry(event: Event) {
    const target = event.target as SVGPathElement;
    const countryName = target.getAttribute('name');
  
    if (countryName) {
      
      const countryCode = this.getCountryCode(countryName);
  
      this.getCountryData(countryCode).subscribe(
        (data) => {
          
          const countryInfo = data[1][0] || {};
          
          this.selectedCountry = {
            name: countryName,
            capital: countryInfo.capitalCity || 'Unknown',
            region: countryInfo.region?.value || 'Unknown',
            incomeLevel: countryInfo.incomeLevel?.value || 'Unknown',
            longitude: countryInfo.longitude || 'Unknown',
            latitude: countryInfo.latitude || 'Unknown'
          };
  
          this.updateUI();
        },
        (error) => {
          console.error('Error fetching country data:', error);
          this.selectedCountry = { name: countryName, capital: 'Unknown', region: 'Unknown', incomeLevel: 'Unknown', longitude: 'Unknown', latitude: 'Unknown' };
          this.updateUI();
        }
      );
    }
  }
  
  updateUI() {
    document.getElementById("name")!.textContent = this.selectedCountry.name;
    document.getElementById("capital")!.textContent = this.selectedCountry.capital;
    document.getElementById("region")!.textContent = this.selectedCountry.region;
    document.getElementById("incomeLevel")!.textContent = this.selectedCountry.incomeLevel;
    document.getElementById("longitude")!.textContent = `Lng: ${this.selectedCountry.longitude}`;
    document.getElementById("latitude")!.textContent = `Lat: ${this.selectedCountry.latitude}`;
  }

  
  getCountryData(countryCode: string): Observable<any> {
    const apiUrl = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    return this.http.get<any>(apiUrl);
  }

  
  getCountryCode(countryName: string): string {
    const countryCodes: { [key: string]: string } = {
      "Afghanistan": "AFG",
      "Albania": "ALB",
      "Algeria": "DZA",
      "Andorra": "AND",
      "Angola": "AGO",
      "Antigua and Barbuda": "ATG",
      "Argentina": "ARG",
      "Armenia": "ARM",
      "Australia": "AUS",
      "Austria": "AUT",
      "Azerbaijan": "AZE",
      "Bahamas": "BHS",
      "Bahrain": "BHR",
      "Bangladesh": "BGD",
      "Barbados": "BRB",
      "Belarus": "BLR",
      "Belgium": "BEL",
      "Belize": "BLZ",
      "Benin": "BEN",
      "Bhutan": "BTN",
      "Bolivia": "BOL",
      "Bosnia and Herzegovina": "BIH",
      "Botswana": "BWA",
      "Brazil": "BRA",
      "Brunei Darussalam": "BRN",
      "Bulgaria": "BGR",
      "Burkina Faso": "BFA",
      "Burundi": "BDI",
      "Cabo Verde": "CPV",
      "Cambodia": "KHM",
      "Cameroon": "CMR",
      "Canada": "CAN",
      "Central African Republic": "CAF",
      "Chad": "TCD",
      "Chile": "CHL",
      "China": "CHN",
      "Colombia": "COL",
      "Comoros": "COM",
      "Congo (Congo-Brazzaville)": "COG",
      "Congo (Democratic Republic of the Congo)": "COD",
      "Costa Rica": "CRI",
      "Croatia": "HRV",
      "Cuba": "CUB",
      "Cyprus": "CYP",
      "Czech Republic": "CZE",
      "Denmark": "DNK",
      "Greenland": "DNK",
      "Djibouti": "DJI",
      "Dominica": "DMA",
      "Dominican Republic": "DOM",
      "Ecuador": "ECU",
      "Egypt": "EGY",
      "El Salvador": "SLV",
      "Equatorial Guinea": "GNQ",
      "Eritrea": "ERI",
      "Estonia": "EST",
      "Eswatini": "SWZ",
      "Ethiopia": "ETH",
      "Fiji": "FJI",
      "Finland": "FIN",
      "France": "FRA",
      "Gabon": "GAB",
      "Gambia": "GMB",
      "Georgia": "GEO",
      "Germany": "DEU",
      "Ghana": "GHA",
      "Greece": "GRC",
      "Grenada": "GRD",
      "Guatemala": "GTM",
      "Guinea": "GIN",
      "Guinea-Bissau": "GNB",
      "Guyana": "GUY",
      "Haiti": "HTI",
      "Honduras": "HND",
      "Hungary": "HUN",
      "Iceland": "ISL",
      "India": "IND",
      "Indonesia": "IDN",
      "Iran": "IRN",
      "Iraq": "IRQ",
      "Ireland": "IRL",
      "Israel": "ISR",
      "Italy": "ITA",
      "Jamaica": "JAM",
      "Japan": "JPN",
      "Jordan": "JOR",
      "Kazakhstan": "KAZ",
      "Kenya": "KEN",
      "Kiribati": "KIR",
      "Korea (North)": "PRK",
      "Korea (South)": "KOR",
      "Kuwait": "KWT",
      "Kyrgyzstan": "KGZ",
      "Laos": "LAO",
      "Latvia": "LVA",
      "Lebanon": "LBN",
      "Lesotho": "LSO",
      "Liberia": "LBR",
      "Libya": "LBY",
      "Liechtenstein": "LIE",
      "Lithuania": "LTU",
      "Luxembourg": "LUX",
      "Madagascar": "MDG",
      "Malawi": "MWI",
      "Malaysia": "MYS",
      "Maldives": "MDV",
      "Mali": "MLI",
      "Malta": "MLT",
      "Marshall Islands": "MHL",
      "Mauritania": "MRT",
      "Mauritius": "MUS",
      "Mexico": "MEX",
      "Micronesia (Federated States of)": "FSM",
      "Moldova": "MDA",
      "Monaco": "MCO",
      "Mongolia": "MNG",
      "Montenegro": "MNE",
      "Morocco": "MAR",
      "Mozambique": "MOZ",
      "Myanmar (Burma)": "MMR",
      "Namibia": "NAM",
      "Nauru": "NRU",
      "Nepal": "NPL",
      "Netherlands": "NLD",
      "New Zealand": "NZL",
      "Nicaragua": "NIC",
      "Niger": "NER",
      "Nigeria": "NGA",
      "North Macedonia (formerly Macedonia)": "MKD",
      "Norway": "NOR",
      "Oman": "OMN",
      "Pakistan": "PAK",
      "Palau": "PLW",
      "Panama": "PAN",
      "Papua New Guinea": "PNG",
      "Paraguay": "PRY",
      "Peru": "PER",
      "Philippines": "PHL",
      "Poland": "POL",
      "Portugal": "PRT",
      "Qatar": "QAT",
      "Romania": "ROU",
      "Russia": "RUS",
      "Rwanda": "RWA",
      "Saint Kitts and Nevis": "KNA",
      "Saint Lucia": "LCA",
      "Saint Vincent and the Grenadines": "VCT",
      "Samoa": "WSM",
      "San Marino": "SMR",
      "Sao Tome and Principe": "STP",
      "Saudi Arabia": "SAU",
      "Senegal": "SEN",
      "Serbia": "SRB",
      "Seychelles": "SYC",
      "Sierra Leone": "SLE",
      "Singapore": "SGP",
      "Slovakia": "SVK",
      "Slovenia": "SVN",
      "Solomon Islands": "SLB",
      "Somalia": "SOM",
      "South Africa": "ZAF",
      "South Sudan": "SSD",
      "Spain": "ESP",
      "Sri Lanka": "LKA",
      "Sudan": "SDN",
      "Suriname": "SUR",
      "Sweden": "SWE",
      "Switzerland": "CHE",
      "Syria": "SYR",
      "Taiwan": "TWN",
      "Tajikistan": "TJK",
      "Tanzania": "TZA",
      "Thailand": "THA",
      "Timor-Leste": "TLS",
      "Togo": "TGO",
      "Tonga": "TON",
      "Trinidad and Tobago": "TTO",
      "Tunisia": "TUN",
      "Turkey": "TUR",
      "Turkmenistan": "TKM",
      "Tuvalu": "TUV",
      "Uganda": "UGA",
      "Ukraine": "UKR",
      "United Arab Emirates": "ARE",
      "United Kingdom": "GBR",
      "United States": "USA",
      "Uruguay": "URY",
      "Uzbekistan": "UZB",
      "Vanuatu": "VUT",
      "Vatican City": "VAT",
      "Venezuela": "VEN",
      "Vietnam": "VNM",
      "Yemen": "YEM",
      "Zambia": "ZMB",
      "Zimbabwe": "ZWE"
    };
    return countryCodes[countryName] || 'USA'; 
  }
}
