docker rm -f idkncc
docker build -t idkncc .
docker run -d -p 127.0.0.1:3000:3000 idkncc