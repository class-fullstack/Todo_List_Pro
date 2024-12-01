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
	@echo "Starting Database $(POSTGRES_HOST) 🐘"
	docker-compose -f $(DOCKER_COMPOSE_DATABASE) up -d

db-build:
	@echo "Budding Database $(POSTGRES_HOST) 🐘"
	docker-compose -f $(DOCKER_COMPOSE_DATABASE) up -d --build