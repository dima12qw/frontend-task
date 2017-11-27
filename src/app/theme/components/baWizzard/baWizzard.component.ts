import {AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList} from "@angular/core";
import {baWizzardStepComponent} from "./baWizzardStep.component";
@Component({
  selector: 'baWizzard',
  styleUrls: ['./baWizzard.scss'],
  templateUrl: './baWizzard.html'
})
export class baWizzardComponent implements OnInit, AfterContentInit {

  @ContentChildren(baWizzardStepComponent) wizardSteps: QueryList<baWizzardStepComponent>;
  public _steps: Array<baWizzardStepComponent> = [];
  public _isCompleted: boolean = false;
  @Output() setFormDone = new EventEmitter();
  @Output() onStepChanged: EventEmitter<baWizzardStepComponent> = new EventEmitter<baWizzardStepComponent>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.wizardSteps.forEach(step => this._steps.push(step));
    this._steps[0].isActive = true;
  }

  public get steps(): Array<baWizzardStepComponent> {
    return this._steps;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }

  public get activeStep(): baWizzardStepComponent {
    return this._steps.find(step => step.isActive);
  }

  public set activeStep(step: baWizzardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.onStepChanged.emit(step);
    }
  }

  public get activeStepIndex(): number {
    return this._steps.indexOf(this.activeStep);
  }

  public get hasNextStep(): boolean {
    return this.activeStepIndex < this._steps.length - 1;
  }

  public get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  goToStep(step: baWizzardStepComponent) {
    this.activeStep = step;
  }

  next() {
    if (this.hasNextStep) {
      let nextStep: baWizzardStepComponent = this._steps[this.activeStepIndex + 1];
      this.activeStep.onNext.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }

  previous() {
    if (this.hasPrevStep) {
      let prevStep: baWizzardStepComponent = this._steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  complete() {
    this._isCompleted = false;
    this.setFormDone.emit("wizzard-done");
    this.previous();
  }

}
