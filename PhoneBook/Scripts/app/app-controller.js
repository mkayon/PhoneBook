(function () {
    'use strict';
    var folder_patch = "";
    angular
		.module('app')
			.controller('ContactController', ['$http', '$scope', 'ContactService', ContactController])
    function ContactController($http, $scope, $ContactService) {
        $ContactService.contactlist(function (data) {
            $scope.data = data;
        });
        console.log("get CL");


    }

    angular
		.module('app')
			.controller('ContactDetailController', ['$scope', '$routeParams', '$http', '$location', 'ContactService', ContactDetailController]);
    function ContactDetailController($scope, $routeParams, $http, $location, $ContactService) {

        $ContactService.ContactDetail($routeParams.ContactId, function (data) {
            $scope.data = data;
            console.log($scope.data);
        });
        $scope.EditeContact = function () { $ContactService.EditContact($scope.data); }

        $scope.Deletecontact = function () {
            var posturl = '/angjs/api/Contacts1/' + $scope.data.contactId;
            $http({
                method: 'DELETE',
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
    function EditeContactController($scope, $routeParams, $http, $location, $ContactService, $filter) {
        $scope.tmpPhone = "";
        if ($ContactService.Contact.contactId == $routeParams.contactId) {
            $scope.data = $ContactService.Contact;
        }



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

            var index = $scope.data.phoneNumber.findIndex(x=>x.phoneNumberId == id);
            $scope.data.phoneNumber.splice(index, 1);
        };



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
            $http.get('/angjs/api/Contacts1/' + id).success(callback);
        }
    }
});

    angular
    .module('app')
    .directive('phoneNumber', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                var listener = function () {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('tel')(value, false));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function () {
                    $browser.defer(listener);
                });
            }

        };
    });
    angular
    .module('app')
    .filter('tel', function () {
        return function (tel) {
            console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }

            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                }
                else {
                    number = number;
                }

                return ("(" + city + ") " + number).trim();
            }
            else {
                return "(" + city;
            }

        };
    });

    angular
    .module('app')
.directive('phoneInput', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, atts, ngModel) {

            /* called when model is changed from the input element */
            ngModel.$parsers.unshift(function (viewValue) {

                var numbers = viewValue.replace(/\D/g, ''),
                    char = { 0: '(', 3: ') ', 6: ' - ' };
                numbers = numbers.slice(0, 10);
                viewValue = '';

                for (var i = 0; i < numbers.length; i++) {
                    viewValue += (char[i] || '') + numbers[i];
                }

                // set the input to formatted value
                el.val(viewValue);

                return viewValue;
            });

            /* called when model is changed outside of the input element */
            ngModel.$formatters.push(function (modelValue) {
                return modelValue;
            });

            /* called when the model changes, if validation fails the model value won't be assigned */
            ngModel.$validators.phone = function (modelValue, viewValue) {
                if (modelValue) {
                    return modelValue.match(/\d/g).length === 10;
                } else {
                    return false;
                }
            }

        }
    }
});



})();
