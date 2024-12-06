import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details.component';
import { DetailsService } from './details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

class MockDetailsService {
  getDetailsData(id: number) {
    return of({
      id,
      name: 'Test Product',
      description: 'Test Description',
      category: 'Test Category',
      price: 100,
    } as Product);
  }

  createData(product: Product) {
    return true;
  }

  updateData(product: Product) {
    return true;
  }

  deleteData(id: number) {
    return true;
  }
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let detailsService: DetailsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        { provide: DetailsService, useClass: MockDetailsService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '2' } } },
        },
      ],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    detailsService = TestBed.inject(DetailsService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization', () => {
    spyOn(detailsService, 'getDetailsData').and.callThrough();
    component.ngOnInit();
    expect(detailsService.getDetailsData).toHaveBeenCalledWith(2);
    expect(component.rowData).toEqual({
      id: 2,
      name: 'Test Product',
      description: 'Test Description',
      category: 'Test Category',
      price: 100,
    });
  });

  it('should bind form inputs to rowData', () => {
    component.rowData = {
      name: 'Product Name',
      description: 'Product Description',
      category: 'Product Category',
      price: 200,
    };
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    const descriptionInput = fixture.debugElement.query(
      By.css('#description'),
    ).nativeElement;
    const categoryInput = fixture.debugElement.query(
      By.css('#category'),
    ).nativeElement;
    const priceInput = fixture.debugElement.query(
      By.css('#price'),
    ).nativeElement;

    expect(nameInput.value).toBe('Product Name');
    expect(descriptionInput.value).toBe('Product Description');
    expect(categoryInput.value).toBe('Product Category');
    expect(priceInput.value).toBe('200');
  });

  it('should create data and navigate', () => {
    spyOn(detailsService, 'createData').and.callThrough();
    spyOn(window, 'alert');
    component.rowData = {
      id: null,
      name: 'New Product',
      description: '',
      category: '',
      price: 0,
    };
    component.createData();
    expect(detailsService.createData).toHaveBeenCalledWith(
      component.rowData as Product,
    );
    expect(window.alert).toHaveBeenCalledWith('New row added successfully');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should update data and navigate', () => {
    spyOn(detailsService, 'updateData').and.callThrough();
    spyOn(window, 'alert');
    component.rowData = {
      id: 2,
      name: 'Updated Product',
      description: '',
      category: '',
      price: 0,
    };
    component.updateData();
    expect(detailsService.updateData).toHaveBeenCalledWith(
      component.rowData as Product,
    );
    expect(window.alert).toHaveBeenCalledWith('Row updated successfully');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should delete data and navigate', () => {
    spyOn(detailsService, 'deleteData').and.callThrough();
    spyOn(window, 'alert');
    component.rowData = {
      id: 2,
      name: 'Product to Delete',
      description: '',
      category: '',
      price: 0,
    };
    component.deleteData();
    expect(detailsService.deleteData).toHaveBeenCalledWith(2);
    expect(window.alert).toHaveBeenCalledWith('Row deleted successfully');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
