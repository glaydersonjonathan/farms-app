(function () {
    'use strict';

    angular
        .module('app')
        .factory('StudyService', StudyService);

    StudyService.$inject = ['$http', 'API_SERVER'];
    function StudyService($http, API_SERVER) {
        var service = {};

        service.GetStudiesByDsKey = GetStudiesByDsKey;
        service.GetAll = GetAll;
        service.GetByNmStudy = GetByNmStudy;
        service.Import = Import;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        service.GetByCdCiteKey = GetByCdCiteKey;

        return service;

        function GetStudiesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/studies/' + dsKey).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get(API_SERVER.url + '/studies').then(handleSuccess, handleError);
        }

        function GetByNmStudy(nmStudy) {
            return $http.get(API_SERVER.url + '/studies/' + nmStudy).then(handleSuccess, handleError);
        }

        //  function Import(file) {
        //    return $http.post(API_SERVER.url + '/studies/upload-study/',file).then(handleSuccess, handleError);
        //  }

        function Import(file) {
           // var fd = new FormData();
            //fd.append('file', file);
            return $http.post(API_SERVER.url+ '/studies/upload-study/', file, {
               // transformRequest: angular.identity,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(handleSuccess, handleError);
        }

        function Create(study) {
            return $http.post(API_SERVER.url + '/studies', study).then(handleSuccess, handleError);
        }

        function Update(study) {
            return $http.put(API_SERVER.url + '/studies/', study).then(handleSuccess, handleError);
        }

        function Delete(idStudy) {
            return $http.delete(API_SERVER.url + '/studies/' + idStudy).then(handleSuccess, handleError);
        }

        function GetByCdCiteKey(cdCiteKey) {
            return $http.get(API_SERVER.url + '/studies/read/' + cdCiteKey).then(handleSuccess, handleError);
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
