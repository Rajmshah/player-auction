server {
        listen 80;
        server_name teamsauction.in www.teamsauction.in;
        location /api {
                proxy_pass http://127.0.0.1:1340;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
        location / {
                proxy_pass http://127.0.0.1:1340;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
        location /backend {
                root /home/projects/teamsauction;
                index index.html index.htm;
                try_files $uri $uri/ /index.html =404;
        }
}

server {
        listen 80;
        server_name teamsauction.in;
        return 301 $scheme://www.teamsauction.in$request_uri;
}
