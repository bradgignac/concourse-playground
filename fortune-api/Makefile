default: lint test

dependencies:
	@go get -u github.com/golang/lint/golint
	@go get -u golang.org/x/tools/cmd/cover
	@go get -u golang.org/x/tools/cmd/godoc
	@go get -u golang.org/x/tools/cmd/vet
	@godep save -r

build:
	@go build

install:
	@go install

lint:
	@golint ./...
	@go vet ./...

test:
	@go test ./...

cover:
	@go test ./... -coverprofile coverage.out
	@go tool cover -html coverage.out -o coverage.html

.PHONY: dependencies build install lint test cover
