# generate-mercari-jwt

This is a util developed to help generating a valid Json Web Token for the use case of requesting to mercari API.

Should be handy to those crawlers who want to get through the Oauth2.0 set up by mercari :)

# Usage

The module has an indirect dependency to NodeJS v10 Crypto API, so please make sure your Node version is v10 or higher

``` javascript
import generateMercariJwt from "generate-mercari-jwt";
import axios from "axios";

generateMercariJwt("https://api.mercari.jp/v2/entities:search", "POST").then((jwt) => {
  return axios.post("https://api.mercari.jp/v2/entities:search", {
    "pageSize": 10,
    "searchSessionId": "just_dont_let_it_be_empty",
    "searchCondition": {
        "keyword": "本間芽衣子",
        "excludeKeyword": "",
        "sort": "SORT_SCORE",
        "order": "ORDER_DESC",
        "status": [
            "STATUS_ON_SALE"
        ],
        "sizeId": [],
        "categoryId": [],
        "brandId": [],
        "sellerId": [],
        "priceMin": 10000,
        "priceMax": 20000,
        "itemConditionId": [
            1
        ],
        "shippingPayerId": [
            2
        ],
        "shippingFromArea": [],
        "shippingMethod": [],
        "colorId": [],
        "hasCoupon": false,
        "attributes": [],
        "itemTypes": [],
        "skuIds": []
    },
    "serviceFrom": "suruga",
    "withItemBrand": true,
    "withItemSize": false,
    "withItemPromotions": true,
    "withItemSizes": true,
    "withShopname": false
}, {
    headers: {
      "X-Platform": "web",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "DPoP": jwt
    }
  })
}).then(res => {
  console.log(res.data);
});
```