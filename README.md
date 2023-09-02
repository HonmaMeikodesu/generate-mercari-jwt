# generate-mercari-jwt

This is a util developed to help generating a valid Json Web Token for the use case of requesting mercari v2 API.

# Prerequisite

The module has an indirect dependency to NodeJS v10 Crypto API, so please make sure your Node version is v10 or higher

# Installing

``` bash
npm install generate-mercari-jwt
```

# Usage

``` javascript
import generateMercariJwt from "generate-mercari-jwt";
import axios from "axios";

generateMercariJwt("https://api.mercari.jp/v2/entities:search", "POST").then((jwt) => {
  return axios.post("https://api.mercari.jp/v2/entities:search", {
    // how many items you prefer to retrieve
    "pageSize": 10,
    // This field is required and should not be empty
    "searchSessionId": "just_dont_let_it_be_empty",
    // filter options, fieldNames below all speak for themselves
    "searchCondition": {
        "keyword": "",
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
    // TODO what is the enum for this field?
    "serviceFrom": "suruga",
    "withItemBrand": true,
    "withItemSize": false,
    "withItemPromotions": true,
    "withItemSizes": true,
    "withShopname": false
}, {
    headers: {
      // this header is required
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
