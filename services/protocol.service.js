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

        service.GetAllLanguages = GetAllLanguages;
        service.GetAllEngines = GetAllEngines;

        service.GetObjectivesByDsKey = GetObjectivesByDsKey;
        service.GetMainQuestionByDsKey = GetMainQuestionByDsKey;
        service.GetSecondaryQuestionByDsKey = GetSecondaryQuestionByDsKey;
        service.GetSearchKeywordsByDsKey = GetSearchKeywordsByDsKey;
        service.GetStandardQueryByDsKey = GetStandardQueryByDsKey;
        service.GetSearchEngineByDsKey = GetSearchEngineByDsKey;
        service.GetSelectionCriteriasByDsKey = GetSelectionCriteriasByDsKey;
        service.GetLanguagesByDsKey = GetLanguagesByDsKey;

        service.SaveObjectives = SaveObjectives;
        service.SaveMainQuestion = SaveMainQuestion;
        service.SaveSecondaryQuestion = SaveSecondaryQuestion;
        service.SaveStandardQuery = SaveStandardQuery;
        service.SaveKeyword = SaveKeyword;
        service.SaveCriteria = SaveCriteria;
        service.SaveLanguage = SaveLanguage;
        service.SaveEngine = SaveEngine;

        service.CreateEngine = CreateEngine;

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



        function GetAllLanguages() {
            return $http.get(API_SERVER.url + '/protocol/allLanguages').then(handleSuccess, handleError);
        }

        function GetAllEngines() {
            return $http.get(API_SERVER.url + '/protocol/allEngines').then(handleSuccess, handleError);
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

        function GetLanguagesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/languages').then(handleSuccess, handleError);
        }


        function GetStandardQueryByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/standard-query').then(handleSuccess, handleError);
        }

        function GetSearchEngineByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/protocol/' + dsKey + '/search-engine').then(handleSuccess, handleError);
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

        function SaveKeyword(searchKeywords) {
            return $http.post(API_SERVER.url + '/protocol/searchKeywords/', searchKeywords).then(handleSuccess, handleError);
        }

        function SaveCriteria(selectionCriterias) {
            return $http.post(API_SERVER.url + '/protocol/selectionCriterias/', selectionCriterias).then(handleSuccess, handleError);
        }

        function SaveLanguage(languages) {
            return $http.post(API_SERVER.url + '/protocol/languages/', languages).then(handleSuccess, handleError);
        }

        function SaveEngine(engines) {
            return $http.post(API_SERVER.url + '/protocol/engines/', engines).then(handleSuccess, handleError);
        }

        function CreateEngine(engine) {
            return $http.post(API_SERVER.url + '/protocol/createEngine/'+ engine).then(handleSuccess, handleError);
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