import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionEditPage } from './question-edit.page';

describe('QuestionEditPage', () => {
  let component: QuestionEditPage;
  let fixture: ComponentFixture<QuestionEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
