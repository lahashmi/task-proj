import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteRendererComponent } from './edit-delete-renderer.component';

describe('EditDeleteRendererComponent', () => {
  let component: EditDeleteRendererComponent;
  let fixture: ComponentFixture<EditDeleteRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
