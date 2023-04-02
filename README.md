# [idkncc](https://idkncc.ru)
my website

## Building
### L (old)
```shell
# in this example, im using yarn
yarn # install deps
yarn build # build next app
yarn start # run server
```
### W (docker)
```shell
docker build .
docker run -d -p 3000:3000 idkncc
```