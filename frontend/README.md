# Front-end do Monitoramento Prisma

Aplicação Angular 21 com TypeScript, componentes standalone, roteamento e SCSS.

## Rodar localmente

Use Node.js 20.19+, 22.12+ ou 24.x dentro das respectivas linhas e o npm. A partir da raiz do repositório:

```bash
cd frontend
npm ci
npm start
```

Abra [localhost:4200](http://localhost:4200). Use `npm run build` para compilar e `npm test -- --watch=false` para executar os testes uma vez.

## Onde desenvolver

| Pasta em `src/app` | Uso previsto |
| --- | --- |
| `features/painel/` | Visão geral da operação |
| `features/bombas/` | Estado e leituras das bombas |
| `features/ocorrencias/` | Desvios, prioridade, verificações e registro do atendimento |
| `core/` | Serviços e configuração usados pela aplicação inteira |
| `shared/` | Componentes reutilizados entre funcionalidades |

O arquivo `src/app/app.routes.ts` concentra as rotas. Registre cada tela ali quando ela for criada. Os estilos globais ficam em `src/styles.scss`.
