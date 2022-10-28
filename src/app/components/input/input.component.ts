import { CurrencyPipe } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {
  MnValidator,
  ValidatorFactory,
  ValidatorEnum,
  Validator,
  IntervalValidator,
} from '../../core/model/Validatores';

type Mask = {
  mask:
  | false
  | (string | RegExp)[]
  | ((rawValue: string) => (string | RegExp)[]);
  showMask?: boolean;
  guide?: boolean;
};
const numericMask: any = {
  mask: function (rawValue: string) {
    let mask = [];
    for (let i = 0; i < rawValue.length; i++) {
      mask.push(/\d/);
    }
    return mask;
  },
  showMask: false,
  guide: false,
};
const alfanumericMask: Mask = {
  mask: function (rawValue: string) {
    let mask = [];
    for (let i = 0; i < rawValue.length; i++) {
      mask.push(/[\d\w ]/);
    }
    return mask;
  },
  showMask: false,
  guide: false,
};
const fullDateMask: Mask = {
  mask: [
    /[0-3]/,
    /\d/,
    '/',
    /[0-1]/,
    /\d/,
    '/',
    /[1-2]/,
    /\d/,
    ' ',
    'à',
    's',
    ' ',
    /[0-2]/,
    /\d/,
    ':',
    /[0-5]/,
    /\d/,
  ],
};
const phoneMask: Mask = {
  mask: [
    '(',
    /\d/,
    /[1-9]/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};
const cpfMask: Mask = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};
const cnpjMask: Mask = {
  mask: [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
};
const dateMask: Mask = {
  mask: [
    /[0-3]/,
    /\d/,
    '/',
    /[0-1]/,
    /\d/,
    '/',
    /[1-2]/,
    /[0,1,9]/,
    /\d/,
    /\d/,
  ],
};
const shortDateMask: Mask = {
  mask: [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/],
  showMask: false,
  guide: true,
};
const hourMask: Mask = {
  mask: [/[0-2]/, /\d/, ':', /[0-5]/, /\d/],
  showMask: false,
  guide: true,
};
const cardNumberMask: Mask = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  showMask: false,
  guide: false,
};
const cardValidityMask: Mask = { mask: [/[0,1]/, /\d/, '/', /\d/, /\d/] };
const cardCvvMask: Mask = {
  mask: [/\d/, /\d/, /\d/, /\d/],
  showMask: false,
  guide: false,
};
const cepMask: Mask = {
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};
const blankMask: Mask = { mask: false, showMask: false, guide: false };
const cpfCnpjMask: Mask = {
  mask: function (rawValue: string) {
    if (rawValue.replace(/\D/g, '').length <= 11) {
      return cpfMask.mask as (string | RegExp)[];
    } else {
      return cnpjMask.mask as (string | RegExp)[];
    }
  },
};
const bankAccountMask: Mask = {
  mask: function (rawValue: string) {
    rawValue = rawValue.replace(/\D/g, '');
    if (rawValue.length <= 1) return [/\d/];

    let mask: (string | RegExp)[] = [];
    for (let i = 0; i < rawValue.length - 1; i++) {
      mask.push(/\d/);
    }

    mask.push('-', /\d/);
    return mask;
  },
};

export class MnOption {
  constructor(public name: string, public value: string) { }
}

export class MnInputArchetype {
  constructor(
    public readonly validators:
      | ValidatorEnum
      | Array<
        | ValidatorEnum
        | Array<ValidatorEnum | string | any>
        | Validator
        | MnValidator
      >,
    public readonly mask: Mask,
    public readonly type:
      | 'text'
      | 'tel'
      | 'email'
      | 'password'
      | 'select'
      | 'search'
  ) { }

