(function () {
    'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', 'API_SERVER'];
    function DashboardService($http, API_SERVER) {
        var service = {};

        service.GetInvitations = GetInvitations;
        service.Decline = Decline;
        service.Accept = Accept;

        return service;

        function GetInvitations(dsSSO) {
            return $http.get(API_SERVER.url + '/projects/invitations/' + dsSSO).then(handleSuccess, handleError);
        }

        function Decline(id) {
            return $http.delete(API_SERVER.url + '/projects/decline/' + id).then(handleSuccess, handleError);
        }

        function Accept(id) {
            return $http.put(API_SERVER.url + '/projects/accept/' + id).then(handleSuccess, handleError);
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

    }

})();