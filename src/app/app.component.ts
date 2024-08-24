import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contact = {
    "contactName": "",
    "email": "abc@deg.com",
    "facebook": "facebook.com",
    "twitter": "twitter.com",
    "website": "tiepphan.com",
    "tel": "1234-5678-90"
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit(formValue: any) {
    // Do something awesome
    //console.log(formValue);
    // throw Error('something go wrong')
  }
}
