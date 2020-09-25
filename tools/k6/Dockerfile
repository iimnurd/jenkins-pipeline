FROM debian:latest

LABEL Author="IIM NUR DIANSYAH"
LABEL Description="Apache JMeter Dockerfile Custom"



COPY entrypoint.sh /entrypoint.sh


# Downloading JMeter
RUN apk --no-cache add curl bash ca-certificates gnupg && \
    gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61 && \
    chmod a+x /jmeter-plugin-install.sh

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61 && \
    echo "deb https://dl.bintray.com/loadimpact/deb stable main" |  tee -a /etc/apt/sources.list && \
    apt-get update && \
    chmod a+x /entrypoint.sh && \
    apt-get install k6



ENTRYPOINT [ "/entrypoint.sh" ]

