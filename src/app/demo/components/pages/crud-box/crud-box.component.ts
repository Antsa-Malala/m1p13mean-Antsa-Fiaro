import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/demo/api/box';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BoxService } from 'src/app/demo/service/box.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/demo/api/user';

@Component({
    templateUrl: './crud-box.component.html',
    providers: [MessageService]
})
export class CrudBoxComponent implements OnInit {

    boxDialog: boolean = false;

    deleteBoxDialog: boolean = false;

    deleteBoxesDialog: boolean = false;

    boxes: Box[] = [];

    box: Box = {};

    selectedBoxes: Box[] = [];

    shops: User[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    selectedFile?: File;

    constructor(private boxService: BoxService, private messageService: MessageService, private userService: UserService) { }

    ngOnInit() {
        this.loadBoxes();
        this.loadShops();

        this.cols = [
            { field: 'floor', header: 'Floor' },
            { field: 'number', header: 'Number' },
            { field: 'status', header: 'Status' },
            { field: 'shop', header: 'Shop' }
        ];

        this.statuses = [
            { label: 'AVAILABLE', value: 'AVAILABLE' },
            { label: 'OCCUPIED', value: 'OCCUPIED' },
            { label: 'MAINTENANCE', value: 'MAINTENANCE' }
        ];
    }

    openNew() {
        this.box = {
            status: 'AVAILABLE'
        };
        this.submitted = false;
        this.selectedFile = undefined;
        this.boxDialog = true;
    }

    deleteSelectedBoxes() {
        this.deleteBoxesDialog = true;
    }

    editBox(boxToEdit: Box) {
        this.box = { ...boxToEdit };
        this.submitted = false;
        this.selectedFile = undefined;
        this.boxDialog = true;
    }

    deleteBox(box: Box) {
        this.deleteBoxDialog = true;
        this.box = { ...box };
    }

    confirmDeleteSelected() {
        this.deleteBoxesDialog = false;
        this.boxes = this.boxes.filter(val => !this.selectedBoxes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Boxs Deleted', life: 3000 });
        this.selectedBoxes = [];
    }

    confirmDelete() {
        this.deleteBoxDialog = false;

        if (this.box._id) {
            this.boxService.deleteBox(this.box._id).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Box Deleted',
                    life: 3000
                });
                this.loadBoxes();
            });
        }

        this.box = {};
    }

    hideDialog() {
        this.boxDialog = false;
        this.submitted = false;
        this.selectedFile = undefined;
        this.box = {};
    }

    saveBox() {
        this.submitted = true;

        if (!this.box.floor || !this.box.number) {
            return;
        }

        const formData = new FormData();
        formData.append('floor', this.box.floor.toString());
        formData.append('number', this.box.number.toString());
        formData.append('status', this.box.status || 'AVAILABLE');
        
        if (this.box.shop?._id) {
            formData.append('shop', this.box.shop._id);
        }

        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }


        if (this.box._id) {
            this.boxService.updateBox(this.box._id, formData).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Box Updated',
                    life: 3000
                });
                this.loadBoxes();
                this.loadShops();
            });
        } else {
            this.boxService.createBox(formData).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Box Created',
                    life: 3000
                });
                this.loadBoxes();
            });
        }

        this.boxDialog = false;
        this.box = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i]._id === id) {
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
        console.log("SELECTED FILE:", this.selectedFile);
    }

    loadBoxes() {
        this.boxService.getBoxes()
            .then((data: Box[]) => this.boxes = data);
    }

    async loadShops() {
        this.shops = await this.userService.availableShops();
    }
}
