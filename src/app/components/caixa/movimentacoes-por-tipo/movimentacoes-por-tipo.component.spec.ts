import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacoesPorTipoComponent } from './movimentacoes-por-tipo.component';

describe('MovimentacoesPorTipoComponent', () => {
  let component: MovimentacoesPorTipoComponent;
  let fixture: ComponentFixture<MovimentacoesPorTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimentacoesPorTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacoesPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
