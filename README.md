# emiloo

Homepage

## Run on Raspberry pi server

### Locally

Enable multi-platform build

```
docker buildx create --use
```

Build image for arm64 architecture and push image to docker registery

```
docker buildx build --platform linux/amd64,linux/arm64 -t docker-username/emiloo-website:latest --push .
```

### On server

Pull image and run docker-container and expose port 5000

```
docker pull docker-username/emiloo-website

docker run --platform linux/arm64 -d -p 5000:5000 --name emiloo-container emiloo/emiloo-website

```

Configure Nginx. Use certbot to aquire SSL-certificates:

Be vary of conflicting files in sites-available folder.

```
# file etc/nginx/sites-available/emiloo.no

server {
    listen 80;
    server_name emiloo.no www.emiloo.no;

    # Redirect to HTTPS
    return 301 https://www.emiloo.no$request_uri;
}

server {
    listen 443 ssl;
    server_name emiloo.no www.emiloo.no;

    ssl_certificate /etc/letsencrypt/live/emiloo.no/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/emiloo.no/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

reload and restart nginx configuration:

```
sudo nginx -s reload
sudo systemctl reload nginx

```
