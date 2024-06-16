import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ItemCarrinho } from '../model/itemcarrinho.model';
import { Carro } from '../model/carro.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carroCarrinho!: Carro
  private carrinhoSubject = new BehaviorSubject<Carro[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(carro: Carro): void {
    let carrinhoAtual = this.carrinhoSubject.value;

    if(carrinhoAtual.length > 0){
      carrinhoAtual = [];
    }
    carrinhoAtual.push({
      ...carro,
    });

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  removerTudo(): void {
    this.localStorageService.removeItem('carrinho');
    window.location.reload(); // reload na página
  }

  remover(carro: Carro): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(itemCarrinho => itemCarrinho !== carro);

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  obter(): Carro[] {
    return this.carrinhoSubject.value;
    
  }

  obterQuantidade(): number {
    console.log(this.carrinhoSubject.value.length);
    return this.carrinhoSubject.value.length;
  }

  private atualizarArmazenamentoLocal(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinhoSubject.value));
  }

  setCarroCarrinho(carroCarrinho: Carro) {
    this.carroCarrinho = carroCarrinho;
  }

  getCarroCarrinho() {
    return this.carroCarrinho;
  }
}
