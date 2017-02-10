(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResearcherService', ResearcherService);

    ResearcherService.$inject = ['$http', 'API_SERVER'];
    function ResearcherService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByNmResearcher = GetByNmResearcher;
        service.GetBydsSso = GetBydsSso;
        service.Create = Create;
        service.Update = Update;
        service.UpdateResearcher = UpdateResearcher;
        service.UpdatePassword = UpdatePassword;
        service.UpdateEmail = UpdateEmail;
        service.Delete = Delete;

        

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/researchers').then(handleSuccess, handleError);
        }

        function GetByNmResearcher(nmResearcher) {
            return $http.get(API_SERVER.url + '/researchers/' + nmResearcher).then(handleSuccess, handleError);
        }

        
        function GetBydsSso(dsSso) {
            return $http.get(API_SERVER.url + '/researchers/' + dsSso).then(handleSuccess, handleError);
        }

        function Create(institution) {
            return $http.post(API_SERVER.url + '/researchers', institution).then(handleSuccess, handleError);
        }

        function Update(idResearcher) {
            return $http.put(API_SERVER.url + '/researchers/' + institution.idResearcher, institution).then(handleSuccess, handleError);
        }

        
        function UpdateResearcher(researcher) {
            return $http.put(API_SERVER.url + '/researchers/', researcher).then(handleSuccess, handleError);
        }

        function UpdatePassword(researcher) {
            return $http.put(API_SERVER.url + '/researchers/pass', researcher).then(handleSuccess, handleError);
        }
        
        function UpdateEmail(researcher) {
            return $http.put(API_SERVER.url + '/researchers/email', researcher).then(handleSuccess, handleError);
        }

        
        function Delete(idResearcher) {
            return $http.delete(API_SERVER.url + '/researchers/' + idResearcher).then(handleSuccess, handleError);
        }

        function GetProjectsByDsSsoResearcher(dsSso) {
            return $http.get(API_SERVER.url + '/researchers/' + dsSso + '/projects').then(handleSuccess, handleError);
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
