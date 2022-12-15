/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function ($scope, $location, $http) {
    var white = 'white';
    var amountVal = 0;
    
    // add a new variable in AngularJS scope. It'll be usable in the template directly with {{ backgroudColor }} 
    $scope.backgroudColor = white;
    $scope.shownText= ""
    
    // define a function to be used in template with ctrl.toggleBackgroundColor()
    this.toggleBackgroundColor = function() {
        if ($scope.backgroudColor === white) {
           // use the custom widget property backgroudColor with $scope.properties.backgroudColor
            $scope.backgroudColor = $scope.properties.background;
        } else {
            $scope.backgroudColor = white;
        }
    };
    
      this.getAmoutValue = function() {
        submitTaskNoParam();
    };
    
    function getUrlParam(param) {
    var paramValue = $location.absUrl().match('[//?&]' + param + '=([^&#]*)($|[&#])');
    if (paramValue) {
      return paramValue[1];
    }
    return '';
  }
  
       function submitTaskNoParam() {
    // var x = document.getElementsByName("pbInput0")[0].value;
    //alert(document.getElementsByName("pbInput0")[0].value);
  
     doRequestRewritten('GET', '../API/bpm/task/' + getUrlParam('id')).then(function() {
        console.log("Success1");
        doRequestRewritten2('GET', '../API/bpm/caseVariable/' + caseIdTemp + '/amount').then(function() {
        console.log("Success2");
        $scope.shownText= "Price: " + amountVal;
      });
      });
  }
  
        function doRequestRewritten(method, url, params) {
    var req = {
      method: method,
      url: url,
      data: angular.copy($scope.properties.dataToSend),
      params: params
    };

    return $http(req)
      .success(function(data, status) {
        // $scope.properties.dataFromSuccess = data;
        // $scope.properties.responseStatusCode = status;
        caseIdTemp = data.caseId;
        console.log(data);
      })
      .error(function(data, status) {
        console.log(data);
      })
      .finally(function() {
       
      });
  }
  
          function doRequestRewritten2(method, url, params) {
    var req = {
      method: method,
      url: url,
      data: angular.copy($scope.properties.dataToSend),
      params: params
    };

    return $http(req)
      .success(function(data, status) {
        // $scope.properties.dataFromSuccess = data;
        // $scope.properties.responseStatusCode = status;
       amountVal = data.value;
      })
      .error(function(data, status) {
        console.log(data);
      })
      .finally(function() {
       
      });
  }
  
  
}