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

        service.GetAllInstitutions = GetAllInstitutions;
        service.AddInstitutionProject= AddInstitutionProject;

        service.GetAllByDsSsoResearcher = GetAllByDsSsoResearcher;
        service.GetInstitutionsByDsKey = GetInstitutionsByDsKey;
        service.GetMembersByDsKey = GetMembersByDsKey;
        service.GetStudiesByDsKey = GetStudiesByDsKey;
        service.GetObjectivesByDsKey = GetObjectivesByDsKey;
        service.GetMainQuestionByDsKey = GetMainQuestionByDsKey;
        service.GetSecondaryQuestionByDsKey = GetSecondaryQuestionByDsKey;
        service.GetSearchKeywordsByDsKey = GetSearchKeywordsByDsKey;
        service.GetStandardQueryByDsKey = GetStandardQueryByDsKey;
        service.GetSelectionCriteriasByDsKey = GetSelectionCriteriasByDsKey;

        return service;
        //testando
        function Create(project) {
            return $http.post(API_SERVER.url + '/projects', project).then(handleSuccess, handleError);
        }

        //testando
        function Update(project) {
            return $http.put(API_SERVER.url + '/projects/', project).then(handleSuccess, handleError);
        }

        //OK!
        function GetByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetAllByDsSsoResearcher(dsSso) {
            return $http.get(API_SERVER.url + '/projects/' + dsSso + '/projects').then(handleSuccess, handleError);
        }
        //OK!
        function GetInstitutionsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/institutions').then(handleSuccess, handleError);
        }

        function GetAllInstitutions() {
            return $http.get(API_SERVER.url + '/projects/institutions').then(handleSuccess, handleError);
        }


        function AddInstitutionProject(project_member) {
            return $http.post(API_SERVER.url + '/projects/addInstitution', project_member).then(handleSuccess, handleError);
        }



        function Delete(dsKey) {
            return $http.delete(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetMembersByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/members').then(handleSuccess, handleError);
        }

        function GetStudiesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/studies').then(handleSuccess, handleError);
        }

        function GetObjectivesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/objectives').then(handleSuccess, handleError);
        }

        function GetMainQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/main-question').then(handleSuccess, handleError);
        }

        function GetSecondaryQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/secondary-question').then(handleSuccess, handleError);
        }

        function GetSearchKeywordsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/search-keywords').then(handleSuccess, handleError);
        }

        function GetStandardQueryByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/standard-query').then(handleSuccess, handleError);
        }

        function GetSelectionCriteriasByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/selection-criterias').then(handleSuccess, handleError);
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
