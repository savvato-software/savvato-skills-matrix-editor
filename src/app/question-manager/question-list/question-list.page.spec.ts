import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionListPage } from './question-list.page';

describe('QuestionListPage', () => {
  let component: QuestionListPage;
  let fixture: ComponentFixture<QuestionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
