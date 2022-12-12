# RestApiBemFamilia

instalar dep: npm install --force //
rodar: yarn dev //
criar o banco: yarn sequelize db:create //

descreve oque a migration vai fazer: yarn sequelize migration:create --name=create-users // 

cria a tabela: yarn sequelize db:migrate //

volta a tabela se tiver erro: yarn sequelize db:migrate:undo //

Seguindo a documentação: https://sequelize.org/docs/v6/getting-started/

E com auxilio do video: https://www.youtube.com/watch?v=Fbu7z5dXcRs

https://www.youtube.com/watch?v=3RzW3IqtGR0

https://www.youtube.com/watch?v=2iS3SHwft0k

PQ USAR YARN 

https://www.lambda3.com.br/2016/10/yarn-primeiras-impressoes/

Yarn é uma alternativa para o gerenciador de pacotes mais clássico que temos. Mas não é só! Ele também é bem mais rápido para uma série de tarefas, pois traz algumas técnicas que não estão presentes no npm, como por exemplo:

Um cache local guarda a versão exata da dependência. 
Ou seja, se no futuro você baixá-la novamente, utilizará a versão que está no cache, atualizando apenas se necessário. 
Atualmente, o npm tem algo semelhante, mas não é tão performático quanto o Yarn coloca as dependências diretamente no package.json, dispensando uma flag (-s por exemplo) para garantir que elas serão escritas corretamente
<div/>
Ao instalar as dependências do projeto, ele sempre seguirá uma ordem determinada, fazendo com que todo processo seja bem mais rápido
Continua utilizando a mesma estrutura já conhecida com o package.json, logo a adaptação é bem tranquila
