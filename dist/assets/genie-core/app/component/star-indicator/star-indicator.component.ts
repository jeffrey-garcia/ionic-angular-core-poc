import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'star-indicator',
  templateUrl: './star-indicator.component.html',
  styleUrls: ['./star-indicator.component.scss']
})
export class StarIndicatorComponent {
  @Input() starCount?: number;
  @Input() defaultValue: boolean = true;
  @Input() filterMode: boolean = false;

  @Output() valueChanged = new EventEmitter<any>();
  
  _value?: number;
  starsFormGroup?: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    /** initialize stars with the default value */
    this.createStars();
  }

  /** create star controls based from starcount value */
  createStars() {
    var arrStars = [];

    if (this.starCount == null) {
      throw new Error(`star count is null`);
    }

    for (let i = 0; i < 3; i++) {
      if (i < this.starCount) {
        arrStars.push(this.formBuilder.control(true));
      } else if (this.filterMode) {
        arrStars.push(this.formBuilder.control(false));
      }
    }

    this.starsFormGroup = this.formBuilder.group({
      stars: this.formBuilder.array(arrStars)
    });
  }

  get stars(): FormArray {
    if (this.starsFormGroup == null) {
      throw new Error(`starsFromsGroup is null`);
    }
    /** get stars value ex. (stars: [true,true,true]) */
    return this.starsFormGroup.get('stars') as FormArray;
  }

  get value() {
    /** return current value */
    return this._value
  }

  @Input()
  set value(value: any) {
    this._value = value;
  }

  /**
   * 
   * @param event event object passed by the component
   */
  onClick(event:any) {
    // check if we should handle touch event
    if (!this.filterMode) {
      console.log('prevent touch event');
      event.preventDefault();
    }
  }

  /**
   * 
   * @param event event object passed by the component
   * @param control control that received the event
   */
  onChange(event:any, control:any) {
    /**
     * onChange event update star values depending on the tapped index of the star, below are some sample scenarios

     * 1. Current star value is 0, tapped 2nd star, all stars until the 2nd star will be true
     * 2. Current star value is 3, tapped 2nd star, all stars until 2nd star will be true
     * 3. Current star value is 2, tapped 2nd star, all stars will be false (same value tapped means remove all values)
     */


    var stars = <FormArray>this.stars as FormArray;
    /** get index of the star tapped */

    const selectedIndex = stars.controls.findIndex(x => x === control);
    /** get current value of the star after tapping (this is the updated value) */

    const val = control.value;

    /** get max val for determining the current star value */
    var maxVal = this.stars.value.lastIndexOf(true);

    /** check if < than the current star value */
    let decrement = maxVal > selectedIndex;


    var newStars = stars.controls.map(function (star, index, array) {
      /** star tapped is less than current value */
      if (decrement) {
        if (index <= selectedIndex) {
          /** we will need to reverse value of the star tapped see ex 2. */
          star.setValue(!val);
        } else {
          /** set the current value */
          star.setValue(val);
        }
      } else {
        /** set val to all stars within index (ex.3, ex.1) */
        if (index <= selectedIndex) {
          star.setValue(val);
        }
      }
    });

    this.value = this.stars.value.filter((val:boolean) => val == true).length;
    this.valueChanged.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    
    let starCountChange = changes['starCount'];

    /** only redraw stars if value changed */
    if (starCountChange && starCountChange.previousValue != starCountChange.currentValue) {
      this.createStars();
    }
    
    
  }
}