  static get(type: string, options?: string): MnInputArchetype | undefined {
    switch (type) {
      case 'required': {
        let inputType: 'text' | 'tel' | 'email' | 'select' = 'text';
        let validators: (ValidatorEnum | MnValidator)[] = [
          ValidatorEnum.required,
        ];
        let mask: any = blankMask;

        if (options && options === 'numeric') {
          inputType = 'tel';
          validators.push(ValidatorEnum.numeric);
          mask = numericMask;
        }
        if (options && options === 'alfanumeric') {
          validators.push(ValidatorEnum.alfanumeric);
          mask = alfanumericMask;
        }
        if (options && options === 'email') {
          inputType = 'email';
        }
        if (options && options.includes('interval')) {
          inputType = 'tel';
          let params = options.split(':');
          validators.push(new IntervalValidator(params[1], params[2]));
        }
        if (options && options === 'select') {
          inputType = 'select';
        }
        if (options && options === 'tel') {
          inputType = 'tel';
        }
        return new MnInputArchetype(validators, mask, inputType);
      }
      case 'interval': {
        if (options) {
          let params = options.split(':');
          return new MnInputArchetype(
            [new IntervalValidator(params[0], params[1])],
            blankMask,
            'tel'
          );
        } else throw new Error('archetype interval sem parâmetros');
      }
      case 'money': {
        let validators: any[] = [ValidatorEnum.required];

        if (options && options.includes('min')) {
          let params = options.split(':');
          validators.push([ValidatorEnum.min, params[2], params[1]]);
        }
        return new MnInputArchetype(validators, blankMask, 'tel');
      }
      case 'password': {
        let message = 'Senha deve possuir no mínimo # dígitos.';
        if (options) {
          message = options;
        }
        return new MnInputArchetype(
          [ValidatorEnum.required, [ValidatorEnum.minlenght, message, 8]],
          blankMask,
          'password'
        );
      }
      case 'name': {
        let message = 'Insira sobrenome.';
        if (options) {
          message = options;
        }
        return new MnInputArchetype(
          [ValidatorEnum.required, [ValidatorEnum.name, message]],
          blankMask,
          'text'
        );
      }
      case 'email': {
        return new MnInputArchetype(
          [ValidatorEnum.required, ValidatorEnum.email],
          blankMask,
          'email'
        );
      }
      case 'phone': {
        const validators = [ValidatorEnum.phone];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, phoneMask, 'tel');
      }
      case 'cpf': {
        const validators = [];
        let mask: Mask = cpfMask;

        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        if (options === 'cnpj') {
          mask = cpfCnpjMask;
          validators.push(ValidatorEnum.cpfcnpj);
        } else {
          validators.push(ValidatorEnum.cpf);
        }

        return new MnInputArchetype(validators, mask, 'tel');
      }
      case 'cnpj': {
        const validators = [ValidatorEnum.cnpj];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, cnpjMask, 'tel');
      }
      case 'shortDate': {
        const validators = [ValidatorEnum.shortDate];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, shortDateMask, 'tel');
      }
      case 'fullDate': {
        const validators = [ValidatorEnum.fullDate];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, fullDateMask, 'tel');
      }
      case 'date': {
        const validators = [ValidatorEnum.date];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, dateMask, 'tel');
      }
      case 'hour': {
        const validators = [ValidatorEnum.hour];
        if (!(options && options === 'optional')) {
          validators.unshift(ValidatorEnum.required);
        }
        return new MnInputArchetype(validators, hourMask, 'tel');
      }
      case 'login': {
        return new MnInputArchetype(
          [ValidatorEnum.required, ValidatorEnum.emailvalid],
          blankMask,
          'email'
        );
      }
      case 'cardnumber': {
        return new MnInputArchetype(
          [
            ValidatorEnum.required,
            [
              ValidatorEnum.minlenght,
              'Número inválido. Confira ou tente outro.',
              17,
            ],
          ],
          cardNumberMask,
          'tel'
        );
      }
      case 'validity': {
        return new MnInputArchetype(
          [ValidatorEnum.required, ValidatorEnum.carddate],
          cardValidityMask,
          'tel'
        );
      }
      case 'cvv': {
        return new MnInputArchetype(
          [ValidatorEnum.required, ValidatorEnum.cvv],
          cardCvvMask,
          'tel'
        );
      }
      case 'cep': {
        return new MnInputArchetype(
          [
            ValidatorEnum.required,
            [ValidatorEnum.maskedminleght, 'CPF inválido #', 9],
          ],
          cepMask,
          'tel'
        );
      }
      case 'search': {
        return new MnInputArchetype([], blankMask, 'search');
      }
      case 'uf': {
        return new MnInputArchetype(
          ValidatorEnum.required,
          blankMask,
          'select'
        );
      }
      case 'bankAccount': {
        return new MnInputArchetype(
          ValidatorEnum.required,
          bankAccountMask,
          'tel'
        );
      }
    }

    return undefined;
  }
}

