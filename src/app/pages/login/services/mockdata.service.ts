import {Injectable} from "@angular/core";

const LEGAL_NAME = 'STAR HOLDING';

@Injectable()
export class MockdataService {

  filterKitchenData = ['Chinese', 'Moldoveneasca', 'Romaneasca', 'Russian', 'Swiss', 'Greek', 'Italian'];
  filterLocalType = ['Terasa', 'Restaurant', 'Foisor', 'Other location'];
  tableFilterType = ['MasaTip1', 'MasaTip2', 'MasaTip3', 'MasaTip4'];
  menuSpecial = ['Pentru Bere', 'Business Lunch', 'Mic Dejun'];
  categories = ['1', '2', '3', '3', '4'];
  avgSums = ['100-150 Lei', '150-200 Lei', '200-250 Lei', '250-300 Lei'];
  filters = {
    'Tip Local': this.getFilterLocalType(),
    'Kitchen Types': this.getKitchenData(),
    'Table Types': this.getTableFilterType(),
    'Special Menu Types': this.getMenuSpecialTypes()
  };

  getfilter(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.filters);
      }, 2000);
    });
  }

  getKitchenData(){
    return this.filterKitchenData;
  }

  getFilterLocalType() {
    return this.filterLocalType;
  }

  getTableFilterType(){
    return this.tableFilterType
  }

  getMenuSpecialTypes() {
    return this.menuSpecial
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 2000);
    });
  }

  getAvgSums(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.avgSums);
      }, 2000);
    });
  }

  getLegalName(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(LEGAL_NAME);
      }, 2000);
    });
  }
}
