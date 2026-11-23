import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Monitoramento, Ocorrencia } from '../../core/monitoramento';

@Component({ imports: [DatePipe], templateUrl: './ocorrencias.html', styleUrl: './ocorrencias.css' })
export class Ocorrencias {
  private readonly monitoramento = inject(Monitoramento);
  readonly filtro = signal('Todas');
  readonly id = signal(inject(ActivatedRoute).snapshot.queryParamMap.get('id') ?? 'OC-001');
  readonly descricao = signal('');
  readonly mensagem = signal('');
  readonly lista = computed(() => this.monitoramento.ocorrencias().filter(item => this.filtro() === 'Todas' || item.situacao === this.filtro()));
  readonly selecionada = computed<Ocorrencia | undefined>(() => this.lista().find(item => item.id === this.id()) ?? this.lista()[0]);

  selecionar(id: string) {
    this.id.set(id);
    this.descricao.set('');
    this.mensagem.set('');
  }

  registrar(item: Ocorrencia, situacao: string) {
    const descricao = this.descricao().trim();
    if (!descricao || item.situacao === 'Encerrada') return;
    if (situacao !== 'Em atendimento' && situacao !== 'Encerrada') return;
    this.monitoramento.registrar(item.id, descricao, situacao);
    this.descricao.set('');
    this.mensagem.set('Atendimento registrado.');
  }
}
