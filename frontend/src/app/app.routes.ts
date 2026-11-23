import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Visão geral | Prisma', loadComponent: () => import('./features/painel/painel').then(m => m.Painel) },
  { path: 'bombas', title: 'Bombas | Prisma', loadComponent: () => import('./features/bombas/bombas').then(m => m.Bombas) },
  { path: 'ocorrencias', title: 'Ocorrências | Prisma', loadComponent: () => import('./features/ocorrencias/ocorrencias').then(m => m.Ocorrencias) },
  { path: '**', redirectTo: '' },
];
