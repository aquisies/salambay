FROM nginx:alpine

# Copiar la presentación como archivo índice
COPY presentation.html /usr/share/nginx/html/index.html

# Copiar los assets (imágenes, estilos si hubiera externos)
COPY assets /usr/share/nginx/html/assets

# Exponer puerto 80
EXPOSE 80
