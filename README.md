# generate-mercari-jwt

This is a util developed to help generating a valid Json Web Token for the use case of requesting to mercari API.

Should be handy to those crawlers who want to get through the Oauth2.0 set up by mercari :)

# Useage

``` javascript
generateMercariJwt("https://api.mercari.jp/search_index/search").then((jwt) => console.log(jwt));
```