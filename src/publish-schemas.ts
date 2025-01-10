import { ConfigType, ConfluentRegistry, Manager } from '@charlescol/schema-manager';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

(async () => {
  const SCHEMA_REGISTRY_URL = process.env.SCHEMA_REGISTRY_URL || 'http://localhost:8081';
  const SCHEMA_DIR = path.resolve(__dirname, '../schemas');

  const registry = new ConfluentRegistry({
    schemaRegistryUrl: SCHEMA_REGISTRY_URL,
  });

  const avroManager = new Manager({
    schemaRegistry: registry,
    configType: ConfigType.AVRO,
    namespaceBuilder,
  });

  const protoManager = new Manager({
    schemaRegistry: registry,
    configType: ConfigType.PROTOBUF,
    namespaceBuilder,
  });
  /* Build and register both proto and avro schemas */
  await avroManager.build(`${SCHEMA_DIR}/avro`, 'build-avro');
  await protoManager.build(`${SCHEMA_DIR}/proto`, 'build-proto');
  await protoManager.register(subjectBuilder, 'build-proto', 'subjects-proto');
  await avroManager.register(subjectBuilder, 'build-avro', 'subjects-avro');
})();

// Function to provide, used to build the subject for each schema file.
function subjectBuilder(filepath: string): string {
  const [topic, version, filename] = filepath.split('/'); // Extract topic and version
  const filenameWithoutExt = filename?.split('.')[0] || ''; // Extract the filename without extension
  return `${topic}.${filenameWithoutExt}.${version}`; // Return the constructed subject
}

function namespaceBuilder(filepath: string): string {
  return filepath
    .split('/') // Split the string by '/'
    .map(
      (segment) => segment.replace(/-([a-z])/g, (_, char) => char.toUpperCase()), // Replace '-' and capitalize the next character
    )
    .join('.'); // Join the segments with '.'
}
