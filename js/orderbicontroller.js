var refreshDashboard = function(){

    var myApp = angular.module('mydashboard', []);

    myApp.controller('mydashboardcntr', function($scope, $http, $interval) {
            $http.get(root_url + "/miscscript_orderbi/getAllDashboardData")
            .success(function(response) {
                
                $scope.category = response.category.clip;
                $scope.allcat = response.category.allcat;
                
                $scope.search = response.searchkeyword_data;
                
                $scope.vip = response.vip_data;
                
                $scope.country = response.location_data.country;
                $scope.city = response.location_data.city;
                $scope.region = response.location_data.region;
                $scope.regionnames = response.location_data.regionnames;
                
                $scope.confirmed_orders = response.orders_data.confirmed_orders;
                $scope.pv_orders = response.orders_data.pv_orders;
                
                var d = new Date();
                $scope.updated_time = d.toString();
               
            });
            
            
            $scope.callAtInterval = function() {
                $http.get(root_url + "/miscscript_orderbi/getAllDashboardData")
                .success(function(response) {
                    $scope.category = response.category.clip;
                    $scope.allcat = response.category.allcat;
                    
                    $scope.search = response.searchkeyword_data;
                    
                    $scope.vip = response.vip_data;
                    
                    $scope.country = response.location_data.country;
                    $scope.city = response.location_data.city;
                    $scope.region = response.location_data.region;
                    $scope.regionnames = response.location_data.regionnames;
                    
                    $scope.confirmed_orders = response.orders_data.confirmed_orders;
                    $scope.pv_orders = response.orders_data.pv_orders;
                    
                    var d = new Date();
                    $scope.updated_time = d.toString();
                });
            };
            
            $interval( function(){ $scope.callAtInterval(); }, 60000);//60000
        }
    );

    
};

refreshDashboard();


