# Get file .env
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

psql-db-container:
	docker exec -it $(POSTGRES_HOST_CONTAINER) psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

psql-db:
	psql -h $(POSTGRES_HOST_LOCAL) -U $(POSTGRES_USER) -d $(POSTGRES_DB)