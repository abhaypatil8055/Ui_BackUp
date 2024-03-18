var productId = '';
document.addEventListener('DOMContentLoaded', () => {
    //Category carousel images dynamci creation.
    var categoryTemp = document.querySelector('#categoryTemplate').innerHTML;
    var temp = Handlebars.compile(categoryTemp);
    var mainCarousel = document.querySelector('.carousel-inner');

    categoryImages.forEach((item, index) => {
        var activeState = index === 0 ? 'active' : '';
        item.active = activeState;
        mainCarousel.insertAdjacentHTML("beforeend", temp(item));
    });

    // Category filter block images dynamic template creation
    var categoryFilterBlockTemp = document.querySelector('#categoryFilterBlockTemplate').innerHTML;
    var catFilTemp = Handlebars.compile(categoryFilterBlockTemp);
    var catImgCols = document.querySelector('#categoryImgColumns');
    categoryFilterBlockImgs.forEach((item1, index1) => {
        catImgCols.insertAdjacentHTML('beforeend', catFilTemp(item1));
    });

    document.querySelector('#headerloginbutton').addEventListener('click', () => {
        loadSelectedPage('llllllogin');
    });

    console.log('location contains URL related info. like query params, host, protocal etc info');
    console.log(location);

    //gets the query params from URL.
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('productId')) {
        productId = queryParams.get('productId');
        loadSelectedPage('loadProductDetailsWithId');
    }

});