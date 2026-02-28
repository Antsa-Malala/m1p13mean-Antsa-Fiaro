import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './panelsdemo.component.html'
})
export class PanelsDemoComponent implements OnInit {
    user: any;
    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];

    constructor(private userService: UserService, private messageService: MessageService) { }

    ngOnInit() {
        try{

            this.userService.loadUser();
            this.user = this.userService.getConnectedUser();
            this.userService.user$.subscribe(u => this.user = u);
    
            this.items = [
                { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
                { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] }
            ];
    
            this.cardMenu = [
                {
                    label: 'Save', icon: 'pi pi-fw pi-check'
                },
                {
                    label: 'Update', icon: 'pi pi-fw pi-refresh'
                },
                {
                    label: 'Delete', icon: 'pi pi-fw pi-trash'
                },
            ];
        }  catch (err: any) {
            console.error(err);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
            });
        }
    }

    getAccountAge(): string {
        if (!this.user?.createdAt) return '';

        const created = new Date(this.user.createdAt);
        const now = new Date();

        const diffSeconds = Math.floor((created.getTime() - now.getTime()) / 1000);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        const diffDays = Math.round(diffSeconds / 86400);
        if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');

        const diffMonths = Math.round(diffDays / 30);
        if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, 'month');

        const diffYears = Math.round(diffMonths / 12);
        return rtf.format(diffYears, 'year');
    }

    getColor(role: string) {
        switch(role) {
            case 'ADMIN': return 'purple';
            case 'SHOP': return 'orange';
            case 'CUSTOMER': return 'blue';
            default: return 'blue';
        }
    }
}
