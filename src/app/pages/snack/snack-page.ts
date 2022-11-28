import { OnInit, Component} from '@angular/core';
import { Snack } from 'src/app/core/model/interfaces/Product';
import { SnackService } from './../../core/services/SnackService';

@Component({
  templateUrl: './snack-page.html',
  styleUrls: ['./snack-page.scss']
})
export class SnackPage implements OnInit {

  snackList: Snack[] = [];

  constructor(
    public sanckService: SnackService,
  ) {
  }

  async ngOnInit() {
    await this.refresh()
  }

  async refresh() {
    await this.sanckService.refresh();
    this.snackList = this.sanckService.productInCart;
  }

}

