import generateMercariJwt from "./index";
import axios from "axios";
import { v4 } from "uuid";
import { HttpsProxyAgent } from "https-proxy-agent";

generateMercariJwt("https://api.mercari.jp/v2/entities:search", "POST").then((jwt) => {
  return axios.post("https://api.mercari.jp/v2/entities:search", {
    "pageSize": 10,
    "searchSessionId": v4(),
    "searchCondition": {
        "keyword": "test",
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
    },
    httpsAgent: new HttpsProxyAgent("http://localhost:10809"),
    proxy: false,
  })
}).then(res => {
  console.log(res.data);
});

