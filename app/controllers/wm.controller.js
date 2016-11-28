var request = require("request");
var config = require("../config/config");
var _ = require("underscore");
var wmCtrl = {};

wmCtrl.searchProduct = function (req, response) {
    var query = "&query=" + req.body.product;
    var url = config.wallMartUrl + query;
    console.log(url);
    var options = {
        url: url

    };

    function callback(error, res, body) {
        if (!error && res.statusCode == 200) {
            var product = JSON.parse(body);
            var data = getFilteredData(product.items);
            response.send(data);

        } else {
            response.send(error);
        }
    }

    request(options, callback);
};

function getFilteredData(products) {
    var filteredOutput = [];
    //console.log(products);
    _.each(products, function (item) {

        var product = _.pick(item, 'salePrice',
            'shortDescription',
            "thumbnailImage",
            "name");
        filteredOutput.push(product);
    });
    return filteredOutput;
}
module.exports = wmCtrl;
