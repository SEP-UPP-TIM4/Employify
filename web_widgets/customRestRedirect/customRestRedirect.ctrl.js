/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function ($scope, $location, $http, $window, localStorageService, modalService) {
    var white = 'white';
    
    // add a new variable in AngularJS scope. It'll be usable in the template directly with {{ backgroudColor }} 
    $scope.backgroudColor = white;
    
    // define a function to be used in template with ctrl.toggleBackgroundColor()
    this.toggleBackgroundColor = function() {
        if ($scope.backgroudColor === white) {
           // use the custom widget property backgroudColor with $scope.properties.backgroudColor
            $scope.backgroudColor = $scope.properties.background;
        } else {
            $scope.backgroudColor = white;
        }
    };
    
 this.testCall = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
             submitTask(this.responseText);
             //window.location.href = this.responseText;
         }
    };
    xhttp.open("POST", "http://localhost:8081/AUTH-SERVICE/api/v1/payment-request", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
    "apiKey": "daskdj",
    "amount": 10.0,
    "successUrl": "http://success-url",
    "errorUrl": "http://error-url",
    "failedUrl": "http://failed-url"
}));
//window.location.href = "http://localhost:4200/getting-started/16";
};

function closeModal(shouldClose) {
    if(shouldClose)
    {modalService.close();}
  }

 function notifyParentFrame(additionalProperties) {
    if ($window.parent !== $window.self) {
      var dataToSend = angular.extend({}, $scope.properties, additionalProperties);
      $window.parent.postMessage(JSON.stringify(dataToSend), '*');
    }
  }

 function getUserParam() {
    var userId = getUrlParam('user');
    if (userId) {
      return { 'user': userId };
    }
    return {};
  }

function getUrlParam(param) {
    var paramValue = $location.absUrl().match('[//?&]' + param + '=([^&#]*)($|[&#])');
    if (paramValue) {
      return paramValue[1];
    }
    return '';
  }
  
        function doRequest(method, url, params, firstArg) {
    var req = {
      method: method,
      url: url,
      data: angular.copy($scope.properties.dataToSend),
      params: params
    };

    return $http(req)
      .success(function(data, status) {
        $scope.properties.dataFromSuccess = data;
        $scope.properties.responseStatusCode = status;
        $scope.properties.dataFromError = undefined;
        notifyParentFrame({ message: 'success', status: status, dataFromSuccess: data, dataFromError: undefined, responseStatusCode: status});
        if ($scope.properties.targetUrlOnSuccess && method !== 'GET') {
          redirectIfNeeded();
        }
        //closeModal($scope.properties.closeOnSuccess);
      })
      .error(function(data, status) {
        $scope.properties.dataFromError = data;
        $scope.properties.responseStatusCode = status;
        $scope.properties.dataFromSuccess = undefined;
        notifyParentFrame({ message: 'error', status: status, dataFromError: data, dataFromSuccess: undefined, responseStatusCode: status});
      })
      .finally(function() {
        vm.busy = false;
      });
  }

  function redirectIfNeeded() {
    var iframeId = $window.frameElement ? $window.frameElement.id : null;
    //Redirect only if we are not in the portal or a living app
    if (!iframeId || iframeId && iframeId.indexOf('bonitaframe') !== 0) {
      $window.location.assign(firstArg);
    }
  }
  
  
function submitTask(firstArg) {
    var id;
    id = getUrlParam('id');
    if (id) {
      var params = getUserParam();
	    params.assign = $scope.properties.assign;
      doRequest('POST', '../API/bpm/userTask/' + getUrlParam('id') + '/execution', params, firstArg).then(function() {
        localStorageService.delete($window.location.href);
      });
    } else {
      alert("Ne radi");
    }
  }
  

  
  
}