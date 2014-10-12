'use strict';

/**
 * @ngdoc directive
 * @name tarjetasOpacasApp.directive:bubbleChart
 * @description
 * # bubbleChart
 */
angular.module('tarjetasOpacasApp')
  .directive('bubblechart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        
        scope.$watch('data', function() {
          console.log(scope.data);

          var total_amount_exent = d3.extent(scope.data, function(d) { return d.total_amount; });
          radius.domain(total_amount_exent);

          console.log(bubble.nodes(scope.data))

          var node = svg.selectAll(".node")
            .data(bubble.nodes(scope.data))
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          // node.append("title")
              // .text(function(d) { return d.last_name + ": " + d.total_amount; });

          node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d) { return d.children ? 'white' : 'gray'; })
              .style("stroke", function(d) { return d.children ? 'white' : 'darkgray'; })
              .on("mouseover", function(d, i) {
                if (d.children) return;
                var element = d3.select(this)
                  .style('stroke', 'black')

                var html = d.name + "<br/>" + 'Gastados: ' + Math.round(d.total_amount) + '€';

                scope.tooltip
                      .html(html)
                      .style("visibility", "visible");
                
                d3.select(this)
                  .style('stroke', 'black')
                  .style('cursor', 'hand')
              })
              .on("mouseout", function(d) {
                if (d.children) return;
                var element = d3.select(this)
                  .style('stroke', 'darkgray')

                scope.tooltip.style('visibility', 'hidden')
              })
              .on("mousemove", function(){
                // d3.event must be used to retrieve pageY and pageX. While this is not needed in Chrome, it is needed in Firefox
                scope.tooltip.style("top", (d3.event.pageY - 25)+"px").style("left",(d3.event.pageX + 7)+"px");        
              });

          node.append("text")              
              .style("text-anchor", "middle")
              .text(function(d) { 
                if (d.children) return;

                return d.r < 20 ? "" : d.first_name; 
              })
              // .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
              .attr("dy", ".35em")
              .style("font-size", function(d) {
                  console.log(d)
                  var len = d.first_name.substring(0, d.r / 4).length;
                  var size = d.r/4;
                  size *= 10 / len;
                  size += 1;
                  return Math.round(size)+'px';
              })
             // .append('tspan')
             //      .attr('dy', 0)
             //      .text(function(d) {
             //      return d.children ? "" : d.last_name.split(' ')[0];
             //  })
             //  .append('tspan')
             //      .attr('dy', 20)
             //      .attr('x', 0)
             //      .text(function(d) {
             //      return d.children ? "" : d.last_name.split(' ')[1];
             //  });
        });

        var diameter = 800,
            format = d3.format(",d"),
            color = d3.scale.category20c(),
            radius = d3.scale.sqrt()
              .range([3, 6]);

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter * 0.8])
            .padding(1.5)
            .value(function(d) { return d.total_amount; } )
            .children(function(d) { return d.people; });

        var svg = d3.select(element[0]).append("svg")
            .attr("width", diameter)
            .attr("height", diameter * 0.8)
            .attr("class", "bubble");
      }
    };
  });
