# Volúmenes

### Crear un volumen nombrado

```
docker volume create curso-mysql
```

### Para listar volúmenes

```
docker volume ls
```

### Para vincular un volumen a un contenedor

```
docker run -d --name server-mysql -p 9200:3306 -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_USER=user -e MYSQL_PASSWORD=12345 -e MYSQL_DATABASE=db -m 8000000000 --cpus 2 -v curso-mysql:/var/lib/mysql mysql:8
```
