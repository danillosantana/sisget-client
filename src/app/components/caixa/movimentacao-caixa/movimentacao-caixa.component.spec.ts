import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoCaixaComponent } from './movimentacao-caixa.component';

describe('MovimentacaoCaixaComponent', () => {
  let component: MovimentacaoCaixaComponent;
  let fixture: ComponentFixture<MovimentacaoCaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacaoCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
