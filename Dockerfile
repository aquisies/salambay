FROM nginx:alpine

# Copiar el archivo principal (index.html es el archivo actualizado)
COPY index.html /usr/share/nginx/html/index.html

# Copiar los archivos CSS
COPY css /usr/share/nginx/html/css

# Copiar los archivos JavaScript
COPY js /usr/share/nginx/html/js

# Copiar los assets (imágenes, estilos si hubiera externos)
COPY assets /usr/share/nginx/html/assets

# Exponer puerto 80
EXPOSE 80
