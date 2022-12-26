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
    
        this.getEmployee = function() {
            
         doRequestRewritten('GET', '../API/bpm/archivedCase?f=name=Premium Employment').then(function() {
        //console.log(cases);
        for (let i = 0; i < cases.length; i++) {
            
            const fetchPromise = new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', '../API/bpm/archivedCaseVariable/' + cases[i] + '/employed');
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
        if(tempValue.value == "false") {
            const index = cases.indexOf(tempValue.case_id);
            const x = cases.splice(index, 1);
        }
        console.log("Elimination: " + cases)
    }
    
    
            for (let i = 0; i < cases.length; i++) {
            
            const fetchPromise = new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', '../API/bpm/archivedCaseVariable/' + cases[i] + '/chosenPremiumEmployeeId');
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
    
    
            secondPromiseList.push(fetchPromise);

        }
        
        
        Promise.all(secondPromiseList) // provide array of promises to Promise.all
  .then(function(results) {
        for (let i = 0; i < results.length; i++) {
        let tempValue = JSON.parse(results[i])
         chosenEmployeeId = tempValue.value
         if (employeeMap.hasOwnProperty(chosenEmployeeId)) employeeMap[chosenEmployeeId] ++;
        else employeeMap[chosenEmployeeId] = 1;
    }
       
           //console.log(employeeMap);
           
           
           var numberOneEmployee = chosenEmployeeId;
           var mostEmployments = employeeMap[chosenEmployeeId];
           
           
           for (var idEmployee in employeeMap) {
               if(employeeMap[idEmployee] > mostEmployments) {
                   mostEmployments = employeeMap[idEmployee]
                   numberOneEmployee = idEmployee
               }
            }
            
            //console.log(numberOneEmployee);
            
                    doRequestRewritten1('GET', '../API/identity/user/' + numberOneEmployee).then(function() {
        
         $scope.shownText += finalUser.firstname + ' ' + finalUser.lastname;
        
      });
            
           
  })
        
    
    
  

   
   
  })
    //     doRequestRewritten1('PUT', '../API/bpm/caseVariable/' + caseIdTemp + '/statusCode', { 'type': "java.lang.Integer", 'value': codeValue }).then(function() {
    //     console.log("Success2");
        
    //   });
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
            cases.push(data[i].rootCaseId);
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
        finalUser = data;
        //console.log(chosenEmployeeId);
      })
      .error(function(data, status) {
        //console.log(chosenEmployeeId);
      })
      .finally(function() {
       
      });
  }
}