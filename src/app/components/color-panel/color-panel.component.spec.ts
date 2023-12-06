import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPanelComponent } from './color-panel.component';

describe('ColorPanelComponent', () => {
  let component: ColorPanelComponent;
  let fixture: ComponentFixture<ColorPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPanelComponent]
    });
    fixture = TestBed.createComponent(ColorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
