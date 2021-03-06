import {Component} from '@angular/core';
import {ionicBootstrap} from '../../../../../src';


@Component({
  templateUrl: 'tabs.html'
})
class TabsPage {
  page1 = E2EPage;
  page2 = Page2;
  page3 = Page3;
  page4 = Page4;
}


@Component({
  templateUrl: 'page4.html'
})
class Page4 {
  tabsPage = TabsPage;
}


@Component({
  templateUrl: 'page3.html'
})
class Page3 {
  page4 = Page4;
}


@Component({
  templateUrl: 'page2.html'
})
class Page2 {
  page3 = Page3;
}


@Component({
  templateUrl: 'main.html'
})
class E2EPage {
  page2 = Page2;
}


@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
class E2EApp {
  root = E2EPage;
}

ionicBootstrap(E2EApp);
