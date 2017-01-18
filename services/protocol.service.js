(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProtocolService', ProtocolService);

    ProtocolService.$inject = ['$http', 'API_SERVER'];
    function ProtocolService($http, API_SERVER) {
        var service = {};

        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        service.GetAll = GetAll;
        service.GetByNmProtocol = GetByNmProtocol;


        service.GetObjectivesByDsKey = GetObjectivesByDsKey;
        service.GetMainQuestionByDsKey = GetMainQuestionByDsKey;
        service.GetSecondaryQuestionByDsKey = GetSecondaryQuestionByDsKey;
        service.GetSearchKeywordsByDsKey = GetSearchKeywordsByDsKey;
        service.GetStandardQueryByDsKey = GetStandardQueryByDsKey;
        service.GetSelectionCriteriasByDsKey = GetSelectionCriteriasByDsKey;

        service.SaveObjectives = SaveObjectives;
        service.SaveMainQuestion = SaveMainQuestion;
        service.SaveSecondaryQuestion = SaveSecondaryQuestion;
        service.SaveStandardQuery = SaveStandardQuery;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/protocol').then(handleSuccess, handleError);
        }

        function GetByNmProtocol(nmProtocol) {
            return $http.get(API_SERVER.url + '/protocol/' + nmProtocol).then(handleSuccess, handleError);
        }

        function Create(protocol) {
            return $http.post(API_SERVER.url + '/protocol', protocol).then(handleSuccess, handleError);
        }

        function Update(idProtocol) {
            return $http.put(API_SERVER.url + '/protocol/' + protocol.idProtocol, protocol).then(handleSuccess, handleError);
        }

        function Delete(idProtocol) {
            return $http.delete(API_SERVER.url + '/protocol/' + idProtocol).then(handleSuccess, handleError);
        }



        function GetObjectivesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/objectives').then(handleSuccess, handleError);
        }

        function GetMainQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/main-question').then(handleSuccess, handleError);
        }

        function GetSecondaryQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/secondary-question').then(handleSuccess, handleError);
        }

        function GetSearchKeywordsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/search-keywords').then(handleSuccess, handleError);
        }

        function GetStandardQueryByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/standard-query').then(handleSuccess, handleError);
        }

        function GetSelectionCriteriasByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/selection-criterias').then(handleSuccess, handleError);
        }




        function SaveObjectives(objective) {
            return $http.post(API_SERVER.url + '/protocol/objectives/', objective).then(handleSuccess, handleError);
        }

        function SaveMainQuestion(mainQuestion) {
            return $http.post(API_SERVER.url + '/protocol/mainQuestion/', mainQuestion).then(handleSuccess, handleError);
        }

        function SaveSecondaryQuestion(secondaryQuestion) {
            return $http.post(API_SERVER.url + '/protocol/secondaryQuestion/', secondaryQuestion).then(handleSuccess, handleError);
        }

        function SaveStandardQuery(standardQuery) {
            return $http.post(API_SERVER.url + '/protocol/standardQuery/', standardQuery).then(handleSuccess, handleError);
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