import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachViewRendererComponent } from './attach-view-renderer.component';

describe('AttachViewRendererComponent', () => {
  let component: AttachViewRendererComponent;
  let fixture: ComponentFixture<AttachViewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachViewRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
