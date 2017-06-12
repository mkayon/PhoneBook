(function () {
    'use strict';
    console.log("service");
    var folder_patch = "";
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
            }).success(callback);
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