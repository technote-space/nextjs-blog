setup:
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
	. ${NVM_DIR}/nvm.sh && nvm use
	yarn
up:
	docker-compose -f infra/docker-compose.yml --env-file .env up -d
stop:
	docker-compose -f infra/docker-compose.yml --env-file .env stop
down:
	docker-compose -f infra/docker-compose.yml --env-file .env down --remove-orphans
restart:
	@make down
	@make up
destroy:
	@make down
	docker volume rm infra_tech_blog_db
