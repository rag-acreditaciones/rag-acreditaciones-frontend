import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversacionListComponent } from './conversacion-list-component';

describe('ConversacionListComponent', () => {
  let component: ConversacionListComponent;
  let fixture: ComponentFixture<ConversacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversacionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversacionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
