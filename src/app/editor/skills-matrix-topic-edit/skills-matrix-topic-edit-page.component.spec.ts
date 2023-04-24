import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsMatrixTopicEditPage } from './tech-profile-edit.page';

describe('SkillsMatrixTopicEditPage', () => {
  let component: SkillsMatrixTopicEditPage;
  let fixture: ComponentFixture<SkillsMatrixTopicEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMatrixTopicEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixTopicEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
