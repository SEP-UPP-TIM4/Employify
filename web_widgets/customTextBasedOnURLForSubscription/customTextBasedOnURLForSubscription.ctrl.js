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
    var caseIdTemp = '';
    
    // add a new variable in AngularJS scope. It'll be usable in the template directly with {{ backgroudColor }} 
    $scope.backgroudColor = white;
    $scope.shownText = "Payment is pending."
    
    // define a function to be used in template with ctrl.toggleBackgroundColor()
    this.toggleBackgroundColor = function() {
        if ($scope.backgroudColor === white) {
           // use the custom widget property backgroudColor with $scope.properties.backgroudColor
            $scope.backgroudColor = $scope.properties.background;
        } else {
            $scope.backgroudColor = white;
        }
    };
    
    function getUrlParam(param) {
    var paramValue = $location.absUrl().match('[//?&]' + param + '=([^&#]*)($|[&#])');
    if (paramValue) {
      return paramValue[1];
    }
    return '';
  }
    
    this.setTextBasedOnUrl = function() {
        var urlCode = getUrlParam("code");
        console.log(urlCode);
        if(urlCode == 200){
            $scope.shownText = "Payment was successful."
            submitTask(200);
        }
        else if(urlCode == 400){
            $scope.shownText = "An error occurred."
            submitTask(400);
        }
        else if(urlCode == 500){
            $scope.shownText = "Payment wasn't successful."
            submitTask(500);
        }
        else{
            submitTaskNoParam();
        }
         
    };
    
    function submitTaskNoParam() {
    // var x = document.getElementsByName("pbInput0")[0].value;
    //alert(document.getElementsByName("pbInput0")[0].value);
  
     doRequestRewritten('GET', '../API/bpm/task/' + getUrlParam('id')).then(function() {
        console.log("Success1");
        doRequestRewritten2('GET', '../API/bpm/caseVariable/' + caseIdTemp + '/externalURL').then(function() {
        console.log("Success2");
        
      });
      });
  }
    
     function submitTask(codeValue) {
    // var x = document.getElementsByName("pbInput0")[0].value;
    //alert(document.getElementsByName("pbInput0")[0].value);
  
     doRequestRewritten('GET', '../API/bpm/task/' + getUrlParam('id')).then(function() {
        console.log("Success1");
        doRequestRewritten1('PUT', '../API/bpm/caseVariable/' + caseIdTemp + '/statusCode', { 'type': "java.lang.Integer", 'value': codeValue }).then(function() {
        console.log("Success2");
        
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
  
      function doRequestRewritten1(method, url, params) {
    var req = {
      method: method,
      url: url,
      data: params,
      params: ''
    };

    return $http(req)
      .success(function(data, status) {
        // $scope.properties.dataFromSuccess = data;
        // $scope.properties.responseStatusCode = status;
        
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
        window.top.location.href = data.value;
      })
      .error(function(data, status) {
        console.log(data);
      })
      .finally(function() {
       
      });
  }
}