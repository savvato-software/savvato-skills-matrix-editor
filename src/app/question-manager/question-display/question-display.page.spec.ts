import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionDisplayPage } from './question-display.page';

describe('QuestionDisplayPage', () => {
  let component: QuestionDisplayPage;
  let fixture: ComponentFixture<QuestionDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDisplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
