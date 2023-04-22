#Docker: Comandos básicos

### Para descargar una imagen

```
docker pull <nombre imagen>
docker pull <nombre imagen>:<version o tag>
```

### Para listar imágenes

```
docker images
```

### Para crear un contenedor

```
docker create <nombre imagen>
docker create --name <nombre contenedor> <nombre imagen>
```

### Para listar los contenedores que estén encendidos

```
docker ps
```

### Para listar los contenedores que estén o no encendidos

```
docker ps -a
```

### Para iniciar un contenedor

```
docker start <nombre contenedor>
```

### Para revisar los logs

```
docker logs <nombre contenedor>
```

### Para detener un contenedor

```
docker stop <nombre contenedor>
```

### Para eliminar un contenedor

```
docker rm <nombre contenedor>
docker rm -f <nombre contenedor>
```

### Para crear y ejecutar un contenedor

```
docker run <nombre imagen>
docker run --name <nombre contenedor> <nombre imagen>
docker run -d --name <nombre contenedor> <nombre imagen>
```

### Para crear variables de entorno

```
docker run -d --name <nombre contenedor> -e <nombre variable> = <value> -e <nombre variable2> = <value2> <nombre imagen>:<tag>
```

### Para hacer un mapeo de puertos

```
docker run -d --name <nombre contenedor> -p <puerto host>:<puerto contenedor> -p <puerto host2>:<puerto contenedor2> <nombre imagen>:<tag>
```

### Para inspeccionar un contenedor

```
docker inspect <nombre contenedor>
```

### Para crear un volúmen de tipo host

```
docker run -d --name <nombre contenedor> -v <ruta local>:<ruta contenedor> <nombre imagen>:<tag>
```

### Para crear un volumen

```
docker volume create mysql-data-curso
```

### Para listar volúmenes

```
docker volume ls
```

### Para inspeccionar un volumen

```
docker volume inspect <nombre volumen>
```

### Para vincular un volumen nombrado

```
docker run -d --name <nombre contenedor> -v <nombre volumen>:<ruta contenedor> <nombre imagen>:<tag>
```

### Para conectarse a un contenedor

```
docker exec -it <nombre contenedor> sh
```

### Para crear una red de tipo brigde

```
docker network create net-application
```

### Para listar redes

```
docker network ls
```

### Para crear contenedores vinculados a una red

```
docker run -d ... --network net-application
```

### Para vincular un contenedor a una red

```
docker network connect <nombre red> <nombre contenedor>
```

### Para inspeccionar una red

```
docker network inspect <nombre red>
```

### Para listar las redes

```
docker network ls
```
