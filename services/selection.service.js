(function () {
    'use strict';

    angular
        .module('app')
        .factory('SelectionService', SelectionService);

    SelectionService.$inject = ['$http', 'API_SERVER'];
    function SelectionService($http, API_SERVER) {
        var service = {};

        service.Save = Save;

        return service;

        function Save(selection) {
            return $http.post(API_SERVER.url + '/selections', selection).then(handleSuccess, handleError);
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
