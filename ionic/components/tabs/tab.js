import {Parent} from 'angular2/src/core/annotations_impl/visibility';
import {Directive, Component} from 'angular2/src/core/annotations_impl/annotations';
import {Optional} from 'angular2/src/di/annotations_impl'
import {View} from 'angular2/src/core/annotations_impl/view';
import {ElementRef} from 'angular2/src/core/compiler/element_ref';
import {Compiler} from 'angular2/angular2';
import {DynamicComponentLoader} from 'angular2/src/core/compiler/dynamic_component_loader';
import {Injector} from 'angular2/di';
import {ViewContainerRef} from 'angular2/src/core/compiler/view_container_ref';

import {Nav} from '../nav/nav';
import {NavBase} from '../nav/nav-base';
import {NavItem} from '../nav/nav-item';
import {Tabs} from './tabs';
import {Content} from '../content/content';
import {IonicComponent} from 'ionic/config/component';


@Component({
  selector: 'ion-tab',
  properties: [
    'initial',
    'tabTitle',
    'tabIcon'
  ],
  hostProperties: {
    'panelId': 'attr.id',
    'labeledBy': 'attr.aria-labelledby',
    'ariaHidden': 'attr.aria-hidden',
    'isSelected': 'class.show-tab'
  },
  hostAttributes: {
    'role': 'tabpanel'
  }
})
@View({
  template: `
    <template tab-anchor></template>
    <content></content>
  `,
  directives: [TabAnchor]
})
export class Tab {
  constructor(
      @Parent() tabs: Tabs,
      @Optional() parentNavBase: NavBase,
      compiler:Compiler,
      elementRef: ElementRef,
      loader: DynamicComponentLoader,
      injector: Injector
    ) {
    this.navBase = new NavBase(parentNavBase, compiler, elementRef, loader, injector);

    this.domElement = elementRef.domElement;
    this.config = Nav.config.invoke(this);

    this.isSelected = false;
    this.ariaHidden = true;
    tabs.addTab(this);
    this.panelId = 'tab-panel-' + this.id;
    this.labeledBy = 'tab-button-' + this.id;

    console.log('Tab constructor', this.id);
  }

  onInit() {
    this.navBase.initial(this.initial);
  }

  select(shouldSelect) {
    if (shouldSelect && !this.isSelected) {
      console.log('Select tab', this.id);

    } else if (!shouldSelect && this.isSelected) {
      console.log('Deselect tab', this.id);
    }

    this.isSelected = shouldSelect;
    this.ariaHidden = !shouldSelect;
  }

  setPaneAnchor(elementRef) {
    this.navBase.setPaneAnchor(elementRef);
  }

}


@Directive({
  selector: 'template[tab-anchor]'
})
class TabAnchor {
  constructor(@Parent() tab: Tab, elementRef: ElementRef) {
    tab.setPaneAnchor(elementRef);
  }
}