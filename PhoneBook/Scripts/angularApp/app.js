(function () {
    'use strict';

    var app = angular.module('app', []).
     config(['$routeProvider', function ($routeProvider) {
         $routeProvider
             .when('/Contacts', {
                 templateUrl: '/Scripts/angularApp/ContactList.html',
                 controller: 'ContactController'
             })
             .when('/Contacts/:ContactId', {
                 templateUrl: '/Scripts/angularApp/ContactDetail.html',
                 controller: 'ContactDetailController'
             })
             .when('/NewContact', {
                 templateUrl: '/Scripts/angularApp/NewContact.html',
                 controller: 'NewContactController'
             })
                    .when('/EditeContact', {
                              templateUrl: '/Scripts/angularApp/EditeContact.html',
                              controller: 'EditeContactController'
                          })
             .otherwise({ redirectTo: '/Contacts' });
     }]);


})();
