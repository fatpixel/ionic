import {bootstrap, NgSwitch, NgSwitchWhen} from 'angular2/angular2'
import {Component, Directive} from 'angular2/src/core/annotations_impl/annotations';
import {View} from 'angular2/src/core/annotations_impl/view';

import {Segment, SegmentButton, Content, Button} from 'ionic/ionic';
import {FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';
//import {IONIC_DIRECTIVES} from 'ionic/ionic'

console.log('Loaded', formDirectives, Segment, SegmentButton, Content, Button, NgSwitch, NgSwitchWhen);

@Component({ selector: 'ion-app' })
@View({
  templateUrl: 'main.html',
  directives: [formDirectives].concat([Segment, SegmentButton, Content, Button, NgSwitch, NgSwitchWhen])
})
class IonicApp {
  constructor() {

    var fb = new FormBuilder();
    this.form = fb.group({
      mapStyle: ['hybrid', Validators.required]
    });
  }

  doSubmit(event) {
    console.log('Submitting form', this.form.value);
    event.preventDefault();
  }
}


export function main() {
  bootstrap(IonicApp);
}