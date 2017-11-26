import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import {NgUploaderOptions} from "ngx-uploader/src/classes/ng-uploader-options.class";
import {MockdataService} from "./services/mockdata.service";
import "style-loader!./login.scss";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  // styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  categories;
  avgSums;
  isChecked: boolean = false;
  public activity: Object = {
    type1: 'Open', type2: 'Closed', type3: '24/24'
  }

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: any = {
    picture: ''
  };
  public uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: 'http://radikal.ru/Img/SaveImg2',
    method: 'POST',

  };
//step 5 Filter
  kitchenFilters;
  selectedKitchen;
  localTypeFilters;
  selectedLocalType;
  tableTypeFilter;
  selectedTableTypes;
  menuSpecialFilter;
  selectedMenuTyps;

  //FormGroups
  formLocInfo: FormGroup;
  formWorkHours: FormGroup;
  formContactData: FormGroup;
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
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      monday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      tuesday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      wednesday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      thursday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      friday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
      saturday: builder.group({
        hStart: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        hFinish: ['',Validators.compose([Validators.required, Validators.minLength(4)])],
        activity: [''],
      }),
    });

    this.formContactData = builder.group({
      cFirstName: [''],
      cLastName: [''],
      phoneNumber: [''],
      country: [''],
      city: [''],
      street: [''],
      postCode: ['']
    });


    this.mockData.getKitchenData().then((data) => {
      this.kitchenFilters = data;
    });
    this.mockData.getFilterLocalType().then((data) => {
      this.localTypeFilters = data;
    });

    this.mockData.getTableFilterType().then((data) => {
      this.tableTypeFilter = data;
    });


    this.mockData.getMenuSpecialTypes().then((data) => {
      this.menuSpecialFilter = data;
    });

    this.mockData.getCategories().then((data) => {
      this.categories = data;
    });

    this.mockData.getAvgSums().then((data) => {
      this.avgSums = data;
    });


  }

  ngOnInit() {
    this.mockData.getLegalName().then((data) => {
      this.formLocInfo.patchValue({legal_name: data})
    });
    console.log(Object.keys(this.formWorkHours.controls));

    Object.keys(this.formWorkHours.controls).forEach((key) => {
      this.formWorkHours.get(key).patchValue({activity: this.activity['type1']});
    });
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

}
