<h1 align="center">
    <img alt="Kart Racing" title="#kartRacing" src="challenge/image/logo-quake-iii-arena.png" width="200px" />
</h1>

<h1 align="center"> 
    Quake III Arena (Log Parser)
</h1>

# Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Testes](#testes)

<a id="sobre"></a>
## :bookmark: Sobre 

Desafio de construir um parser para o arquivo de log *challenge/logFile/games.log* e exponha uma API de consulta.
E construir uma API que faça a exposição de um método de consulta que retorne um relatório de cada jogo.

<a id="tecnologias-utilizadas"></a>
## :rocket: Tecnologias Utilizadas

- Yarn v1.19.0
- Docker v19.03.8
- NodeJS v12.16.2;
- TypeScript;
- TypeORM;
- Express;
- Banco de dados: MongoDB;
- Testes unitários: jest;

## :computer: Resultado no Insomnia

<h1 align="center">
    <img alt="Web" src="challenge/gif/Quake-3-Arena.gif" width="900px">
</h1>

<a id="como-usar"></a>
## :fire: Como usar

- Clone esse repositório: `git clone https://github.com/diogobarreiros/quake3arena-log-parser.git`
- Instale as dependências: `yarn install`
- Crie o banco de dados: `docker run --name mongodb -p 27017:27017 -d -t mongo`
- Inicie o banco de dados: `docker start mongodb`
- Inicie a api em ambiente de desenvolvimento: `yarn dev:server`
- Acesse a api pela seguinte URL: `http://localhost:3333`
- Para consultar todos os jogos utilize a rota: `http://localhost:3333/games`
- Para consultar um determinado jogo utilize a rota passando o numero do jogo desejado: `http://localhost:3333/games/:game`

## :page_with_curl: Arquivo de importação

Para efetuar a importação veja o arquivo teste <a href="https://github.com/diogobarreiros/quake3arena-log-parser/blob/master/challenge/logFile/games.log" target="_blank">games.log</a>.
Utilize a rota de upload enviando o arquivo de log: `http://localhost:3333/logfile`

<a id="testes"></a>
## :heavy_check_mark: Testes

- Para rodar os testes unitários rode o seguinte comando: `yarn test`

---

<h4 align="center">
    Feito por <a href="https://www.linkedin.com/in/diogo-barreiros-b2a96836/" target="_blank">Diogo Barreiros</a>
</h4>
