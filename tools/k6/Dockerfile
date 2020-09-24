FROM loadimpact/k6:latest

COPY entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh 
USER root
ENTRYPOINT ["/entrypoint.sh"]
