
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
    var archivedCases = [];
     var cases = [];
    var chosenEmployeeId;
    var employeeMap = new Object();
    var winnerEmployee;
    var pList = [];
    var secondPromiseList = [];
    var finalUser = {};
    
    // add a new variable in AngularJS scope. It'll be usable in the template directly with {{ backgroudColor }} 
    $scope.backgroudColor = white;
    $scope.shownText = "Employee which led most successful premium employment proccesses: "
    
    // define a function to be used in template with ctrl.toggleBackgroundColor()
    this.toggleBackgroundColor = function() {
        if ($scope.backgroudColor === white) {
           // use the custom widget property backgroudColor with $scope.properties.backgroudColor
            $scope.backgroudColor = $scope.properties.background;
        } else {
            $scope.backgroudColor = white;
        }
    };
    
        this.getCity = function() {
            
         doRequestRewritten('GET', '../API/bpm/archivedCase?f=name=Premium Employment').then(function() {
              console.log("Archived cases: " + archivedCases);
             doRequestRewritten1('GET', '../API/bpm/case?f=name=Premium Employment').then(function() {
                 console.log("Cases" + cases);

                      for (let i = 0; i < cases.length; i++) {
            
            const fetchPromise = new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', '../API/bpm/caseVariable/' + cases[i] + '/city');
      //request.responseType = 'application/json';
      request.setRequestHeader("Content-Type", "application/json");
      // When the request loads, check whether it was successful
      request.onload = function() {
        if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
          resolve(request.response);
        } else {
        // If it fails, reject the promise with a error message
          reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
          reject(Error('There was a network error.'));
      };
      // Send the request
      request.send();
    });
    
    
            pList.push(fetchPromise);

        }


                        for (let i = 0; i < archivedCases.length; i++) {
            
            const fetchPromise = new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', '../API/bpm/archivedCaseVariable/' + archivedCases[i] + '/city');
      //request.responseType = 'application/json';
      request.setRequestHeader("Content-Type", "application/json");
      // When the request loads, check whether it was successful
      request.onload = function() {
        if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
          resolve(request.response);
        } else {
        // If it fails, reject the promise with a error message
          reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
          reject(Error('There was a network error.'));
      };
      // Send the request
      request.send();
    });
    
    
            pList.push(fetchPromise);

        }



              Promise.all(pList) // provide array of promises to Promise.all
  .then(function(results) { // receive resolved results, they should be even numbers from 0*2 to 99*2


       for (let i = 0; i < results.length; i++) {
        let tempValue = JSON.parse(results[i])
        console.log("Temp value: " + tempValue.value)
        if(tempValue.value != null) {
            console.log(typeof tempValue.value);
            if (employeeMap.hasOwnProperty(tempValue.value)) employeeMap[tempValue.value] ++;
        else employeeMap[tempValue.value] = 1;
        
        var numberOneEmployee = tempValue.value;
    var mostEmployments = employeeMap[tempValue.value];
        }
        
    }

    
           
           
           for (var idEmployee in employeeMap) {
               if(employeeMap[idEmployee] > mostEmployments) {
                   mostEmployments = employeeMap[idEmployee]
                   numberOneEmployee = idEmployee
               }
            }
        
             console.log(numberOneEmployee);

             $scope.shownText += numberOneEmployee;          
  

   
   
  })



        
        
       });
       });
    };
    
    function doRequestRewritten(method, url) {
    var req = {
      method: method,
      url: url,
      data: angular.copy($scope.properties.dataToSend),
      params: null
    };

    return $http(req)
      .success(function(data, status) {
        // $scope.properties.dataFromSuccess = data;
        // $scope.properties.responseStatusCode = status;
        for (let i = 0; i < data.length; i++) {
            archivedCases.push(data[i].rootCaseId);
        }
       
        //console.log(data);
      })
      .error(function(data, status) {
        //console.log(data);
      })
      .finally(function() {
       
      });
  }
  
      function doRequestRewritten1(method, url) {
    var req = {
      method: method,
      url: url,
      data: angular.copy($scope.properties.dataToSend),
      params: null
    };

    return $http(req)
      .success(function(data, status) {
        // $scope.properties.dataFromSuccess = data;
        // $scope.properties.responseStatusCode = status;
        for (let i = 0; i < data.length; i++) {
            cases.push(data[i].rootCaseId);
        }
        //console.log(chosenEmployeeId);
      })
      .error(function(data, status) {
        //console.log(chosenEmployeeId);
      })
      .finally(function() {
       
      });
  }

  
}