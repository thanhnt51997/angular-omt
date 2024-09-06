import {Component} from '@angular/core';
import {UserModel} from "./models/user.model";
import * as jsonCountries from '../assets/countries.json';
import * as uuid from 'uuid';
import {NgForm} from '@angular/forms';

interface Country {
    "code": string,
    "name": string,
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    userList: UserModel[] = [];
    formUser: UserModel = {
        "id": "",
        "name": "",
        "email": "",
        "phone": 0,
        "country": "",
        "gender": "male",
        "address": "",
        "skills": [],
        "description": "",
    };
    selectedSkills: string[] = [];

    onSkillChange(skill: string, event: Event): void {
        const inputElement = event.target as HTMLInputElement; // Chuyển kiểu sự kiện thành HTMLInputElement
        if (inputElement.checked) {
            this.selectedSkills.push(skill);
        } else {
            this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
        }
    }

    countries: Country[] = (jsonCountries as any).default as Country[];
    skills: string[] = ["C#", "JavaScript", "PHP"];

    onSubmit(form: NgForm) {
        console.log(this.userList, this.formUser.id)
        const user = this.userList.find(user => user.id === this.formUser.id);
        const newUser: UserModel = form.value;
        newUser.skills = this.selectedSkills;
        if (user) {
            Object.assign(user, newUser);
        } else {
            newUser.id = uuid.v4();
            this.userList.push(newUser);
            form.reset();
        }
    };

    editUser(user: UserModel) {
        this.formUser = {...user}; // Gán dữ liệu vào biến selectedUser
        // this.formUser = user;
    };

    deleteUser(user: UserModel) {
        this.userList = this.userList.filter(u => u.id !== user.id);
    };
}
