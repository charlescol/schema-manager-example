#!/bin/bash

# Schema Registry URL
SCHEMA_REGISTRY_URL="http://localhost:8081"

# Delete all subjects in the Schema Registry
echo "Deleting all subjects from Schema Registry..."
for subject in $(curl -s -X GET "$SCHEMA_REGISTRY_URL/subjects" | jq -r '.[]'); do
    curl -s -X DELETE "$SCHEMA_REGISTRY_URL/subjects/$subject" > /dev/null
    echo "Deleted subject: $subject"
done

echo "Reset complete."