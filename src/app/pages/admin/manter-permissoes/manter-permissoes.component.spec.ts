import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterPermissoesComponent } from './manter-permissoes.component';

describe('ManterPermissoesComponent', () => {
  let component: ManterPermissoesComponent;
  let fixture: ComponentFixture<ManterPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManterPermissoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