@Component({
  selector: 'mn-input',
  templateUrl: './mn-input.component.html',
  styleUrls: ['./input.component.scss']
})
export class MnInputComponent implements OnChanges {
  // SELECT TYPE
  @Input() options: MnOption[] = [];
  @Input() emptyOption = true; // deixar um option vazio
  @Input() maxLength = 255;
  @Input() maxCounter: number = 0;
  @Input() size = '';
  @Input() percent: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() validators: MnValidator[] = [];
  @Input() hasForgetLink = false;
  @Input() innerClass = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() obs = '';
  @Input() single: false = false;
  @Input() readonly = false;
  //CAMPO UTILIZADO PELO MERCADOPAGO
  @Input() dataCheckout = '';
  @Input() uppercase = false;
  @Input() placeholder = '';
  @Input() allowEmoji = false;
  @Input() forbiddenCharacters: string = '';
  @Input('skip-validate') skipValidate = false;

  inputBlur = '';

  @Output() change = new EventEmitter();
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();

  // auxiliador que recebe uma string e transforma em mascara
  @Input()
  set mask(mask: string) {
    switch (mask) {
      case 'cep': {
        this.tmask = cepMask;
        break;
      }
      case 'cpf': {
        this.tmask = cpfMask;
        break;
      }
      case 'date': {
        this.tmask = dateMask;
        break;
      }
      case 'shortDate': {
        this.tmask = shortDateMask;
        break;
      }
      case 'fullDate': {
        this.tmask = fullDateMask;
        break;
      }
      case 'card': {
        this.tmask = cardNumberMask;
        break;
      }
      case 'validity': {
        this.tmask = cardValidityMask;
        break;
      }
      case 'phone': {
        this.tmask = phoneMask;
        break;
      }
    }
  }

  @Input()
  set value(value: string) {
    if (!this.dirty) {
      this.dirty = true;
    }
    if ((!value && typeof value != 'number') || value == 'R$ 0,00') value = '';

    setTimeout(() => {
      if (this.maxCounter) this.counterNumber = this.maxCounter - value.length;
    }, 1);

    if (this.uppercase) {
      value = value.toUpperCase();
    }

    if (value && this.archetype && this.archetype.includes('money')) {
      let strippedNumber = value
        .replace('R$ ', '')
        .trim()
        .replace('.', '')
        .replace(',', '');
      value =
        this.currencyPipe.transform(
          parseInt(strippedNumber) / 100,
          'R$ ',
          'code',
          '1.2-2',
          'pt-BR'
        ) || '';
    }

    this._value = value;
    this.valueChange.emit(this._value);
  }

  get value() {
    if (this._value) return this._value.toString();
    else return '';
  }

  @Input()
  set type(type) {
    this.actualType = type;
    this._type = type;
  }
  get type() {
    return this._type;
  }

  @Input()
  set archetype(type: string) {
    this._archetype = type;

    let archetype: MnInputArchetype | undefined;
    if (type.includes(',')) {
      const typex = type.split(',');
      if (typex[1] == 'allowMessage') {
        this.allowMessage = false;
        this.invalid = true;
        archetype = MnInputArchetype.get(typex[0]);
      } else {
        archetype = MnInputArchetype.get(typex[0], typex[1]);
      }
    } else {
      archetype = MnInputArchetype.get(type);
    }

    if (archetype) {
      if (archetype.mask) {
        this.tmask = archetype.mask;
      }
      if (archetype.type) {
        this._type = archetype.type;
        this.actualType = archetype.type;
      }
      if (archetype.validators) {
        this.setValidators(archetype.validators);
      }
    }
  }
  get archetype() {
    return this._archetype;
  }

  invalid = false;
  message = '';
  dirty = false;
  touch = false;
  showPassword = false;
  actualType = '';
  tmask: any = blankMask; // textMask puro
  counterNumber: number = 0;
  hide = true;

  blankMask = blankMask;
  allowMessage: boolean = true;

