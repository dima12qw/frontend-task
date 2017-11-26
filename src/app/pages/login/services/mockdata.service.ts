import {Injectable} from "@angular/core";
const LEGAL_NAME= 'STAR HOLDING';
@Injectable()
export class MockdataService {

  filterKitchenData = ['Chinese', 'Moldoveneasca', 'Romaneasca', 'Russian', 'Swiss', 'Greek', 'Italian'];
  filterLocalType = ['Terasa', 'Restaurant', 'Foisor', 'Other location'];
  tableFilterType = ['MasaTip1', 'MasaTip2', 'MasaTip3', 'MasaTip4'];
  menuSpecial = ['Pentru Bere', 'Business Lunch', 'Mic Dejun'];
  categories = ['1','2','3','3','4'];
  avgSums = ['100-150 Lei', '150-200 Lei', '200-250 Lei', '250-300 Lei'];


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

  getCategories(): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 2000);
    });
  }

  getAvgSums(): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.avgSums);
      }, 2000);
    });
  }

  getLegalName(): Promise<any>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(LEGAL_NAME);
      }, 2000);
    });
  }
}
