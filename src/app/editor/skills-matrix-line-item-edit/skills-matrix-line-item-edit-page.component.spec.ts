import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsMatrixLineItemEditPage } from './skills-matrix-line-item-edit-page.component';

describe('TechProfileLineItemEditPage', () => {
  let component: SkillsMatrixLineItemEditPage;
  let fixture: ComponentFixture<SkillsMatrixLineItemEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMatrixLineItemEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixLineItemEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
