# Url presigned

### Para subir archivos con una url presigned

```
curl -X PUT -H "content-type=image/jpeg" -T foto.jpg "https://cursonodejs16.s3.us-east-1.amazonaws.com/1711157387791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUDXASLVFCU4IQ4YJ%2F20240323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240323T012947Z&X-Amz-Expires=120&X-Amz-Signature=64ffb8633507fa1ad7b38d78fed9c920cb837bb8ce7ba2e6218d630196835411&X-Amz-SignedHeaders=host&x-id=PutObject"
```
