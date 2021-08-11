import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPageComponent } from './grupo-page.component';

describe('GrupoPageComponent', () => {
  let component: GrupoPageComponent;
  let fixture: ComponentFixture<GrupoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
