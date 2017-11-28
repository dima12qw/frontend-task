import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl, Form} from '@angular/forms';
import {NgUploaderOptions} from "ngx-uploader/src/classes/ng-uploader-options.class";
import {MockdataService} from "./services/mockdata.service";
import "style-loader!./login.scss";
import {WizzardModel} from "./models/wizzard.model";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  // styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  categories;
  avgSums;
  isChecked: boolean = false;
  public mask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public phoneMask = ['+', '3', '7', '3', ' ', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public activity: Object = {
    type1: 'Open', type2: 'Closed', type3: '24/24'
  }

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: any = {
    picture: ''
  };
  public uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
//step 5 Filter
  filter;
  filterKeys;
  selectedFilters;
  finalFilters = new Object();
  specialFilters;
  selectedSpecialFilters;
  selectedSpecialFilters2;

  //FormGroups
  formWizz: FormGroup;
  formLocInfo: FormGroup;
  formWorkHours: FormGroup;
  formContactData: FormGroup;
  formFilter: FormGroup;
  formAditions: FormGroup;
//FormControls

  legal_name: AbstractControl;
  comercial_name: AbstractControl;
  discount: AbstractControl;
  bron_activ: AbstractControl;
  category: AbstractControl;
  avg_sum: AbstractControl;
  description_RO: AbstractControl;
  description_RU: AbstractControl;
  submitted: boolean = false;

  constructor(builder: FormBuilder, protected mockData: MockdataService) {
    this.formLocInfo = builder.group({
      'legal_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'comercial_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'discount': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3)])],
      'bron_activ': [''],
      'category': ['', Validators.compose([Validators.required])],
      'avg_sum': ['', Validators.compose([Validators.required])],
      'description_RO': ['', Validators.compose([Validators.required])],
      'description_RU': ['', Validators.compose([Validators.required])],
    });
    this.legal_name = this.formLocInfo.controls['legal_name'];
    this.comercial_name = this.formLocInfo.controls['comercial_name'];
    this.discount = this.formLocInfo.controls['discount'];
    this.bron_activ = this.formLocInfo.controls['bron_activ'];
    this.category = this.formLocInfo.controls['category'];
    this.avg_sum = this.formLocInfo.controls['avg_sum'];
    this.description_RO = this.formLocInfo.controls['description_RO'];
    this.description_RU = this.formLocInfo.controls['description_RU'];
    this.formWorkHours = builder.group({
      sunday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      monday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      tuesday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      wednesday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      thursday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      friday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      saturday: builder.group({
        hStart: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
    });

    this.formContactData = builder.group({
      cFirstName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      cLastName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      country: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      postCode: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lat: [''],
      lng: ['']
    });
    this.formFilter = builder.group({
      filters: this.finalFilters
    });

    this.formAditions=builder.group({
      aditions: [''],
      forBron: ['']
    });


    this.formWizz = builder.group({
      LocInfo: this.formLocInfo,
      WorkHours: this.formWorkHours,
      ContactData: this.formContactData,
      filterData: this.formFilter,
      aditionsData: this.formAditions
    });


    this.mockData.getCategories().then((data) => {
      this.categories = data;
    });

    this.mockData.getAvgSums().then((data) => {
      this.avgSums = data;
    });

    this.mockData.getfilter().then((data) => {
      this.filter = data;
      console.log(data);
      this.filterKeys = Object.keys(data);
    });

    this.mockData.getSpecialFilter().then((data) => {
      this.specialFilters = data;
    })
  }

  ngOnInit() {
    this.mockData.getLegalName().then((data) => {
      this.formLocInfo.patchValue({legal_name: data})
    });

    Object.keys(this.formWorkHours.controls).forEach((key) => {
      this.formWorkHours.get(key).patchValue({activity: this.activity['type1']});
    });

    console.log(this.formWizz.value);
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    values['bron_activ'] = this.isChecked;
    console.log(values);
    if (this.formLocInfo.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  onSelect(actType: string, f: FormGroup) {
    console.log(actType);
    if (actType === 'Closed' || actType === '24/24') {
      f.get('hStart').disable();
      f.get('hFinish').disable();
    }
    else {
      f.get('hStart').enable();
      f.get('hFinish').enable();
      f.get('hStart').setValidators(Validators.compose([Validators.required, Validators.minLength(4)]));
      f.get('hFinish').setValidators(Validators.compose([Validators.required, Validators.minLength(4)]));
    }
    f.patchValue({activity: actType});

    console.log(f);
  }

  public onSubmitWorkHours(values: Object): void {
    console.log(values);
  }

  mapClick($address) {
    console.log($address);
    console.log($address[0].formatted_address.split(','));
    this.formContactData.patchValue({
      street: $address[0].formatted_address.split(',')[0],
      city: $address[0].formatted_address.split(',')[1],
      country: $address[0].formatted_address.split(',')[2]
    });
  }

  mapCoordinates($event) {
    console.log($event);
    this.formContactData.patchValue({
      lat: $event.lat,
      lng: $event.lng
    })
  }

  storeLocalStorage(form, string: string) {
    localStorage.setItem(string, JSON.stringify(form.value));
    form.reset();
  }

  getFromLocalStorage(form, string: string) {
    form.reset(JSON.parse(localStorage.getItem(string)));
  }


  changeFilter($event) {
    console.log(this.selectedFilters);
    console.log(this.finalFilters);

    Object.keys(this.finalFilters).forEach((c) => {
      let arr = this.selectedFilters.filter(v => v.label === c);
      if (arr.length < 1) {
        delete this.finalFilters[c];
      }
    })
  }


  changeFilters(event1, $event) {
    // this.finalFilters.push({c: $event});
    console.log(event1);
    let k = event1;
    let v = $event;
    if (v.length > 0) {
      let arr = [];
      v.forEach(c => arr.push(c.label));
      this.finalFilters[k.label] = arr;
    } else {
      delete this.finalFilters[k.label];
    }
    console.log(this.finalFilters);
  }

  onNextStep5() {
    console.log(this.finalFilters);
    this.formFilter.patchValue({filters: this.finalFilters});
    this.storeLocalStorage(this.formFilter, 'step5');
  }


  onChangeSpecialFilters($event) {
    console.log(this.selectedSpecialFilters.map(c => c.label));
       this.selectedSpecialFilters = [...this.selectedSpecialFilters];
       this.formAditions.patchValue({aditions: this.selectedSpecialFilters.map(c => c.label) });
    // this.selectedSpecialFilters2 = [...this.selectedSpecialFilters2];
  }

  onChangeSpecialFilters2($event) {
    console.log($event);
    this.formAditions.patchValue({forBron: this.selectedSpecialFilters2.map(c => c.label)});
    // this.selectedSpecialFilters = [...this.selectedSpecialFilters];
    // this.selectedSpecialFilters2 = [...this.selectedSpecialFilters2];
  }


  onDone(){
    console.log(this.formWizz.value);
  }
}
