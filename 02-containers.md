# Contenedores

### Para crear un contenedor

```
docker run --name server-mysql mysql:8
```

### Para agregar variables de entorno

```
docker run --name server-mysql -e MYSQL_ROOT_PASSWORD=12345 mysql:8
```

### Listar todos los contenedores (ejecutándose o no)

```
docker ps
docker ps -a
```

### Para eliminar contenedores detenidos

```
docker rm server-mysql
```

### Para eliminar contenedores que se están ejecutando

```
docker stop server-mysql
docker rm server-mysql
```

```
docker rm -f server-mysql
```

### Crear un contenedor sin estar vinculado al log del mismo

```
docker run -d --name server-mysql -e MYSQL_ROOT_PASSWORD=12345 mysql:8
```

### Crear un contenedor de mysql con usuario no-admin

```
docker run -d --name server-mysql -p 9200:3306 -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_USER=user -e MYSQL_PASSWORD=12345 -e MYSQL_DATABASE=db -m 8000000000 --cpus 2 mysql:8
```

### Log

```
docker logs server-mysql
```

### Para detener un contenedor

```
docker stop server-mysql
```

### Para iniciar un contenedor

```
docker start server-mysql
```
