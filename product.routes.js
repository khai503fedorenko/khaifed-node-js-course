const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

router.get('/products', (request, response) => {
   return response.json(products);
});

router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params;
   const filteredProducts = products.filter(product => product.brand === brand);
   response.json(filteredProducts);
});
router.get('/products/details/:id', blockSpecialBrand, (request, response) => {
    const { id } = request.params;
    console.log('prod', id)
    const filteredProducts = products.filter(product => product.id === Number.parseInt(id));
    response.json(filteredProducts);
 });
router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});


module.exports = router;