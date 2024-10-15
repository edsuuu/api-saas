# STATUS
npx sequelize-cli db:migrate:status



# Gerar uma migration
npx sequelize-cli migration:generate --name nomedatabela

# Rodar todas Migrations
npx sequelize-cli db:migrate

# Desfazer uma Migration
npx sequelize-cli db:migrate:undo

# Ver o status
npx sequelize-cli db:migrate:status

# Desfarzer todas migracoes
npx sequelize-cli db:migrate:undo:all

# Gerar Seeds
npx sequelize seed:generate --name nomedaseed

# Migrar todas as seed
npx sequelize db:seed:all

# Remover uma seed especifica
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

# Remover todas seed / REMOVE TUDO TPDOS DADOS DAS TABELAS
npx sequelize-cli db:seed:undo:all


### DOCKER

# Parar Todos os Containers
docker stop $(docker ps -aq)

# Remover Todos os Containers
docker rmi $(docker images -q)

# Remover Todas as Imagens
docker rmi $(docker images -q)

# Remover Todos os Volumes
docker volume rm $(docker volume ls -q)

# Docker remover tudo junto
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi $(docker images -q) && docker volume rm $(docker volume ls -q)

# Docker adicionar usuário sem sudo
sudo usermod -aG docker $USER



docker exec -it hostnameDoDockerOuID mysql -u root -p