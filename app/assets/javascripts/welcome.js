var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.users', 'foos.teams', 'foos.doubles.teams', 'foos.games', 'foos.challenges', 'foos.authentication', 'foos.dashboard', 'foos.app.directives']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);

angular.module('foos.app.directives', ['d3'])
  .directive('lineChart', ['d3Service', '$window', function(d3Service, $window) {

    return {
      restrict: 'EA',
      scope: {
        games: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5,
              team_id = attrs.teamId;

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%');

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.games);
          });

          // watch for games changes and re-render
          scope.$watch('games', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          scope.render = function(games) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!games) return;

            console.log(games);

            var minPoints = function(game) {
              if (game.team1.id == team_id) {
                return game.team1points;
              } else {
                return game.team2points - game.points_change;
              }
            };

            var maxPoints = function(game) {
              if (game.team1.id == team_id) {
                return game.team1points + game.points_change;
              } else {
                return game.team2points;
              }
            };

            // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = 150,
                barWidth = width / games.length,
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our yScale
                yScale = d3.scale.linear()
                  .domain([d3.min(games, minPoints), d3.max(games, maxPoints)])
                  .range([10, height - 20]);

            // set the height based on the calculations above
            svg.attr('height', height);

            svg.selectAll('line')
              .data(games).enter()
                .append('line')
                .attr('stroke-width', 2)
                .attr('x1', function(game,i) {
                  return i * barWidth;
                })
                .attr('x2', function(game,i) {
                  return (i + 1) * barWidth;
                })
                .attr('y1', function(game,i) {
                  var value = game.team2points;
                  if (game.team1.id == team_id) {
                    value = game.team1points;
                  }
                  return height - yScale(value);
                })
                .attr('y2', function(game,i) {
                  var value = game.team2points - game.points_change;
                  if (game.team1.id == team_id) {
                    value = game.team1points + game.points_change;
                  }

                  return height - yScale(value);
                })
                .attr('stroke', function(game, i) { return color(0); })

            svg.selectAll('circle')
              .data(games).enter()
                .append('circle')
                .attr('stroke-width', 2)
                .attr('fill', '#fff')
                .attr('stroke', function(game, i) { return color(0); })
                .attr('r', 5)
                .attr('cx', function(game, i) {
                  return (i + 1) * barWidth;
                })
                .attr('cy', function(game, i) {
                  var value = game.team2points - game.points_change;
                  if (game.team1.id == team_id) {
                    value = game.team1points + game.points_change;
                  }
                  return height - yScale(value);
                });
          };
        });
      }
    };

  }]);