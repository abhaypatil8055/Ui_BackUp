var productdetails = {};
var getproductdetails = () =>{
    axios.get('/get/product/details',{params:{}}).then((response) =>{
        productdetails = response.data;
        addProductsToThePage();  
    })
}
 
var singleProductTemplate = '';
async function loadProductDetails() {
    await axios.get("templates/singleProductTemplate.htm").then((response) => {
        singleProductTemplate = Handlebars.compile(response.data);
        getproductdetails();  
    });
    console.log("done");
}

var addProductsToThePage = () => {
    productdetails.MulProducts.forEach((userData, index) => {//add products list to single products template
        userData.productId = 'product_' + index;
        userData.discountPrice = userData.Price - ((userData.Price * userData.disccount / 100));
        $("#rightsideContent").append(singleProductTemplate(userData));
        var selector = '#' + userData.productId;
        addstar(selector, userData.rating);//add star rating to template
    });
}