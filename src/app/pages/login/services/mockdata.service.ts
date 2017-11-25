import {Injectable} from "@angular/core";

@Injectable()
export class MockdataService {

  filterKitchenData = ['Chinese', 'Moldoveneasca', 'Romaneasca', 'Russian', 'Swiss', 'Greek', 'Italian'];


  getKitchenData() {
    return this.filterKitchenData;
  }

}
