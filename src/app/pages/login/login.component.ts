import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  public activity: Object = {
    type1: 'Open', type2: 'Closed', type3: '24/24'
  }
  public formLocInfo: FormGroup;
  public formWorkHours: FormGroup;
  public legal_name: AbstractControl;
  public comercial_name: AbstractControl;
  public discount: AbstractControl;
  public bron_activ: AbstractControl;
  public category: AbstractControl;
  public avg_sum: AbstractControl;
  public description_RO: AbstractControl;
  public description_RU: AbstractControl;
  public submitted: boolean = false;

  constructor(fbLocInfo: FormBuilder, fbWorkHours: FormBuilder) {
    this.formLocInfo = fbLocInfo.group({
      'legal_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'comercial_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'discount': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'bron_activ': [''],
      'category': ['', Validators.compose([Validators.required])],
      'avg_sum': ['', Validators.compose([Validators.required])],
      'description_RO': [''],
      'description_RU': [''],
    });
    this.legal_name = this.formLocInfo.controls['legal_name'];
    this.comercial_name = this.formLocInfo.controls['comercial_name'];
    this.discount = this.formLocInfo.controls['discount'];
    this.bron_activ = this.formLocInfo.controls['bron_activ'];
    this.category = this.formLocInfo.controls['category'];
    this.avg_sum = this.formLocInfo.controls['avg_sum'];
    this.description_RO = this.formLocInfo.controls['description_RO'];
    this.description_RU = this.formLocInfo.controls['description_RU'];

    this.formWorkHours = fbWorkHours.group({
      sunday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      monday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      tuesday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      wednesday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      thursday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      friday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
      saturday: fbWorkHours.group({
        hStart: [''],
        hFinish: [''],
        activity: [''],
      }),
    });

  }

  ngOnInit() {
    console.log(this.formWorkHours);
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    console.log(values);
    if (this.formLocInfo.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  onSelect(actType: string, f: FormGroup) {
    console.log(actType);
    if (actType === 'Closed') {
      f.get('hStart').disable();
      f.get('hFinish').disable();
    }
    else {
      f.get('hStart').enable();
      f.get('hFinish').enable();
    }
    f.patchValue({activity: actType});

    console.log(f);
  }

  public onSubmitWorkHours(values: any): void {
    console.log(values);
  }
}
