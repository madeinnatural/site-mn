import { CurrencyPipe } from '@angular/common';

// Todos os validadores devem implementar MnValidator.
// Todos os validadores devem ter message padrão.
// Validate do tipo post devem implementar o validate retornando true e implementar obrigatoriamente o postValidate
export interface MnValidator {
   message: string;
   params?: any;
   readonly type: 'default' | 'post'; // post: validador que funciona após o post
   postValidate?: boolean;
   preValidate?: (value: string) => string;
   validate?(value: string): boolean;
}

export class RequiredValidator implements MnValidator {
   readonly type = 'default';
   message = 'Campo obrigatório.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) { return true; } else { return false; }
   }
}

export class NumericValidator implements MnValidator {
   readonly type = 'default';
   message = 'O campo só aceita valores numéricos.';
   constructor (message?: string) {
      if (message) { this.message = message };
   }

   validate(value: any): boolean {
      return !isNaN(value);
   }
}

export class MinValidator implements MnValidator {
   readonly type = 'default';
   message = 'O valor mínimo é #';
   private currencyPipe = new CurrencyPipe("pt-BR");
   
   constructor (public params: string, message?: string) {
      if (message) { this.message = message };
      this.message = this.message.replace('#', this.currencyPipe.transform(parseFloat(params), "R$ ", "code", "1.2-2", "pt-BR") || "");
   }

   validate(value: string): boolean {
      return parseFloat(value.replace("R$ ", "").replace(".","").replace(",",".")) >= parseFloat(this.params);
   }
}

export class IntervalValidator implements MnValidator {
   readonly type = 'default';
   message = 'O valor deve ser entre #1 e #2';

   constructor (public min: number | string, public max: number | string, message?: string) {
      if (message) this.message = message;
      this.message = this.message.replace("#1", min.toString()).replace("#2", max.toString());
   }

   validate(value: string): boolean {
      let x = parseFloat(value);
      return this.min <= x && x <= this.max;
   }
}

export class AlfanumericValidator implements MnValidator {
   readonly type = 'default';
   message = 'O campo só aceita letras e números.'
   constructor (message?: string) {
      if (message) { this.message = message };
   }

   validate(value: string): boolean {
      return value.replace(/[\d\w ]/g, "").length == 0;
   }
}

export class MinLenghtValidator implements MnValidator {
   readonly type = 'default';
   message = 'Deve possuir no mínimo # dígitos.';
   // params = tamaho minimo
   constructor (public params: number, message?: string) {
      if (message) { this.message = message; }
      this.message = this.message.replace('#', params.toString());
   }

   validate(value: string): boolean{
      if (value.length < this.params) { return false; } else { return true; }
   }
}

export class MaskedMinLenghtValidator extends MinLenghtValidator{
   override validate(value: string): boolean{
      return super.validate(value.replace(/_/g,""));
   }
}

export class NameValidator implements MnValidator {
   readonly type = 'default';
   message = 'Insira sobrenome.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   preValidate(name: string) {
      return name.split(" ").filter(char => char != "").join(" ");
   }

   validate(value: string): boolean {
      // if (value && value.match(/[A-z][A-z]* [A-z][A-z]*/g)) { return true; } else { return false; }
      if (value && value.match(/[A-z][A-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]* [A-z][A-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]*/g)) { return true; } else { return false; }
   }
}

export class EmailValidator implements MnValidator {
   readonly type = 'default';
   message = 'E-mail inválido.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value && value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)) { return true; } else { return false; } // tslint:disable-line
   }
}

export class MaybeEmailValidator extends EmailValidator {
   override validate(value: string): boolean {
      if (value.includes('@')) { return super.validate(value); } else { return true; }
   }
}

export class PhoneValidator implements MnValidator {
   readonly type = 'default';
   message = 'Insira 11 dígitos.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value && value.replace(/[.-\s)(_]/g, '').substring(0, 1) == "0") {
         this.message = 'O telefone não deve iniciar com zero.';
         return false;
      } else {
         this.message = 'Insira 11 dígitos.';
      }
      if (value && value.replace(/[.-\s)(_]/g, '').length === 11) { return true; } else { return false; }
   }
}

