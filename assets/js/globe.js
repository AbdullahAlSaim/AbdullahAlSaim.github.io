
var width = 960,
    height = 500;

var projection = d3.geoOrthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

var canvas = d3.select("canvas#globe")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
  if (error) throw error;

  var land = topojson.feature(world, world.objects.land);

  d3.timer(function(elapsed) {
    projection.rotate([elapsed / 100, 0]);
    context.clearRect(0, 0, width, height);
    context.beginPath();
    path(land);
    context.fillStyle = "#ccc";
    context.fill();
    context.beginPath();
    path(graticule());
    context.strokeStyle = "#999";
    context.stroke();
  });
});
