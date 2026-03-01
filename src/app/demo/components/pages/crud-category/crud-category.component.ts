import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/demo/api/category';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
    templateUrl: './crud-category.component.html',
    providers: [MessageService]
})
export class CrudCategoryComponent implements OnInit {

    categoryDialog: boolean = false;

    deleteCategoryDialog: boolean = false;

    deleteCategoriesDialog: boolean = false;

    categories: Category[] = [];

    category: Category = {};

    selectedCategories: Category[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    selectedFile?: File;

    constructor(private categoryService: CategoryService, private messageService: MessageService) { }

    ngOnInit() {
        this.loadCategories();
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' }
        ];
    }

    openNew() {
        this.category = {};
        this.submitted = false;
        this.selectedFile = undefined;
        this.categoryDialog = true;
    }

    deleteSelectedCategories() {
        this.deleteCategoriesDialog = true;
    }

    editCategory(categoryToEdit: Category) {
        this.category = { ...categoryToEdit };
        this.submitted = false;
        this.selectedFile = undefined;
        this.categoryDialog = true;
    }

    deleteCategory(category: Category) {
        this.deleteCategoryDialog = true;
        this.category = { ...category };
    }

    confirmDeleteSelected() {
        this.deleteCategoriesDialog = false;
        this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
        this.selectedCategories = [];
    }

    confirmDelete() {
        this.deleteCategoryDialog = false;

        try {
            if (this.category._id) {
                this.categoryService.deleteCategory(this.category._id).subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Category Deleted',
                        life: 3000
                    });
                    this.loadCategories();
                });
            }

            this.category = {};
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

    hideDialog() {
        this.categoryDialog = false;
        this.submitted = false;
        this.selectedFile = undefined;
        this.category = {};
    }

    saveCategory() {
        this.submitted = true;

        if (!this.category.name) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', this.category.name ?? '');
            formData.append('description', this.category.description ?? '');

            if (this.selectedFile) {
                formData.append('image', this.selectedFile);
            }

            if (this.category._id) {
                this.categoryService.updateCategory(this.category._id, formData).subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Category Updated',
                        life: 3000
                    });
                    this.loadCategories();
                });
            } else {
                this.categoryService.createCategory(formData).subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Category Created',
                        life: 3000
                    });
                    this.loadCategories();
                });
            }

            this.categoryDialog = false;
            this.category = {};
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

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onFileSelect(event: any) {
        this.selectedFile = event.target.files[0];
    }

    loadCategories() {
        try{
            this.categoryService.getCategories()
                .then((data: Category[]) => this.categories = data);
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
}
