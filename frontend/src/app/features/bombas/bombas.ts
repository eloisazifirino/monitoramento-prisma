import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bombas } from '../../core/monitoramento';

@Component({ imports: [DecimalPipe], templateUrl: './bombas.html', styleUrl: './bombas.css' })
export class Bombas {
  readonly filtro = signal('Todas');
  readonly selecionada = inject(ActivatedRoute).snapshot.queryParamMap.get('bomba');
  readonly lista = computed(() => bombas.filter(bomba => this.filtro() === 'Todas' || bomba.estado === this.filtro()));
}
