import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechProfileLineItemEditPage } from './tech-profile-line-item-edit.page';

describe('TechProfileLineItemEditPage', () => {
  let component: TechProfileLineItemEditPage;
  let fixture: ComponentFixture<TechProfileLineItemEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProfileLineItemEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechProfileLineItemEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
