(function () {
    'use strict';

    angular
        .module('app')
        .factory('InstitutionService', InstitutionService);

    InstitutionService.$inject = ['$http', 'API_SERVER'];
    function InstitutionService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllCountries = GetAllCountries;
        service.GetByNmInstitution = GetByNmInstitution;


        service.AddInstitutionProject = AddInstitutionProject;

        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/institutions').then(handleSuccess, handleError);
        }

        function GetAllCountries() {
            return $http.get(API_SERVER.url + '/institutions/countries').then(handleSuccess, handleError);
        }

        function AddInstitutionProject(project) {
            return $http.post(API_SERVER.url + '/institutions/addInstitution', project).then(handleSuccess, handleError);
        }

        function GetByNmInstitution(nmInstitution, dsKey) {
            return $http.get(API_SERVER.url + '/institutions/' + nmInstitution + "/" + dsKey).then(handleSuccess, handleError);
        }

        function Update(institution) {
            return $http.put(API_SERVER.url + '/institutions/', institution).then(handleSuccess, handleError);
        }

        function Delete(idInstitution) {
            return $http.delete(API_SERVER.url + '/institutions/' + idInstitution).then(handleSuccess, handleError);
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