export class CVVValidator implements MnValidator {
   readonly type = 'default';
   message = 'CVV inválido.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value && value.match(/^\d{3,4}$/g)) { return true; } else { return false; }
   }
}

export class ShortDateValidator implements MnValidator {
   readonly type = 'default';
   message = 'Data inválida.';
   constructor (message?: string) {




      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         if (value.replace('_', '').length < 8) { return false; }

         const parsedDate = value.split('/');
         if (parsedDate.length === 3) {
            const day = parseInt(parsedDate[0], 10);
            const month = parseInt(parsedDate[1], 10);
            const year = parseInt("20" + parsedDate[2], 10);

            if (year <= 0 || month <= 0 || month > 12) {
               return false;
            }

            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
               monthLength[1] = 29;
            }

            return day > 0 && day <= monthLength[month - 1];
         } else return false;
      } else { return true; }
   }
}

export class FullDateValidator implements MnValidator {
   readonly type = 'default';
   message = 'Data inválida.';
   
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         let exploded;

         if(value.includes('às')) {
            exploded = value.split(' às ');
         } else {
            exploded = value.split(' ');
         }

         let date = exploded[0];
         let hour = exploded[1];

         if (date.replace('_', '').length < 8 || hour.replace('_', '').length < 5) { return false; }

         const parsedDate = date.split('/');
         if (parsedDate.length === 3) {
            const day = parseInt(parsedDate[0], 10);
            const month = parseInt(parsedDate[1], 10);
            const year = parseInt("20" + parsedDate[2], 10);

            if (year <= 0 || month <= 0 || month > 12) {
               return false;
            }

            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
               monthLength[1] = 29;
            }

            return day > 0 && day <= monthLength[month - 1];
         }

         const parsedHour = hour.split(':');
         if (parsedHour.length === 2) {
            const hour = parseInt(parsedHour[0], 10);
            const minute = parseInt(parsedHour[1], 10);

            if (hour < 0 || minute < 0 || hour > 23 || minute > 59) {
               this.message = 'Hora inválida.';
               return false;
            }

            return true;
         }

         return false;
      } else { return true; }
   }
}

export class DateValidator implements MnValidator {
   readonly type = 'default';
   message = 'Data inválida.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         if (value.replace('_', '').length < 10) { return false; }

         const parsedDate = value.split('/');
         if (parsedDate.length === 3) {

               const day = parseInt(parsedDate[0], 10);
               const month = parseInt(parsedDate[1], 10);
               const year = parseInt(parsedDate[2], 10);

               if (year <= 0 || month <= 0 || month > 12) {
                  return false;
               }

               const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
               if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                  monthLength[1] = 29;
               }

               return day > 0 && day <= monthLength[month - 1];
         } else return false;
      } else { return false; }
   }
}

export class HourValidator implements MnValidator {
   readonly type = 'default';
   message = 'Hora inválida.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         if (value.replace('_', '').length < 5) { return false; }

         const parsedDate = value.split(':');
         if (parsedDate.length === 2) {
            const hour = parseInt(parsedDate[0], 10);
            const minute = parseInt(parsedDate[1], 10);

            if (hour < 0 || minute < 0 || hour > 23 || minute > 59) {
               return false;
            }

            return true;
         } else return false;
      } else { return true; }
   }
}

export class CardDateValidator implements MnValidator {
   readonly type = 'default';
   message = 'Validade inválida. ;)';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         const parsedDate = value.split('/');
         if (parsedDate.length === 2) {

            let month = parseInt(parsedDate[0], 10);
            let year = parseInt(parsedDate[1], 10);

            if (year <= 0 || month <= 0 || month > 12) {
               return false;
            }

            month = month - 1;
            year = 2000 + year;

            const today = new Date();
            if (year === today.getFullYear()) {

               if (month < today.getMonth()) {
                  return false;
               } else { return true; }

            } else if (year > today.getFullYear()) {
               return true;
            } else { return false; }
         } else return false;
      } else { return false; }
   }
}

