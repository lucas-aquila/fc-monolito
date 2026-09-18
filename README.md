# FC Monolito

Projeto desenvolvido com TypeScript seguindo uma arquitetura de monólito modular.

## Pré-requisitos

- Node.js
- npm

## Instalação

Instale as dependências:

```bash
npm install
```

## Testes

Execute todos os testes automatizados:

```bash
npm test
```

O comando também executa a verificação de tipos do TypeScript. Os testes que utilizam persistência usam SQLite em memória, sem necessidade de configurar um banco de dados externo.

## Estrutura

O projeto é organizado em módulos, seguindo o padrão de monólito modular. Cada módulo possui suas próprias camadas de domínio, casos de uso, repositórios, gateways, facades e factories.

Os principais módulos são:

- Client Administration
- Product Administration
- Store Catalog
- Payment
- Invoice

## Módulo de Invoice

O módulo de Invoice é responsável pela geração e consulta de notas fiscais. Sua comunicação pública é feita exclusivamente através da `InvoiceFacade`, criada pela `InvoiceFacadeFactory`.

O módulo inclui:

- Entidades `Invoice` e `InvoiceItem`
- Value Object de endereço
- Casos de uso para geração e consulta de invoices
- Repository com persistência em Sequelize
- Testes unitários, de repository e de integração com a facade
