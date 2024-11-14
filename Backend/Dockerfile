FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y sudo
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN sudo apt-get install -y chromium-browser
RUN sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxdamage1 libxfixes3 libcups2 libdrm2 libxrandr2 libgbm1 libpangocairo-1.0-0 libgtk-3-0 liboss4-salsa-asound2
RUN sudo apt-get install -y alsa-base alsa-utils
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["node", "index.js"]