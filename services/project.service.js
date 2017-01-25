(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'API_SERVER'];
    function ProjectService($http, API_SERVER) {
        var service = {};

        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetByDsKey = GetByDsKey;


        service.GetAllByDsSsoResearcher = GetAllByDsSsoResearcher;
        service.GetInstitutionsByDsKey = GetInstitutionsByDsKey;
        service.GetMembersByDsKey = GetMembersByDsKey;

        service.GetRoleBydsKey = GetRoleBydsKey;


        return service;
        
        function Create(project) {
            return $http.post(API_SERVER.url + '/projects', project).then(handleSuccess, handleError);
        }

        
        function Update(project) {
            return $http.put(API_SERVER.url + '/projects/', project).then(handleSuccess, handleError);
        }

        
        function GetByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetAllByDsSsoResearcher(dsSso) {
            return $http.get(API_SERVER.url + '/projects/' + dsSso + '/projects').then(handleSuccess, handleError);
        }
        
        function GetInstitutionsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/institutions').then(handleSuccess, handleError);
        }

        function Delete(dsKey) {
            return $http.delete(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetMembersByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/members').then(handleSuccess, handleError);
        }


        function GetRoleBydsKey(dsKey, dsUserName) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + "/role/" + dsUserName).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return res.data;
        }
    }

})();
