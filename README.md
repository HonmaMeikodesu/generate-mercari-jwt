# generate-mercari-jwt

This is a util developed to help generating a valid Json Web Token for the use case of requesting to mercari API.

Should be handy to those crawlers who want to get through the Oauth2.0 set up by mercari :)

# Usage

The module has an indirect dependency to NodeJS v10 Crypto API, so please make sure your Node version is v10 or higher

``` javascript
import generateMercariJwt from "generate-mercari-jwt";

generateMercariJwt("https://api.mercari.jp/search_index/search").then((jwt) => console.log(jwt));
```