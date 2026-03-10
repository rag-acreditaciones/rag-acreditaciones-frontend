import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesRankingList } from './informes-ranking-list';

describe('InformesRankingList', () => {
  let component: InformesRankingList;
  let fixture: ComponentFixture<InformesRankingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesRankingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesRankingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
