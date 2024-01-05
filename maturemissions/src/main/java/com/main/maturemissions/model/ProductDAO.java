package com.main.maturemissions.model;

import com.stripe.model.Price;
import com.stripe.model.Product;

import java.math.BigDecimal;

public class ProductDAO {

    static Product[] products;

    static {
        products = new Product[4];

        Product sampleProduct = new Product();
        Price samplePrice = new Price();

        sampleProduct.setName("Bronze");
        sampleProduct.setId("price_1O0BN6GOC4VJVNP01F5rgYus");
        samplePrice.setCurrency("aud");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(1));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[0] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Silver");
        sampleProduct.setId("price_1O0BNKGOC4VJVNP0iYObSjyM");
        samplePrice.setCurrency("aud");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(2));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[1] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Gold");
        sampleProduct.setId("price_1O0BNZGOC4VJVNP0ahoJqwOV");
        samplePrice.setCurrency("aud");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(3));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[2] = sampleProduct;

    }

    public static Product getProduct(String id) {

        if ("price_1O0BN6GOC4VJVNP01F5rgYus".equals(id)) {
            return products[0];
        } else if ("price_1O0BNKGOC4VJVNP0iYObSjyM".equals(id)) {
            return products[1];
        } else if ("price_1O0BNZGOC4VJVNP0ahoJqwOV".equals(id)) {
            return products[2];
        } else return new Product();

    }
}
