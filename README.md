# Schemas Manager Example

This example shows how to use the schema manager to publish schemas to a schema registry. It uses the Confluent schema registry and the schema manager library.

- All the schemas are stored in the `schemas` folder, it contains **Protobuf**, **Json** and **Avro** schemas with interdependencies.
- The repo contains a github action that publishes **ALL** the schemas to the schema registry on every change on the `schemas` folder.

## Prerequisites

- Node.js 16.x
- Docker
- Docker Compose
- Yarn

## Setup

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Run `docker compose up` to start the Kafka broker and the schema registry
4. Run `yarn publish-schemas` to publish **ALL** the schemas to the schema registry

Result:

```bash
Schema build completed successfully
Schema build completed successfully
Schema build completed successfully
Registered schema for topic1-proto.data.v1
Registered schema for topic1-proto.entity.v2
Registered schema for topic2-proto.data2.v1
Registered schema for topic1-proto.model.v1
Registered schema for topic1-proto.data.v2
Registered schema for topic1-proto.model.v2
Registered schema for topic1-avro.data.test2
Registered schema for topic1-avro.entity.test2
Registered schema for topic1-avro.data.v1
Registered schema for topic2-avro.data2.v1
Registered schema for topic1-avro.model.test2
Registered schema for topic1-json.data.v1
Registered schema for topic1-json.entity.v2
Registered schema for topic1-json.model.v1
Registered schema for topic1-json.data.v2
Registered schema for topic1-json.model.v2
```
