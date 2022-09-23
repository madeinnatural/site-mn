import {
  Component,
  OnInit,
  Input,
  QueryList,
  ContentChildren,
  Output,
  EventEmitter,
} from '@angular/core';
import { GlobalEventService } from 'src/app/core/global/global.service';
import { MnInputComponent } from '../input/input.component';

export interface Submitable {
  submit(): Promise<any>;
  cancel?(): Promise<any>;
}
@Component({
  selector: 'mn-form',
  templateUrl: './mn-form.component.html',
  styleUrls: ['./mn-form.component.scss'],
})
export class MnFormComponent {
  @Input() buttonName = 'Enviar';
  @Input() cancelName?: string;

  inputs: MnInputComponent[] = [];
  @Input() submitable?: Submitable; // o submitable falha quando não passar na customvalidation

  @Input() submitIcon = '';
  @Input() submitLeftIcon = '';
  @Input() cancelIcon = '';

  @Input() innerClass = '';

  @Input() hideButtons = false;

  @Output() onSubmit = new EventEmitter();

  @Input() showToastForm: boolean = false;
  @Input() status_loading: 'success' | 'warning' | 'danger' = 'success';

  @ContentChildren(MnInputComponent, { descendants: true })
  inputs2?: QueryList<MnInputComponent>;

  constructor(private global: GlobalEventService) { }



  ngAfterContentInit() {
    this.inputs = this.inputs2?.toArray() || [];

    this.inputs2?.changes.subscribe((changes) => {
      this.inputs = changes.toArray();
    });
  }

  get(name: string): MnInputComponent | undefined {
    for (let input of this.inputs) {
      if (input.name == name) {
        return input;
      }
    }
    return undefined;
  }

  getValue(name: string): string {
    for (let input of this.inputs) {
      if (input.name == name) {
        return input.value;
      }
    }
    return '';
  }

  valid() {
    let valid = true;
    for (const goinput of this.inputs) {
      if (!goinput.validate()) {
        valid = false;
      }
    }

    return valid;
  }


  dirty() {
    for (const input of this.inputs) {
      if (input.dirty) {
        return true;
      }
    }
    return false;
  }

  markAsPristine() {
    for (const input of this.inputs) {
      input.dirty = false;
    }
  }

  clearValidators() {
    for (const input of this.inputs) {
      input.clearValidation();
    }
  }

  async submit(): Promise<any> {
    this.clearValidators();
    this.markAsPristine();

    if (this.valid()) {
      this.onSubmit.emit();

      if (this.submitable)
        return new Promise((done, rej) => {
          this.submitable!.submit()
            .then((ok) => {
              //this.postValidate();
              done(ok);
            })
            .catch((error) => {
              //this.postValidate();
              rej(error);
            });
        });
      else return true;
    } else {
      if (this.showToastForm) {
        const noValid: Array<string> = [];

        for (const goinput of this.inputs) {
          if (!goinput.validate()) {
            noValid.push(goinput.name);
          }
        }

        const showTime = (campos: Array<string>) => {
          let localMsg: string = `<h3>Você não preencheu ${campos.length > 1
            ? ' campos obrigatórios.'
            : ` o campo ${campos[0]}.`
            } </h3>`;

          localMsg = localMsg.replace(/.$/, '').replace(/(\r\n|\n|\r)/gm, '');
          this.global.goAlert.emit({ type: 'warning', text: localMsg });
        };

        showTime(noValid);
      }

      return new Promise((done) => {
        done(true);
      });
    }
  }
}
