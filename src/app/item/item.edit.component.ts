import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-item.edit',
  templateUrl: './item.edit.component.html',
  styleUrls: ['./item.edit.component.css']
})
export class ItemEditComponent implements OnInit {

  toSaveItem = new Item();

  items: Item[];

  msgs: Message[] = [];

  cdJogo: number;
  @Input() placar: number;

  placarValidation = false;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const cdJogo = params['cdJogo'];
      if (cdJogo) {
        this.getItem(cdJogo).then(item => {
          this.bindItemOnEdit(item);
        });
      }
    });
  }

  bindItemOnEdit(item) {
    this.cdJogo = item.cdJogo;
    this.placar = item.placar;
  }

  async getItem(cdJogo) {
    return await this.itemService.getItem(cdJogo);
  }

  validar(form: NgForm) {
    this.verificaCamposPreenchidos(form);
    this.salvar(form);
    this.showSuccess();
    form.resetForm();
  }


  verificaCamposPreenchidos(form) {
    this.placarValidation = form.controls.placar.status === 'INVALID';
  }

  redirectToList() {
    this.router.navigate(['/item']);
  }

  salvar(form: NgForm) {
    const placar = form.value.placar;
    this.findAll().then(() => {
      this.toSaveItem.cdJogo = this.cdJogo ? this.cdJogo : this.itemService.getNextCdCode();
      this.toSaveItem.placar = placar;
      this.toSaveItem.minTemporada = this.minTemporada(placar);
      this.toSaveItem.maxTemporada= this.maxTemporada(placar);
      this.toSaveItem.minRecorde = this.minRecorde(placar);
      this.toSaveItem.maxRecorde = this.maxRecorde(placar);
      this.itemService.setItem(this.toSaveItem).then(() => {
        this.cdJogo = null;
        console.log('Salvo com salvar');
      });
    });
    
  }

  async findAll() {
    this.itemService.findAll().then(items => {
      this.items = [
        ...items
      ];
    });
  }

  minTemporada(placar: number) {
    const fakeItem = new Item();
    fakeItem.placar = placar;
    this.items.push(fakeItem);
    const min = this.items.reduce((minValue: Item, num: Item) => {
      return num.placar < minValue.placar ? num : minValue;
    }).placar;
    
    return min;
  }

  maxTemporada(placar: number) {
    const fakeItem = new Item();
    fakeItem.placar = placar;
    this.items.push(fakeItem);
    const max = this.items.reduce((minValue: Item, num: Item) => {
      return num.placar > minValue.placar ? num : minValue;
    }).placar;
    
    return max;
    
  }

  minRecorde(placar: number) {
    return placar == this.minTemporada(placar) ? 1 : 0;
  }

  maxRecorde(placar: number) {
    return placar == this.maxTemporada(placar) ? 1 : 0;
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Operação efetuada', detail: 'Jogo salvo com sucesso!' });
  }

  showWarn(mensagem) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Atenção! ', detail: mensagem });
  }

}
