import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy, AfterViewInit {
    pageTitle: string = 'Products';
    monthCount: number;
    sub: Subscription;

    constructor(
        private productService: ProductService,
        private changeDetectorRef: ChangeDetectorRef) { }

    getMonthCount(product: IProduct): number {
        const start = new Date(product.releaseDate);
        const now = new Date();
        return now.getMonth()
            - start.getMonth()
            + (12 * (now.getFullYear() - start.getFullYear()));
    }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
            if (selectedProduct) {
                this.monthCount = this.getMonthCount(selectedProduct);
            } else {
                this.monthCount = null;
            }
        });
    }

    ngAfterViewInit() {
        console.log(this.monthCount);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
