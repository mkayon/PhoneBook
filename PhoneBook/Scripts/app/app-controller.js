(function () {
    'use strict';
    console.log("controller");
    var folder_patch = "";
    angular
		.module('app')
			.controller('ContactController', ['$http', '$scope', 'ContactService', ContactController])
    function ContactController($http, $scope, ContactService) {
        ContactService.contactlist(function (data) {
            $scope.data = data;
        });
        console.log("get CL");


    }

    angular
		.module('app')
			.controller('ContactDetailController', ['$scope', '$routeParams', '$http', '$location', 'ContactService', ContactDetailController]);
    function ContactDetailController($scope, $routeParams, $http, $location, ContactService) {

        ContactService.ContactDetail($routeParams.ContactId, function (data) {
            $scope.data = data;
            console.log($scope.data);
        });
        $scope.EditeContact = function () {

            $location.path('/EditeContact/' + $scope.data.contactId);

        }

        $scope.Deletecontact = function () {

            $location.path('/DeleteContact/' + $scope.data.contactId);
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
			.controller('EditeContactController', ['$scope', '$routeParams', '$http', '$location', 'ContactService', '$filter', EditeContactController]);
    function EditeContactController($scope, $routeParams, $http, $location, ContactService, $filter) {
        $scope.tmpPhone = "";
        ContactService.ContactDetail($routeParams.ContactId, function (data) {
            $scope.data = data;
            console.log($scope.data);
        });



        $scope.submitForm = function () {
            // Posting data to php file
            ContactService.Editcontact($scope.data, function (data) {

                $location.path('/Contacts');
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

            var index = $scope.data.phoneNumber.findIndex(x=>x.phoneNumberId == id);
            $scope.data.phoneNumber.splice(index, 1);
        };



    }
    angular
    .module('app')
    .controller('DeleteContactController', ['$http', '$scope', 'ContactService', DeleteContactController])
    function DeleteContactController($http, $scope, ContactService) {
        ContactService.Deletecontact($routeParams.ContactId, function (data) {
           
            $location.path('/Contacts');
        });


    }




    angular
  .module('app')
  .service('ContactService', function ($http, $location) {

      return {
          contact: {},
          contactlist: function (callback) {
              $http.get(folder_patch + '/api/Contacts1').success(callback);
          },
          ContactDetail: function (id, callback) {
              $http.get(folder_patch + '/api/Contacts1/' + id).success(callback);
          },
          Deletecontact: function (id, callback) {
              $http({
                  method: 'DELETE',
                  url: folder_patch + '/api/Contacts1/' + $scope.data.contactId,
                  data: $scope.data, //forms user object
              }).success(callback );
          },
          Editcontact: function (data, callback) {
              var posturl = folder_patch + '/api/Contacts1/' + data.contactId;
              $http({
                  method: 'PUT',
                  url: posturl,
                  data: data, //forms user object

              }).success(callback);
          }
      }
  });








})();
