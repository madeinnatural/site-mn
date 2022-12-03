import { SnackProduct } from './../../core/model/interfaces/Product';
import { OnInit, Component} from '@angular/core';
import { Snack } from 'src/app/core/model/interfaces/Product';
import { SnackService } from '../../core/services/SnackService';

@Component({
  templateUrl: './snack-page.component.html',
  styleUrls: ['./snack-page.component.scss']
})
export class SnackPage {

  constructor(
    public sanckService: SnackService,
  ) {
  }

  async ngOnInit() {
    this.sanckService.refresh();
  }


}

