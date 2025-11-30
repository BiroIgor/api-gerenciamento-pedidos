# TESTE TEÓRICO - RESPOSTAS

**Nome do Candidato(a):** Igor Gottscheffsky Pereira  
**Telefone:** 55 55 991406694  
**LinkedIn:** /igor-gottscheffsky-pereira-b897621a3/  
**Data:** 28/11/2025

---

## JavaScript

### 1. Qual é o operador lógico usado para verificar a negação de uma expressão? (Nota: 0,2)

c) !

---

### 2. Qual dos seguintes métodos é usado para adicionar um elemento ao final de um array? (Nota: 0,2)

a) push()

---

### 3. O que o método "Array.map()" faz? (Nota: 0,2)

b) Mapeia os elementos de um array para um novo array com base em uma função de mapeamento.

---

### 4. Qual é a função do método "Array.filter()"? (Nota: 0,2)

b) Remover elementos do array com base em uma função de filtro.

---

### 5. O que é async/await em JavaScript? (Nota: 0,2)

c) Um conjunto de palavras-chave que tornam as funções assíncronas mais legíveis e fáceis de usar.

---

### 6. Qual é a sintaxe correta para definir uma função assíncrona chamada "getData"? (Nota: 0,2)

c) async function getData() { return new Promise({}); }

---

### 7. O que será impresso no código abaixo? (Nota: 0,6)

```javascript
let palavra = "ABC";
switch (palavra) {
    case "ACB":
        console.log("C");
        break;
    case "BC":
    case "ABC":
        console.log("A");
        break;
    case "B":
        console.log("Hello");
        break;
    default:
        console.log("Palavra não encontrada");
        break;
}
```

b) A.

---

### 8. Escreva uma função em JavaScript chamada "somaImpares" que recebe um número inteiro positivo "n" como parâmetro e retorna a soma de todos os números ímpares de 1 até n. (Nota: 0,6)

```javascript
function somaImpares(n) {
    let soma = 0;
    for (let i = 1; i <= n; i += 2) {
        soma += i;
    }
    return soma;
}

// Exemplos:
somaImpares(5);  // Saída esperada: 9 (1 + 3 + 5)
somaImpares(10); // Saída esperada: 25 (1 + 3 + 5 + 7 + 9)
```

---

### 9. Escreva uma função chamada "inverterPalavra" que recebe uma string como parâmetro e retorna a string com as letras invertidas. (Nota: 0,6)

```javascript
function inverterPalavra(palavra) {
    return palavra.split('').reverse().join('');
}

// Exemplo:
inverterPalavra("javascript"); // Saída esperada: "tpircsavaj"
```

---

### 10. Considere o seguinte trecho de código em JavaScript que tenta realizar a divisão de dois números: (Nota: 0,6)

```javascript
function dividirNumeros(number1, number2) {
    try {
        if (number2 === 0) {
            throw new Error("Divisão por zero não é permitida.");
        }
        return number1 / number2;
    } catch (error) {
        return "Erro: " + error.message;
    }
}
```

Escreva abaixo o resultado retornado por cada função:

a) `console.log(dividirNumeros(20, 2));`  
   10

b) `console.log(dividirNumeros(6, 0));`  
   "Erro: Divisão por zero não é permitida."

c) `console.log(dividirNumeros(21, 3));`  
   7

---

### 11. Como você pode percorrer e mapear um array JSON em JavaScript? Explique como usar métodos como "map", "forEach" ou "for...of" para iterar e manipular os elementos do array. (Nota: 0,7)

Em JavaScript, existem várias formas de percorrer e manipular arrays JSON:

#### 1. **map()** - Retorna um novo array transformado
```javascript
const dados = [{nome: "João", idade: 30}, {nome: "Maria", idade: 25}];
const idades = dados.map(item => item.idade); // [30, 25]
const nomes = dados.map(item => item.nome.toUpperCase()); // ["JOÃO", "MARIA"]
```
O método `map()` é ideal para transformações, pois retorna um novo array com os elementos modificados.

#### 2. **forEach()** - Executa ação para cada elemento (não retorna valor)
```javascript
dados.forEach(item => {
    console.log(item.nome); // Executa ação, mas não retorna novo array
});
```
O método `forEach()` é usado quando você precisa executar uma ação para cada elemento, mas não precisa de um novo array.

#### 3. **for...of** - Sintaxe moderna, itera sobre valores diretamente
```javascript
for (const item of dados) {
    console.log(item);
}
```
O loop `for...of` oferece uma sintaxe mais limpa e moderna para iterar sobre os valores do array.

**Resumo:** Use `map()` quando precisar transformar e retornar um novo array, `forEach()` para executar ações sem retorno, e `for...of` para loops simples e legíveis.

---

### 12. O que são variáveis em JavaScript? Explique como declarar e atribuir valores a uma variável. (Nota: 0,7)