  private _archetype: string = '';
  private _value: string = '';
  private _type = 'text';
  private currencyPipe = new CurrencyPipe('pt-BR');

  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  postInvalidade(message: string) {
    this.message = message;
    this.invalid = true;
    this.dirty = false;
  }

  updateCounter() {
    this.counterNumber = this.maxCounter - this.value.length;
    this.updateHeight();
  }

  handleBackspace(event: KeyboardEvent) {
    if (this.archetype == 'bankAccount' && event.keyCode === 8) {
      let futureSelection: number;

      if (!this.input) throw new Error('input não encontrado no go-input');

      if (
        this.input.nativeElement.selectionStart ==
        this.input.nativeElement.selectionEnd
      ) {
        futureSelection = (this.input.nativeElement.selectionStart || 0) - 1;
      } else if (this.input.nativeElement.selectionEnd == this.value.length) {
        futureSelection = (this.input.nativeElement.selectionStart || 0) + 1;
      } else {
        futureSelection = this.input.nativeElement.selectionStart || 0;
      }

      setTimeout(() => {
        this.input!.nativeElement.selectionStart = futureSelection;
        this.input!.nativeElement.selectionEnd = futureSelection;
      }, 1);
    }
  }

  updateHeight() {
    if (this.getActualType() == 'textarea') {
      if (!this.textarea)
        throw new Error('textarea não encontrado no go-input');

      const htmlElement = this.textarea.nativeElement as HTMLElement;
      htmlElement.setAttribute(
        'style',
        'height:' + htmlElement.scrollHeight + 'px;'
      );
    }
  }

  getActualType() {
    return this.actualType;
  }

  setValidators(
    validators:
      | ValidatorEnum
      | Array<
        | ValidatorEnum
        | Array<ValidatorEnum | string | any>
        | Validator
        | MnValidator
      >
  ) {
    if (!(validators instanceof Array)) {
      validators = [validators];
    }
    this.validators = this.validators.concat(
      ValidatorFactory.getValidators(validators)
    );
  }

  toggleType() {
    if (this.actualType === 'text') {
      this.actualType = 'password';
    } else {
      this.actualType = 'text';
    }
  }

  focus() {
    if (!this.touch) {
      this.touch = true;
    }
    if (this.input) this.input.nativeElement.focus();
    if (this.textarea) this.textarea.nativeElement.focus();
  }

  clearValidation() {
    this.invalid = false;
    this.dirty = false;
    for (const validator of this.validators) {
      if (validator.postValidate) {
        validator.postValidate = true;
      }
    }
  }

  onBlur() {
    if (this.dirty) {
      this.clearValidation();
      this.validate();
    }

    this.blur.emit(this.value);
  }

  validate(): boolean {
    if (this.skipValidate) return true;

    //Rodar todos os prevalidadores antes de validar.
    for (const validator of this.validators) {
      if (validator.preValidate) this.value = validator.preValidate(this.value);
    }

    for (const validator of this.validators) {
      if (
        validator.type === 'default' &&
        validator.validate &&
        !validator.validate(this.value)
      ) {
        this.message = validator.message;
        this.invalid = true;
        break;
      }
    }
    return !this.invalid;
  }

  postValidate() {
    for (const validator of this.validators) {
      if (validator.type === 'post' && !validator.postValidate) {
        this.message = validator.message;
        this.invalid = true;
        break;
      }
    }
  }

  onChange() {
    this.change.emit();
  }

  ngOnChanges() {
    if (this.value) {
      if (this.allowEmoji)
        this._value = this.value.replace(
          /[^\x00-\x7F\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]/g,
          ''
        );
      else this._value = this.value.replace(/[^\x00-\x7F\u00C0-\u00FF]/g, '');

      if (this.forbiddenCharacters.length > 1) {
        for (let i = 0; i < this.forbiddenCharacters.length; i++) {
          const char = this.forbiddenCharacters[i];
          this._value = this.value.replace(new RegExp('\\' + char, 'g'), '');
        }
      }

      this.valueChange.emit(this._value);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHeight();
    }, 100);
  }

  ngOnInit() {
    if (this.maxCounter > 0) {
      this.counterNumber = this.maxCounter;
    }
  }
}