export class CPFValidator implements MnValidator {
   readonly type = 'default';
   message = 'CPF inválido.';
   constructor (message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      if (value) {
         if (['000.000.000-00', '111.111.111-11', '222.222.222-22', '333.333.333-33', '444.444.444-44',
            '555.555.555-55', '666.666.666-66', '888.888.888-88', '999.999.999-99'].includes(value)) {
            return false;
         }

         const cpf = value.replace(/\D/g, '');
         if (cpf === '') { return false; }

         if (cpf.length === 11) {
            const digits = cpf.split('').map(n => parseInt(n, 10));

            let result = digits[0] * 10 + digits[1] * 9 + digits[2] * 8 + digits[3] * 7 +
               digits[4] * 6 + digits[5] * 5 + digits[6] * 4 + digits[7] * 3 + digits[8] * 2;

            let remaining = result * 10 % 11;
            if (remaining >= 10) { remaining = remaining % 10; }

            if (remaining === digits[9]) {
               result = digits[0] * 11 + digits[1] * 10 + digits[2] * 9 + digits[3] * 8 + digits[4] * 7 +
                  digits[5] * 6 + digits[6] * 5 + digits[7] * 4 + digits[8] * 3 + digits[9] * 2;

               remaining = result * 10 % 11;
               if (remaining >= 10) { remaining = remaining % 10; }

               if (remaining === digits[10]) {
                  return true;
               }
            }
         }
      }
      return false;
   }
}

export class CNPJValidator implements MnValidator {
   readonly type = "default";
   message = "CNPJ Inválido";
   constructor(message?: string) {
      if (message) { this.message = message; }
   }

   validate(value: string): boolean {
      const cnpj = value.replace(/[^\d]+/g,'');
 
      if(cnpj == '') return false;
      
      if (cnpj.length != 14)
         return false;
   
      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" || 
         cnpj == "11111111111111" || 
         cnpj == "22222222222222" || 
         cnpj == "33333333333333" || 
         cnpj == "44444444444444" || 
         cnpj == "55555555555555" || 
         cnpj == "66666666666666" || 
         cnpj == "77777777777777" || 
         cnpj == "88888888888888" || 
         cnpj == "99999999999999")
         return false;
            
      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0,tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
         soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
         if (pos < 2)
               pos = 9;
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(0)))
         return false;
            
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
         soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
         if (pos < 2)
               pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(1)))
            return false;
            
      return true;
   }
}

export class CPFCNPJValidator implements MnValidator {
   readonly type = "default";
   message: string = "";

   private cpfMessage = "CPF Inválido";
   private cnpjMessage = "CNPJ Inválido";

   private cpfValidator = new CPFValidator();
   private CNPJValidator = new CNPJValidator();

   constructor(cpfMessage?: string, cnpjMessage?: string) {
      if (cpfMessage) { this.cpfMessage = cpfMessage; }
      if (cnpjMessage) { this.cnpjMessage = cnpjMessage; }
   }

   validate(value: string): boolean {
      const cpf = value.replace(/\D/g, '');
      let valid = false;

      if (cpf.length <= 11) {
         valid = this.cpfValidator.validate(cpf);
         this.message = this.cpfMessage;
      } else {
         valid = this.CNPJValidator.validate(cpf);
         this.message = this.cnpjMessage;
      }

      return valid;
   }

}

export enum ValidatorEnum {
   required = 'required',
   numeric = 'numeric',
   min = 'min',
   interval = 'interval',
   alfanumeric = 'alfanumeric',
   minlenght = 'minlenght',
   maskedminleght = 'maskedminleght',
   name = 'name',
   email = 'email',
   emailvalid = 'email?',
   phone = 'phone',
   cvv = 'cvv',
   shortDate = 'shortDate',
   date = 'date',
   hour = 'hour',
   fullDate = 'fullDate',
   carddate = 'carddate',
   cpf = 'cpf',
   cnpj = 'cnpj',
   cpfcnpj = 'cpfcnpj'
}

