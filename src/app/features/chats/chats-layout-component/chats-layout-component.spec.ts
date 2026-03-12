import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsLayoutComponent } from './chats-layout-component';

describe('ChatsLayoutComponent', () => {
  let component: ChatsLayoutComponent;
  let fixture: ComponentFixture<ChatsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
