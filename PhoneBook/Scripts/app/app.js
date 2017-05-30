(function () {
    'use strict';
    console.log("app");
    var folder_patch = "";
    var app = angular.module('app', []).
     config(['$routeProvider', function ($routeProvider) {
         $routeProvider
             .when('/Contacts', {
                 templateUrl: folder_patch + '/Scripts/app/ContactList.html',
                 controller: 'ContactController'
             })
             .when('/Contacts/:ContactId', {
                 templateUrl: folder_patch + '/Scripts/app/ContactDetail.html',
                 controller: 'ContactDetailController'
             })
             .when('/NewContact', {
                 templateUrl: folder_patch + '/Scripts/app/NewContact.html',
                 controller: 'NewContactController'
             })
            .when('/EditeContact/:ContactId', {
                templateUrl: folder_patch + '/Scripts/app/EditeContact.html',
                controller: 'EditeContactController'
            })
            .when('/DeleteContact/:ContactId', {
                controller: 'DeleteContactController'
            })
             .otherwise({ redirectTo: '/Contacts' });
     }]);


})();
