# Schemas Manager Example

This example shows how to use the schema manager to publish schemas to a schema registry. It uses the Confluent schema registry and the schema manager library.

- All the schemas are stored in the `schemas` folder. It can contain both **Protobuf** and **Avro** schemas.
- The repo contains a github action that publishes the schemas to the schema registry on every change on the `schemas` folder.

## Prerequisites

- Node.js 16.x
- Docker
- Docker Compose
- Yarn

## Setup

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Run `docker compose up` to start the Kafka broker and the schema registry
4. Run `yarn publish-schemas` to publish the schemas to the schema registry
