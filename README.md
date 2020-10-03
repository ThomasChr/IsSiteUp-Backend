# Is This Site Up Server

this is an open-source node.js server to test id a site is up or not providing the domain name.

## EndPoints
this server has one endpoint at "/" that receives a POST request in json format

### Request content
```JSON
{
  "site": "google.com"
}
```

### response content

```JSON
{
  "domain":"google.com",
  "site_status":"Up",
  "response_code":200,
  "ip_address":"172.217.7.142",
  "response_time":52,
  "screenshot": "/screenshots/google.com.png"
}
```
