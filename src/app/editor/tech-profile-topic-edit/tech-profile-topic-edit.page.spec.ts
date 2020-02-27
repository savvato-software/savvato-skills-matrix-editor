import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechProfileTopicEditPage } from './tech-profile-edit.page';

describe('TechProfileTopicEditPage', () => {
  let component: TechProfileTopicEditPage;
  let fixture: ComponentFixture<TechProfileTopicEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProfileTopicEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechProfileTopicEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
