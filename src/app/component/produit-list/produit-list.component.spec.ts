import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListComponent } from './produit-list.component';

describe('ProduitListComponent', () => {
  let component: ProduitListComponent;
  let fixture: ComponentFixture<ProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
