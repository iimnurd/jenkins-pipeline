FROM debian:latest

LABEL Author="IIM NUR DIANSYAH"
LABEL Description="Apache JMeter Dockerfile Custom"



COPY entrypoint.sh /entrypoint.sh



RUN apt-get update && apt-get install -y gnupg2 ca-certificates && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61 && \
    echo "deb https://dl.bintray.com/loadimpact/deb stable main" | tee -a /etc/apt/sources.list && \
    chmod a+x /entrypoint.sh && \
    apt-get update && apt-get install -y k6
    


ENTRYPOINT [ "/entrypoint.sh" ]

