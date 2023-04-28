import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsMatrixLineItemSkillsEditPage } from './skills-matrix-line-item-skills-edit.page';

describe('SkillsMatrixLineItemSkillsEditPage', () => {
  let component: SkillsMatrixLineItemSkillsEditPage;
  let fixture: ComponentFixture<SkillsMatrixLineItemSkillsEditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMatrixLineItemSkillsEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixLineItemSkillsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
