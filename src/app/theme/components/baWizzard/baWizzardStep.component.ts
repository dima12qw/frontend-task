import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'baWizzardStep',
  templateUrl: './baWizzardStep.html'
})
export class baWizzardStepComponent implements OnInit {
  @Input() title: string;
  @Input() isValid: boolean = true;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;

  @Output() onNext: EventEmitter<any> = new EventEmitter();
  @Output() onPrev: EventEmitter<any> = new EventEmitter();
  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  private _isActive: boolean = false;
  isDisabled: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  @Input('isActive') set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }

}
