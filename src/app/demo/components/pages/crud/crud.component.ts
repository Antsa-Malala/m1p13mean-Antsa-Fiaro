import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/demo/api/category';
import { CategoryService } from 'src/app/demo/service/category.service';
import { Variant } from 'src/app/demo/api/variant';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    categories: Category[] = [];

    products: Product[] = [];

    product: Product = {
        variants: []
    };

    selectedProducts: Product[] = [];

    filteredProducts: any[] = [];

    filteredCategories: Category[] = [];

    expandedRows: { [key: string]: boolean } = {}; 

    rowGroupMetadata: any;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    selectedFile?: File;

    variantFiles: File[] = [];

    constructor(private productService: ProductService, private messageService: MessageService, private userService: UserService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.loadProducts();
        this.loadCategories();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'stock', header: 'Stock' },
            { field: 'category', header: 'Category' },
            { field: 'status', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'INSTOCK' },
            { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' },
            { label: 'INACTIVE', value: 'INACTIVE' }
        ];
    }

    openNew() {
        this.product = {
            status: 'INSTOCK',
            variants: []
        };
        this.submitted = false;
        this.selectedFile = undefined;
        this.variantFiles = [];
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.productService.getProductById(product._id).then(fullProduct => {
            this.product = {
                ...fullProduct,
                variants: fullProduct.variants?.map(v => ({ ...v })) || []
            };

            console.log(this.product);
            this.submitted = false;
            this.selectedFile = undefined; 
            this.productDialog = true;
        }).catch(err => {
            console.error('Error loading product for edit', err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load product details'
            });
        });
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        try{
            if (this.product._id) {
                this.productService.deleteProduct(this.product._id).subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Deleted',
                        life: 3000
                    });
                    this.loadProducts();
                    this.expandedRows = {};
                });
            }
            this.product = {
                status: 'INSTOCK',
                variants: [{}]
            };
        } catch (err: any) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.selectedFile = undefined;
        this.product = {};
    }

    saveProduct() {
        this.submitted = true;

        if (!this.product.name || !this.product.brand || !this.product.category || !this.product.status) {
            this.messageService.add({severity:'warn', summary:'Warning', detail:'Please fill all required fields'});
            return;
        }

        try {
            const formData = new FormData();

            formData.append('name', this.product.name);
            formData.append('description', this.product.description || '');
            formData.append('brand', this.product.brand);
            formData.append('status', this.product.status);
            formData.append('price', (this.product.price ?? 0).toString());
            formData.append('stock', (this.product.stock ?? 0).toString());
            formData.append('category', this.product.category?._id || '');

            if (this.selectedFile) {
                formData.append('image', this.selectedFile);
            } 

            if (this.product.variants && this.product.variants.length) {
                const variantsData = this.product.variants
                    .filter(v => v.size || v.color || v.price || v.stock)
                    .map((v, i) => ({
                        _id: v._id,
                        size: v.size,
                        color: v.color,
                        price: v.price,
                        stock: v.stock
                    }));

                if (variantsData.length) {
                    formData.append('variants', JSON.stringify(variantsData));

                    this.variantFiles.forEach((file, index) => {
                        formData.append('variantImages', file);
                    });
                }
            }

            const currentUser = this.userService.getConnectedUser();
            if (currentUser?._id) {
                formData.append('shop', currentUser._id);
            }

            if (this.product._id) {
                this.productService.updateProduct(this.product._id, formData).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity:'success', 
                            summary:'Success', 
                            detail:'Product updated successfully'
                        });
                        this.loadProducts();
                        this.expandedRows = {};
                        this.hideDialog();
                    },
                    error: (err) => {
                        console.error('UPDATE ERROR FULL:', err);
                        this.messageService.add({
                            severity:'error', 
                            summary:'Error', 
                            detail: err?.error?.message || err.message || 'Failed to update product'
                        });
                    }
                });
            } else {
               this.productService.createProduct(formData).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Added',
                            life: 3000
                        });
                        this.loadProducts();
                        this.expandedRows = {};
                        this.hideDialog();
                    },
                    error: (err) => {
                        console.error(err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err?.error?.message || 'Something went wrong',
                            life: 5000
                        });
                    }
                });
            }

            this.productDialog = false;
            this.product = { status: 'INSTOCK', variants: [] };
            this.selectedFile = undefined;
            this.variantFiles = [];
        } catch (err: any) {
            console.error(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
        
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    filterProduct(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i];
            if (product?.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(product);
            }
        }

        this.filteredProducts = filtered;
    }

    filterCategory(event: any) {
        const query = event.query?.toLowerCase() || '';
        this.filteredCategories = this.categories.filter(category => 
            category.name && category.name.toLowerCase().includes(query)
        );
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onVariantFileSelect(event: any, index: number) {
        const file = event.target.files[0];
        if (file) {
            this.variantFiles[index] = file;
        }
    }

    addVariant() {
        if (!this.product.variants) {
            this.product.variants = [];
        }

        this.product.variants.push({
            size: '',
            color: '',
            price: 0,
            stock: 0
        });
    }

    removeVariant(index: number) {
        this.product?.variants?.splice(index, 1);
    }

    get hasVariants(): boolean {
        return !!this.product?.variants?.length;
    }

    get totalStock(): number {
        if (!this.product?.variants?.length) {
            return this.product?.stock ?? 0;
        }

        return this.product.variants.reduce((total, v) => {
            return total + (Number(v?.stock) || 0);
        }, 0);
    }

    get minPrice(): number {
        if (!this.product?.variants?.length) {
            return this.product?.price ?? 0;
        }

        const prices = this.product.variants
            .map(v => Number(v?.price))
            .filter(p => !isNaN(p));

        return prices.length ? Math.min(...prices) : 0;
    }

    ngDoCheck() {
        if (this.hasVariants) {
            this.product.stock = this.totalStock;
            this.product.price = this.minPrice;
        }
    }

    loadProducts() {
        try{
            this.userService.user$.subscribe(user => {
                if (!user) return;

                if(user.role ==="ADMIN")
                {
                    this.productService.getProductsSmall()
                    .then((data: Product[]) => this.products = data);
                } else
                {
                    this.productService.getProductsSmall(this.userService.getConnectedUser()._id)
                    .then((data: Product[]) => this.products = data);
                }
            })
        } catch (err: any) {
            console.error(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
    }

    async loadCategories() {
        try{
            this.categories = await this.categoryService.getCategories();
        } catch (err: any) {
            console.error(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
    }

    onRowExpand(product: Product) {
        if (!product.variants) {
            this.productService.getProductById(product._id).then(fullProduct => {
                product.variants = fullProduct.variants || [];
            }).catch(err => {
                console.error('Error loading variants for product', product._id, err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load product variants'
                });
            });
        }
    }

    deleteVariant(product: Product, variant: Variant) {
        this.deleteProductDialog = false;
        try{
            
            if (!variant._id || !product._id) {
                return;
            }

            this.productService.deleteVariant(product._id!, variant._id)
            .subscribe({
                next: (updatedProduct) => {
                    this.product = {
                        status: 'INSTOCK',
                        variants: [{}]
                    };
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Variant Deleted',
                        life: 3000
                    });
                    this.loadProducts();
                    this.expandedRows = {};
                },
                error: (err) => {
                    console.error(err);
                }
            });
        } catch (err: any) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
    }
}
