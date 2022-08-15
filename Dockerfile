FROM golang:1.18-alpine as builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY *.go ./

RUN go build -o /ha-automation

FROM alpine

WORKDIR /

COPY --from=builder /ha-automation /ha-automation

ENTRYPOINT ["/ha-automation"]