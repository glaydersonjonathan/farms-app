(function () {
    'use strict';

    angular
        .module('app')
        .factory('SelectionService', SelectionService);

    SelectionService.$inject = ['$http', 'API_SERVER'];
    function SelectionService($http, API_SERVER) {
        var service = {};

        service.SaveConfiguration = SaveConfiguration;
        service.GetConfiguration = GetConfiguration;

        return service;

        function SaveConfiguration(selection) {
            return $http.post(API_SERVER.url + '/selections', selection).then(handleSuccess, handleError);
        }

        function GetConfiguration(dsKey) {
            return $http.get(API_SERVER.url + '/selections/'+ dsKey).then(handleSuccess, handleError);
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
