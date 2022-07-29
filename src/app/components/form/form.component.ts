import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormArray;

  control: Array<FormControl> = [];

  constructor(
    public formBuilder: FormBuilder,
  ) {

    this.form = formBuilder.array([
      new FormControl(null, Validators.email),
      new FormControl(null,)
    ]);
  }

  ngOnInit() {
  }

}