Variáveis são containers que armazenam valores de dados, permitindo guardar e manipular informações durante a execução do programa.

Em JavaScript, existem três formas de declarar variáveis:

#### 1. **var** (escopo de função)
```javascript
var nome = "Igor";
var idade = 29;
```
- Escopo de função (function-scoped)
- Pode ser redeclarada e reatribuída
- Hoisting ocorre

#### 2. **let** (escopo de bloco)
```javascript
let idade = 29;
let email = "igor@example.com";
```
- Escopo de bloco (block-scoped)
- Pode ser reatribuída, mas não redeclarada no mesmo escopo
- Introduzida no ES6

#### 3. **const** (escopo de bloco, imutável)
```javascript
const PI = 3.14159;
const API_URL = "https://api.example.com";
```
- Escopo de bloco
- Não pode ser reatribuída após a declaração inicial
- Deve ser inicializada no momento da declaração
- Ideal para valores constantes

**Exemplo completo:**
```javascript
var nome = "Igor";        // Escopo de função
let idade = 29;           // Escopo de bloco
const PI = 3.14159;       // Constante
```

---

### 13. Em JavaScript, é possível ter múltiplas condições em uma estrutura "if/else"? Descreva como usar operadores lógicos (como "&&" e "||") para combinar condições. (Nota: 0,6)

Sim, é totalmente possível ter múltiplas condições em estruturas `if/else` usando operadores lógicos:

#### **Operador AND (&&)** - Todas as condições devem ser verdadeiras
```javascript
if (idade >= 18 && temCarteira) {
    console.log("Pode dirigir");
}

if (idade >= 18 && temCarteira && !bebeu) {
    console.log("Pode dirigir");
}
```

#### **Operador OR (||)** - Pelo menos uma condição deve ser verdadeira
```javascript
if (idade < 18 || idade > 65) {
    console.log("Desconto aplicado");
}
```

#### **Operador NOT (!)** - Inverte o valor booleano
```javascript
if (!estaLogado) {
    console.log("Faça login");
}
```

#### **Combinações complexas**
```javascript
if ((idade >= 18 && temCarteira) || (idade >= 16 && temPermissao)) {
    console.log("Pode dirigir");
}

if (idade >= 18 && (temCarteira || temPermissao) && !bebeu) {
    console.log("Pode dirigir");
}
```

**Ordem de precedência:** `!` > `&&` > `||` (use parênteses para garantir a ordem desejada).

---

### 14. Descreva a sintaxe do bloco "try" em JavaScript. Dê um exemplo prático de como usar o "try" para envolver um código suscetível a erros. (Nota: 0,7)

O bloco `try/catch/finally` em JavaScript é usado para tratamento de erros e permite executar código que pode gerar exceções de forma segura.

#### **Sintaxe básica:**
```javascript
try {
    // Código que pode gerar erro
} catch (error) {
    // Tratamento do erro
} finally {
    // Código que sempre executa (opcional)
}
```

#### **Exemplo prático:**
```javascript
try {
    const dados = JSON.parse(jsonString);
    console.log("JSON válido:", dados);
} catch (error) {
    console.error("Erro ao fazer parse:", error.message);
}
```

#### **Exemplo mais completo:**
```javascript
function processarDados(jsonString) {
    try {
        // Tentativa de fazer parse do JSON
        const dados = JSON.parse(jsonString);
        
        // Validação adicional
        if (!dados.nome) {
            throw new Error("Nome é obrigatório");
        }
        
        console.log("Dados processados:", dados);
        return dados;
        
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("Erro de sintaxe JSON:", error.message);
        } else {
            console.error("Erro ao processar:", error.message);
        }
        return null;
    } finally {
        console.log("Processamento finalizado");
    }
}
```

O bloco `try` permite que o código continue executando mesmo se ocorrer um erro, graças ao tratamento no bloco `catch`.

---

### 15. Como você pode lançar manualmente uma exceção em JavaScript? Explique o uso da palavra-chave "throw" para criar e lançar exceções personalizadas. (Nota: 0,7)

A palavra-chave `throw` é usada para lançar manualmente exceções em JavaScript, permitindo criar erros personalizados quando condições específicas não são atendidas.

#### **Sintaxe básica:**
```javascript
throw new Error("Mensagem de erro");
```

#### **Exemplos práticos:**

**1. Validação de dados:**
```javascript
function criarUsuario(dados) {
    if (!dados.nome || dados.nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }
    
    if (!dados.email || !dados.email.includes("@")) {
        throw new Error("Email inválido");
    }
    
    return { id: Date.now(), ...dados };
}
```

**2. Validação de parâmetros:**
```javascript
function dividir(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Ambos os parâmetros devem ser números");
    }
    
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida");
    }
    
    return a / b;
}
```

