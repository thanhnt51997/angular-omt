import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {Country} from "../../models/country.model";
import * as jsonCountries from "../../../assets/countries.json";
import * as uuid from 'uuid';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    userLists: UserModel[] = [];
    listSkills = [
        {id: 1, name: 'JavaScript'},
        {id: 2, name: 'Angular'},
        {id: 3, name: 'TypeScript'},
        {id: 4, name: 'Node.js'},
    ];
    countries: Country[] = (jsonCountries as any).default as Country[];

    selectedSkills: number[] = []; // Mảng chứa các id của các skill được chọn
    user: UserModel = {
        id: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        country: '',
        address: '',
        skill: '',
        description: ''
    };
    editingUUID: string | null = null;
    phoneNumberPattern = `/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/`;

    isAtLeastOneChecked(): boolean {
        return this.selectedSkills.length > 0;
    }

    onSubmit(formValue: NgForm): void {
        let value = formValue.value;
        if (this.isAtLeastOneChecked()) {
            if (this.editingUUID !== null) {
                const index = this.userLists.findIndex(user => user.id === this.editingUUID);
                if (index !== -1) {
                    this.userLists[index] = {...this.user, id: this.editingUUID}
                }
                this.editingUUID = null;
            } else {
                const newUser = {
                    ...this.user,
                    id: uuid.v4(),
                    value
                };
                this.userLists.push(newUser);
                formValue.resetForm();
            }
        }
    }

    editUser(uuid: string): void {

    }

    deleteUser(uuid: string): void {
        this.userLists = this.userLists.filter(user => user.id !== uuid);
    }

    onSkillChange(id: number, event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const isChecked = checkbox.checked;

        if (isChecked) {
            this.selectedSkills.push(id); // Thêm id vào mảng nếu checkbox được chọn
        } else {
            const index = this.selectedSkills.indexOf(id);
            if (index > -1) {
                this.selectedSkills.splice(index, 1); // Loại bỏ id khỏi mảng nếu bỏ chọn
            }
        }
    }
}
