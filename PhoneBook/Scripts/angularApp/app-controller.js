(function () {
    'use strict';
    angular
		.module('app')
			.controller('ContactController', ['$http', '$scope', ContactController])
				function ContactController($http, $scope) {
					$http.get('/api/Contacts1').success(function (ContactList) {
					    $scope.data = ContactList;
					});
					console.log("get CL");

       
    }

    angular
		.module('app')
			.controller('ContactDetailController', ['$scope', '$routeParams', '$http','$location','ContactService', ContactDetailController]);
				function ContactDetailController($scope, $routeParams, $http, $location,$ContactService) {

 			$http.get('/api/Contacts1/' + $routeParams.ContactId).success(function (ContactDetail) {
 			    $scope.data = ContactDetail;
                console.log($scope.data);
			});
 			$scope.EditeContact = function () {
 			    $ContactService.Contact = $scope.data;
 			    $location.path('/EditeContact');
 			}; 

		
    }

    angular
		.module('app')
			.controller('NewContactController', ['$scope', '$routeParams', '$http', '$location', '$filter', NewContactController]);
    function NewContactController($scope, $routeParams, $http, $location, $filter) {
        $scope.tmpPhone = "";
        $scope.data = {
            phoneNumber: []
        };

				
	           $scope.submitForm = function () {
               // Posting data to php file
	               var posturl = 'api/Contacts1';
               $http({
                   method: 'POST',
                   url: posturl,
                   data: $scope.data, //forms user object
               })
                 .success(function (data) {
                     if (data.errors) {
                         // Showing errors.
                         $scope.errorName = data.errors.name;
                         $scope.errorUserName = data.errors.username;
                         $scope.errorEmail = data.errors.email;
                     } else {
                         $scope.message = data.message;
                         $location.path('/Contacts');

                     }
                 });
           };
	           $scope.addPhoneNumber = function () {
	               if ($scope.tmpPhone != "") {
	                   var phoneNum = {
	                       phoneNum: "0"

	                   };
	                   phoneNum.phoneNum = $scope.tmpPhone;
	                   $scope.data.phoneNumber.push(phoneNum);
	                   $scope.tmpPhone = "";
	               }



	           };
	           $scope.Delnum = function (id) {
	               // var item = $filter('filter')($scope.data.phoneNumber, { 'phoneNumberId': id })
	               var index = $scope.data.phoneNumber.findIndex(x=>x.phoneNumberId == id);
	               $scope.data.phoneNumber.splice(index, 1);
	           };
		   
				}

    angular
		.module('app')
			.controller('EditeContactController', ['$scope', '$routeParams', '$http', '$location','ContactService' ,'$filter', EditeContactController]);
    function EditeContactController($scope, $routeParams, $http, $location, $ContactService, $filter) {
				$scope.tmpPhone="";
				$scope.data = $ContactService.Contact;

									
				$scope.submitForm = function () {
				    // Posting data to php file

				    var posturl = 'api/Contacts1/' + $scope.data.contactId;
				    $http({
				        method: 'PUT',
				        url: posturl,
				        data: $scope.data, //forms user object

				    })
                      .success(function (data) {
                          if (data.errors) {
                              // Showing errors.
                              $scope.errorName = data.errors.name;
                              $scope.errorUserName = data.errors.username;
                              $scope.errorEmail = data.errors.email;
                          } else {
                              $scope.message = data.message;
                              $location.path('/Contacts');
                          }
                      });
				};
	           $scope.addPhoneNumber = function () {
	               if ($scope.tmpPhone != "") {
	               var phoneNum = {
	                   phoneNum: "0"
	                  
	               };
	               phoneNum.phoneNum = $scope.tmpPhone;
	               $scope.data.phoneNumber.push(phoneNum);
	               $scope.tmpPhone = "";
	               }



	           };
	           $scope.Delnum = function (id) {
	              // var item = $filter('filter')($scope.data.phoneNumber, { 'phoneNumberId': id })
	               var index = $scope.data.phoneNumber.findIndex(x=>x.phoneNumberId==id);
	            $scope.data.phoneNumber.splice(index, 1);
	           };

		   
    	}

    	angular
    	.module('app')
          .service('ContactService', function () {
              var contact = {};
          });
	
})();
