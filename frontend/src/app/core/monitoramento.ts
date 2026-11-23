import { Injectable, signal } from '@angular/core';

export const bombas = [
  { codigo: 'B-101', nome: 'Bomba de transferência 01', trecho: 'TQ-01 → TQ-02', estado: 'Em operação', vazao: 86.2, entrada: 2.8, saida: 7.4, temperatura: 61, vibracao: 2.4 },
  { codigo: 'B-102', nome: 'Bomba de transferência 02', trecho: 'TQ-02 → TQ-03', estado: 'Em atenção', vazao: 58.4, entrada: 2.2, saida: 6.1, temperatura: 68, vibracao: 3.1 },
  { codigo: 'B-103', nome: 'Bomba de transferência 03', trecho: 'TQ-03 → TQ-04', estado: 'Em atenção', vazao: 79.6, entrada: 2.7, saida: 7.2, temperatura: 72, vibracao: 5.8 },
  { codigo: 'B-104', nome: 'Bomba de transferência 04', trecho: 'TQ-04 → TQ-01', estado: 'Desligada', vazao: 0, entrada: 0, saida: 0, temperatura: 34, vibracao: 0 },
];

export interface Ocorrencia {
  id: string;
  bomba: string;
  titulo: string;
  prioridade: 'Alta' | 'Média';
  hora: string;
  justificativa: string;
  verificacao: string;
  situacao: 'Aberta' | 'Em atendimento' | 'Encerrada';
  registros: { descricao: string; data: string }[];
}

const iniciais: Ocorrencia[] = [
  { id: 'OC-001', bomba: 'B-103', titulo: 'Vibração acima da faixa', prioridade: 'Alta', hora: '10:42', justificativa: 'A vibração atingiu 5,8 mm/s durante a operação e permaneceu acima da faixa simulada.', verificacao: 'Conferir a indicação do sensor de vibração e comparar com o histórico da bomba.', situacao: 'Aberta', registros: [] },
  { id: 'OC-002', bomba: 'B-102', titulo: 'Vazão abaixo da referência', prioridade: 'Média', hora: '10:28', justificativa: 'A vazão caiu para 58,4 m³/h com a bomba em operação.', verificacao: 'Verificar a consistência da leitura de vazão e compará-la com as pressões registradas.', situacao: 'Aberta', registros: [] },
];

@Injectable({ providedIn: 'root' })
export class Monitoramento {
  private readonly chave = 'prisma-ocorrencias-v1';
  private readonly dados = signal(this.carregar());
  readonly ocorrencias = this.dados.asReadonly();

  registrar(id: string, descricao: string, situacao: Ocorrencia['situacao']) {
    const registros = this.dados().map(item => item.id === id
      ? { ...item, situacao, registros: [...item.registros, { descricao, data: new Date().toISOString() }] }
      : item);
    this.dados.set(registros);
    try {
      localStorage.setItem(this.chave, JSON.stringify(registros));
    } catch {
      // O atendimento segue disponível na sessão quando o navegador bloqueia o armazenamento.
    }
  }

  private carregar(): Ocorrencia[] {
    try {
      const salvo = localStorage.getItem(this.chave);
      return salvo ? JSON.parse(salvo) : iniciais;
    } catch {
      return iniciais;
    }
  }
}