**3. Tipos de erros personalizados:**
```javascript
// Erro personalizado
class ErroValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "ErroValidacao";
    }
}

function validarIdade(idade) {
    if (idade < 0) {
        throw new ErroValidacao("Idade não pode ser negativa");
    }
    if (idade > 150) {
        throw new ErroValidacao("Idade inválida");
    }
}
```

**4. Uso com try/catch:**
```javascript
try {
    const usuario = criarUsuario({ nome: "", email: "teste" });
} catch (error) {
    console.error("Erro ao criar usuário:", error.message);
}
```

O `throw` interrompe a execução normal e transfere o controle para o bloco `catch` mais próximo.

---

## SQL

### 1. Como você seleciona todas as colunas de uma tabela em SQL? (Nota: 0,2)

b) SELECT *

---

### 2. Qual é o comando SQL utilizado para filtrar resultados em uma consulta? (Nota: 0,2)

d) WHERE

---

### 3. Qual é o comando SQL utilizado para ordenar os resultados de uma consulta em ordem ascendente? (Nota: 0,2)

d) ORDER BY

---

### 4. Qual é o comando SQL utilizado para inserir novos dados em uma tabela? (Nota: 0,2)

b) INSERT

---

### 5. Qual é o comando SQL utilizado para atualizar dados em uma tabela? (Nota: 0,2)

b) UPDATE

---

## Integração de Sistemas

### 1. O que é integração de sistemas? (Nota: 0,2)

a) É um processo de comunicação entre diferentes sistemas de computador para permitir o compartilhamento de dados e funcionalidades.

---

### 2. O que significa API (Interface de Programação de Aplicativos) em integração de sistemas? (Nota: 0,2)

c) Um conjunto de funções e procedimentos que permitem a comunicação entre sistemas.

---

### 3. O que é um Web Service? (Nota: 0,2)

c) É uma solução para conectar sistemas diferentes via web, usando padrões como XML e SOAP.

---

### 4. O que é um token de acesso em integração de sistemas? (Nota: 0,2)

c) Uma chave de autenticação usada para autorizar o acesso a um serviço.

---

### 5. O que é um "webhook" na integração de sistemas? (Nota: 0,2)

d) É uma URL pública fornecida por um sistema para receber notificações automáticas de outro sistema.

---

### 6. O que é JSON? (Nota: 0,2)

c) Um formato de dados leve e de fácil leitura usado para trocar informações entre sistemas.

---

### 7. Qual é o código de status HTTP que indica sucesso na solicitação? (Nota: 0,2)

a) 200 OK.

---

### 8. O que são headers HTTP? (Nota: 0,2)

b) Informações adicionais enviadas pelo cliente e servidor em uma solicitação ou resposta HTTP.

---

### 9. Quais são os delimitadores usados para marcar tags em XML? (Nota: 0,2)

d) < >

---

### 10. Qual é a diferença entre integração de sistemas síncrona e assíncrona? (Nota: 0,2)

a) Na síncrona, a comunicação ocorre em tempo real com respostas imediatas, enquanto na assíncrona, a resposta pode ser recebida em um momento posterior.

---

## DESAFIO PRÁTICO

### Link do Repositório GitHub

**🔗 https://github.com/BiroIgor/api-gerenciamento-pedidos**

### Resumo da Implementação

A API foi desenvolvida seguindo os requisitos do desafio:

✅ **Endpoints Implementados:**
- ✅ POST `/order` - Criar novo pedido (Obrigatório)
- ✅ GET `/order/:orderId` - Obter pedido por ID (Obrigatório)
- ✅ GET `/order/list` - Listar todos os pedidos (Opcional)
- ✅ PUT `/order/:orderId` - Atualizar pedido (Opcional)
- ✅ DELETE `/order/:orderId` - Deletar pedido (Opcional)

✅ **Funcionalidades:**
- ✅ Banco de dados PostgreSQL implementado
- ✅ Transformação de dados (mapping) completo
- ✅ Clean Architecture (Domain, Infrastructure, View)
- ✅ Autenticação JWT (Bearer Token)
- ✅ Documentação Swagger completa
- ✅ Collection Postman
- ✅ Tratamento robusto de erros
- ✅ Código organizado e comentado
- ✅ Commits organizados no GitHub

✅ **Critérios Atendidos:**
- ✅ Funcionalidade completa dos requisitos mínimos
- ✅ Código bem organizado e comentado
- ✅ Convenções de nomenclatura adequadas
- ✅ Tratamento de erros robusto
- ✅ Respostas HTTP adequadas (200, 201, 400, 404, 409, 500, 503)
- ✅ Repositório GitHub com commits organizados

✅ **Recursos Adicionais Implementados:**
- ✅ Autenticação JWT
- ✅ Documentação Swagger
- ✅ Collection Postman

---

**Data de entrega:** 28/11/2025  
**Candidato:** Igor Gottscheffsky Pereira

