(function () {
    'use strict';

    angular
        .module('app')
        .factory('MemberService', MemberService);

    MemberService.$inject = ['$http', 'API_SERVER'];
    function MemberService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.Invite = Invite;
        service.ActiveMember = ActiveMember;
        service.Delete = Delete;
        service.ActiveMember = ActiveMember;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/members').then(handleSuccess, handleError);
        }

        function Invite(invite) {
            return $http.post(API_SERVER.url + '/projects/members/invite/', invite).then(handleSuccess, handleError);
        }

        function ActiveMember(idProjectMember) {
            return $http.put(API_SERVER.url + '/projects/members/active/' + idProjectMember).then(handleSuccess, handleError);
        }

        function Delete(idProjectMember) {
            return $http.delete(API_SERVER.url + '/projects/members/' + idProjectMember).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return error.data;
        }
    }

})();
