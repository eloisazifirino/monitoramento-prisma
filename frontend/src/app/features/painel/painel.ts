import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bombas, Monitoramento } from '../../core/monitoramento';

@Component({
  imports: [RouterLink],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  readonly bombas = bombas;
  readonly abertas = computed(() => this.monitoramento.ocorrencias().filter(item => item.situacao !== 'Encerrada'));
  readonly faixa = signal('6');
  readonly horas = computed(() => this.faixa() === '6' ? ['05h', '06h', '07h', '08h', '09h', '10h'] : ['23h', '01h', '03h', '05h', '07h', '10h']);
  readonly curvas = computed(() => this.faixa() === '6'
    ? [67, 69, 66, 74, 81, 76, 89, 82, 90, 86, 92, 86]
    : [49, 55, 51, 63, 60, 67, 69, 74, 81, 76, 90, 86]);
  private readonly monitoramento = inject(Monitoramento);
}
