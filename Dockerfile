FROM confluentinc/cp-schema-registry:latest

EXPOSE 8081

CMD ["bash", "-c", "/etc/confluent/docker/run"]