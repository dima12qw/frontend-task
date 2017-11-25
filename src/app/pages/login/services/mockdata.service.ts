import {Injectable} from "@angular/core";

@Injectable()
export class MockdataService {

  filterKitchenData = ['Chinese', 'Moldoveneasca', 'Romaneasca', 'Russian', 'Swiss', 'Greek', 'Italian'];
  filterLocalType = ['Terasa', 'Restaurant', 'Foisor', 'Other location'];
  tableFilterType = ['MasaTip1', 'MasaTip2', 'MasaTip3', 'MasaTip4'];
  menuSpecial = ['Pentru Bere', 'Business Lunch', 'Mic Dejun'];

  getKitchenData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.filterKitchenData);
      }, 2000);
    });
  }

  getFilterLocalType(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.filterLocalType);
      }, 2000);
    });
  }

  getTableFilterType(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.tableFilterType);
      }, 2000);
    });
  }

  getMenuSpecialTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.menuSpecial);
      }, 2000);
    });
  }
}
