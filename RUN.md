Diretório principal:
> docker-compose up -d

Na pasta back-end: 
> npm install

> npx prisma migrate dev --name init

> npm run dev

Na pasta front-end: 
> npm install

> npm run dev
>
Não tive tempo de fazer a tela para adicionar o produto, então para fazer o teste 
do vídeo base no body da rota: {{base_url}}/api/products

As imagens são estão no front, não usei uma url da internet para facilitar

>{
"name": "Hamburguer",
"category": "Lanche",
"price": 25.99,
"description": "Hamburguer delicioso",
"imageUrl": "src/assets/lanches/1.png"
}

>{
"name": "Pizza",
"category": "Prato Principal",
"price": 45.99,
"description": "Pizza com calabresa e cebola",
"imageUrl": "src/assets/lanches/6.png"
}

Em alguns momentos vão ser necessário atualizar a tela, 
pois acabei não fazendo o refresh.

As ações que esta presente em cada linha não foram implementadas. As rotas
já estao prontas para ser implementadas, faltando apenas o front.

link do postman para testar as rotas:
https://winter-resonance-425711.postman.co/workspace/My-Workspace~b855f837-c63c-4708-8bea-af557bd462c8/collection/22374523-971305dc-f21e-4b2e-a132-42df94db93ef?action=share&creator=22374523
