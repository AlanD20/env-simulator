FROM mongo:latest

RUN apt-get update && apt-get -y upgrade

RUN apt-get install -y build-essential

RUN apt-get install -y curl vim

WORKDIR /usr/share/app

COPY ./app .

RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" 

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
	&& . ~/.nvm/nvm.sh \
	&& nvm install 14.18.3 \
	&& nvm use 14.18.3 \
	&& cd /usr/share/app/programs/server \
	&& npm install 

SHELL ["/bin/bash", "-c"]

RUN . ~/.nvm/nvm.sh \
	&& nvm install 14.18.3 \
	&& nvm use 14.18.3
	
EXPOSE 3000
