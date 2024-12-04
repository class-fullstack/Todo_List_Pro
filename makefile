##################### ENV #####################
include .env
export $(shell sed 's/=.*//' .env)

##################### COMMON #####################
DOCKER_COMPOSE_DATABASE := docker-compose.yml

##################### TEST #####################
test:
	@echo "Running Tests 🔥"

##################### DATABASE #####################
db-start:
	@echo "Starting Database $(POSTGRES_HOST_CONTAINER) 🐘"
	docker-compose -f $(DOCKER_COMPOSE_DATABASE) up -d

db-build:
	@echo "Budding Database $(POSTGRES_HOST_CONTAINER) 🐘"
	docker-compose -f $(DOCKER_COMPOSE_DATABASE) up -d --build

db-down:
	@echo "Stopping Database $(POSTGRES_HOST_CONTAINER) 🐘"
	docker-compose -f $(DOCKER_COMPOSE_DATABASE) down

psql-db-container:
	docker exec -it $(POSTGRES_HOST_CONTAINER) psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

psql-db:
	psql -h $(POSTGRES_HOST_LOCAL) -U $(POSTGRES_USER) -d $(POSTGRES_DB)

db-export:
	docker exec -t $(POSTGRES_HOST_CONTAINER) pg_dumpall -c -U $(POSTGRES_USER) > ./database/data/dump.sql

db-import:
	cat ./database/data/dump.sql | docker exec -i $(POSTGRES_HOST_CONTAINER) psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)