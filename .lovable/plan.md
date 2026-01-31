
# Plano: Split de Tráfego A/B 50/50

## Objetivo
Dividir aleatoriamente o tráfego que chega em `ab1colageno.renovabe.com.br` em 50% para a página A (`/`) e 50% para a página B (`/versao-b`).

## Como Funcionará

```
Usuário acessa ab1colageno.renovabe.com.br
              ↓
    Tem cookie "ab_variant"?
              ↓
    ┌─────────┴─────────┐
   SIM                 NÃO
    ↓                   ↓
  Usa o valor      Sorteia 50/50
  já salvo         Salva no cookie
    ↓                   ↓
    └─────────┬─────────┘
              ↓
      variant === "B"?
              ↓
    ┌─────────┴─────────┐
   SIM                 NÃO
    ↓                   ↓
 Redireciona       Permanece na
 para /versao-b     página /
```

## Mudanças Necessárias

### Arquivo: `index.html`

Adicionar dois scripts no `<head>` (antes do GTM para garantir execução rápida):

**1. Script de A/B Split** - Executa antes de qualquer conteúdo carregar:
- Verifica se existe cookie `ab_variant`
- Se não existir, sorteia 50/50 e salva no cookie (30 dias)
- Se variante = B e usuário está em `/`, redireciona para `/versao-b`
- Suporta parâmetro `?force_variant=A` ou `?force_variant=B` para testes

**2. Script de Tracking** - Expõe variante no dataLayer para GTM:
- Disponibiliza `ab_variant` (A ou B) para análise
- Disponibiliza `ab_test_name` para identificar o teste

## Comportamento Esperado

| Cenário | Resultado |
|---------|-----------|
| Primeira visita em `/` | 50% chance de ficar, 50% vai para `/versao-b` |
| Retorno com cookie A | Sempre vê página A (`/`) |
| Retorno com cookie B | Sempre vê página B (`/versao-b`) |
| Acesso direto a `/versao-b` | Permanece na versão B (sem redirect) |
| URL com `?force_variant=B` | Força versão B (útil para testes) |
| Limpar cookies | Nova escolha 50/50 |

## Detalhes Técnicos

- **Script síncrono no `<head>`**: Executa ANTES do React carregar, evitando flash visual
- **`window.location.replace()`**: Não adiciona entrada no histórico do navegador
- **Cookie com `path=/`**: Funciona em todas as rotas do site
- **Cookie de 30 dias**: Tempo suficiente para duração do teste A/B
- **Só executa em `/`**: Acessos diretos a `/versao-b` não são afetados

## Integração com Analytics

A variante será enviada para o GTM via dataLayer, permitindo:
- Segmentar relatórios por versão A/B
- Comparar conversões entre versões
- Criar eventos específicos por variante

## Arquivo a Modificar
1. `index.html` - Adicionar scripts de split e tracking no `<head>`
