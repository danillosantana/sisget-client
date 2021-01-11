import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaComprovanteComponent } from './visualiza-comprovante.component';

describe('VisualizaComprovanteComponent', () => {
  let component: VisualizaComprovanteComponent;
  let fixture: ComponentFixture<VisualizaComprovanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizaComprovanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
