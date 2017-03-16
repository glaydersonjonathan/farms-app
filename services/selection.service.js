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
        service.GetAllRated = GetAllRated;
        service.AssignManual = AssignManual;
        service.GetReviews = GetReviews;
        service.RealizeReview = RealizeReview;
        
        return service;

        function SaveConfiguration(selection) {
            return $http.post(API_SERVER.url + '/selections', selection).then(handleSuccess, handleError);
        }

        function GetConfiguration(dsKey) {
            return $http.get(API_SERVER.url + '/selections/' + dsKey).then(handleSuccess, handleError);
        }

        function GetAllRated() {
            return $http.get(API_SERVER.url + '/selections/rated').then(handleSuccess, handleError);
        }

        function AssignManual(review) {
            return $http.post(API_SERVER.url + '/selections/assignManual', review).then(handleSuccess, handleError);
        }

        function GetReviews(dsKey, dsSSO) {
            return $http.get(API_SERVER.url + '/selections/review/' + dsKey + "/" + dsSSO).then(handleSuccess, handleError);
        }

        function RealizeReview (review){
          return $http.post(API_SERVER.url + '/selections/realizeReview', review).then(handleSuccess, handleError);   
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
