(function(module) {
  var zip = {};

  getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      // TODO: start here!
      // console.log(data.features);
      var coordinates = data.features.reduce(function(prev, curr){
        var location = {
          coordinates: {
            lat: curr.geometry.coordinates[1],
            lng: curr.geometry.coordinates[0]
          },
          zip: curr.properties.zip,
          neighborhood: curr.properties.neighborhood,
          address: curr.properties.address
        };
        prev.push(location);
        console.log(location);
        return prev;
      }, []);

      var topFive = coordinates.reduce(function(prev, curr, index, arr){
          // get the total number of zip codes
        var total = coordinates.filter(function(element){
          return element.neighborhood === curr.neighborhood;
        }).length;
      // check for duplicate neighborhoods in the topFive array
        var hasNeighborhood = prev.filter(function(element){
          return element.neighborhood === curr.neighborhood;
        }).length;
      // prevent duplicate neighborhoods from being added to the topFive array
        if(!hasNeighborhood) {
       // construct the topFive neighborhood object element
          var obj = {
            neighborhood: curr.neighborhood,
            total: total
          };
       // push the neighborhood into the topFive array
          prev.push(obj);
        }
        return prev;
      }, []).sort(function(a, b){
        return a.total < b.total;
      }).slice(0, 4);

    console.log(topFive);

    });
  };

  getData();
  module.zip = zip;
})(window);
