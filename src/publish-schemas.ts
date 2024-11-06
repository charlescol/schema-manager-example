import { AvroParser, ConfluentRegistry, Manager, ProtobufParser } from '@charlescol/schema-manager';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const baseDirectory = path.resolve(__dirname, '../schemas');
const SCHEMA_REGISTRY_URL = process.env.SCHEMA_REGISTRY_URL || 'https://your-schema-registry-url';

const registry = new ConfluentRegistry({
  schemaRegistryUrl: SCHEMA_REGISTRY_URL,
});

async function main() {
  // create a manager and load all protobuf schemas
  const protobufLoader = new Manager({
    schemaRegistry: registry,
    parser: new ProtobufParser(),
  }).loadAll(baseDirectory + '/protobuf', subjectBuilder);

  // create a manager and load all avro schemas
  const avroLoader = new Manager({
    schemaRegistry: registry,
    parser: new AvroParser(),
  }).loadAll(baseDirectory + '/avro', subjectBuilder);

  await Promise.all([protobufLoader, avroLoader]);
}

function subjectBuilder(fullVersionPath: string, filepath: string): string {
  // Extract topic and version
  const [topic, version] = fullVersionPath.split('/');
  // Extract the filename without extension
  const filename = filepath.split('/').pop()?.split('.')[0] || '';
  // Return the constructed subject
  return `${topic}.${filename}.${version}`;
}

main().catch((error) => {
  console.error('Error registering schemas:', error);
  process.exit(1);
});
