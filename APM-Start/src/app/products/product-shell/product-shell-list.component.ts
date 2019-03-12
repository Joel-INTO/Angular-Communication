import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
      this.selectedProduct = selectedProduct;
    });

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        if (!this.selectedProduct) {
          this.selectedProduct = this.products[0];
          this.onSelected(this.products[0]);
        }
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
