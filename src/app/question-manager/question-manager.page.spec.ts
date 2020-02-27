import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionManagerPage } from './question-manager.page';

describe('QuestionManagerPage', () => {
  let component: QuestionManagerPage;
  let fixture: ComponentFixture<QuestionManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
