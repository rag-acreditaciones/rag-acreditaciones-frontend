import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesChats } from './informes-chats';

describe('InformesChats', () => {
  let component: InformesChats;
  let fixture: ComponentFixture<InformesChats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesChats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesChats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