// A cada validador criado deve-se atualizar o factory.
// Não é obrigatório criar chamadas simples para todos os validadores.
export class ValidatorFactory {
   /* Parametro sempre recebe Array, os dados pode vir:
      1: String - "required"
      2: Array - [nome,message?,params?]
      3: Objeto - {nome:"", params:"", message:""}
      4: MnValidator
   */
   static getValidators(validators: Array<ValidatorEnum | Array<ValidatorEnum|string|any> | Validator | MnValidator>): MnValidator[] {
      const response: MnValidator[] = [];
      for (let validator of validators) {
         if (validator instanceof Array) { // transformando array no objeto

            if (validator.length === 1) {
               validator = {name: validator[0]};
            } else if (validator.length === 2) {
               validator = {name: validator[0], message: validator[1]};
            } else if (validator.length === 3) {
               validator = {name: validator[0], message: validator[1], params: validator[2]};
            }

         }

         if (typeof validator === 'string') {// transforma string em objeto
            validator = {name: validator};
         }
         // se um custom validator for enviado adiciona
         if (this.instanceOfMnValidator(validator)) {
            response.push(validator);
            continue;
         }

         if (this.instanceOfValidator(validator)) {
            switch (validator.name) {
               case ValidatorEnum.required: {
                  response.push(new RequiredValidator(validator.message));
                  break;
               }
               case ValidatorEnum.numeric: {
                  response.push(new NumericValidator(validator.message));
                  break;
               }
               case ValidatorEnum.min: {
                  response.push(new MinValidator(validator.params, validator.message));
                  break;
               }
               case ValidatorEnum.alfanumeric: {
                  response.push(new AlfanumericValidator(validator.message));
                  break;
               }
               case ValidatorEnum.minlenght: {
                  response.push(new MinLenghtValidator(validator.params, validator.message));
                  break;
               }
               case ValidatorEnum.maskedminleght: {
                  response.push(new MaskedMinLenghtValidator(validator.params, validator.message));
                  break;
               }
               case ValidatorEnum.name: {
                  response.push(new NameValidator(validator.message));
                  break;
               }
               case ValidatorEnum.emailvalid: {
                  response.push(new MaybeEmailValidator(validator.message));
                  break;
               }
               case ValidatorEnum.email: {
                  response.push(new EmailValidator(validator.message));
                  break;
               }
               case ValidatorEnum.phone: {
                  response.push(new PhoneValidator(validator.message));
                  break;
               }
               case ValidatorEnum.cvv: {
                  response.push(new CVVValidator(validator.message));
                  break;
               }
               case ValidatorEnum.shortDate: {
                  response.push(new ShortDateValidator(validator.message));
                  break;
               }
               case ValidatorEnum.fullDate: {
                  response.push(new FullDateValidator(validator.message));
                  break;
               }
               case ValidatorEnum.date: {
                  response.push(new DateValidator(validator.message));
                  break;
               }
               case ValidatorEnum.hour: {
                  response.push(new HourValidator(validator.message));
                  break;
               }
               case ValidatorEnum.carddate: {
                  response.push(new CardDateValidator(validator.message));
                  break;
               }
               case ValidatorEnum.cpf: {
                  response.push(new CPFValidator(validator.message));
                  break;
               }
               case ValidatorEnum.cnpj: {
                  response.push(new CNPJValidator(validator.message));
                  break;
               }
               case ValidatorEnum.cpfcnpj: {
                  let messages = ["", ""];
                  if (validator.message) messages = validator.message.split(',');
                  response.push(new CPFCNPJValidator(messages[0], messages[1]));
                  break;
               }

               default: {
                  alert('validador não encontrado: ' + validator.name);
                  break;
               }
            }
         }
      }
      return response;
   }

   static instanceOfValidator(val: any): val is Validator {
      if (val.name) {
         return true;
      }

      return false;
   }

   static instanceOfMnValidator(val: any): val is MnValidator {
      if (val.type === 'default' || val.type === 'post') {
         return true;
      }

      return false;
   }
}

export interface Validator {
   name: string;
   params?: any;
   message?: string;
}
