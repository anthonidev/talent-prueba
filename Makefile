.PHONY: start stop build logs restart test test-go test-node test-frontend lint

start:
	docker-compose up -d

stop:
	docker-compose down

build:
	docker-compose up --build -d

logs:
	docker-compose logs -f

restart: stop start

test: test-go test-node test-frontend

test-go:
	cd apps/api-go && go test ./... -v

test-node:
	cd apps/api-nodejs && pnpm test

test-frontend:
	cd apps/frontend && pnpm test

lint:
	cd apps/frontend && pnpm lint
