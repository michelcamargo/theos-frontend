import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperFilterComponent } from './developer-filter.component';

describe('DeveloperFilterComponent', () => {
  let component: DeveloperFilterComponent;
  let fixture: ComponentFixture<DeveloperFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
