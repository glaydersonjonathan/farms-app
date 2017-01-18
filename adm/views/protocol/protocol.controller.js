(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProtocolController', ProtocolController);

  ProtocolController.$inject = ['ProtocolService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ProtocolController *****/
  function ProtocolController(ProtocolService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    // Protocol
    vm.protocol = {};

    //Forms
    vm.clearForm = clearForm;
    vm.showAddKeywordForm = showAddKeywordForm;
    vm.showAddCriteriaForm = showAddCriteriaForm;
    vm.closeModal = closeModal;

    vm.getAllProtocol = getAllProtocol;
    vm.saveObjectives = saveObjectives;
    vm.saveMainQuestion = saveMainQuestion;
    vm.saveSecondaryQuestion = saveSecondaryQuestion;
    vm.saveStandardQuery = saveStandardQuery;
    vm.saveKeyword = saveKeyword;
    vm.saveCriteria = saveCriteria;

    initController();

    function initController() {
      vm.getAllProtocol();
    }

    //Forms

    function showAddKeywordForm() {
      clearForm();
      $('#create-modal-form-title').text("Add Keyword");
      $('#create-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showAddCriteriaForm() {
      clearForm();
      $('#criteria-modal-form-title').text("Add Criteria");
      $('#criteria-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#create-modal-form').modal('hide');
      $('#criteria-modal-form').modal('hide');
      //$('#edit-modal-form').modal('hide');
      //$('#confirmation-message-modal').modal('hide');
    }

    function clearForm() {
      vm.protocol.searchKeywords = null;
      vm.protocol.selectionCriterias = null;
    }

    // CRUD functions

    function getAllProtocol() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey
      }
      ProtocolService.GetObjectivesByDsKey(dsKey).then(function (response) {
        var objectives = response;
        vm.protocol.objective = objectives[0];
      });
      ProtocolService.GetMainQuestionByDsKey(dsKey).then(function (response) {
        var mainQuestion = response;
        vm.protocol.mainQuestion = mainQuestion[0];
      });
      ProtocolService.GetSecondaryQuestionByDsKey(dsKey).then(function (response) {
        var secondaryQuestion = response;
        vm.protocol.secondaryQuestion = secondaryQuestion[0];
      });
      ProtocolService.GetSearchKeywordsByDsKey(dsKey).then(function (response) {
        var searchKeywords = response;
        vm.protocol.searchKeywords = searchKeywords;
      });
      ProtocolService.GetLanguagesByDsKey(dsKey).then(function (response) {
        var languages = response;
        vm.protocol.languages = languages;
      });
      ProtocolService.GetStandardQueryByDsKey(dsKey).then(function (response) {
        var standardQuery = response;
        vm.protocol.standardQuery = standardQuery[0];
      });
      ProtocolService.GetSearchEngineByDsKey(dsKey).then(function (response) {
        var searchEngines = response;
        vm.protocol.searchEngines = searchEngines;
      });
      ProtocolService.GetSelectionCriteriasByDsKey(dsKey).then(function (response) {
        var selectionCriterias = response;
        vm.protocol.selectionCriterias = selectionCriterias;
      });
    }

    function saveObjectives() {
      if (vm.protocol.objective.dsProjectKey != null) {
        delete vm.protocol.objective.dsProjectKey;
      }

      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.objective.dsKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveObjectives(vm.protocol.objective).then(function (response) {
        if (response.code === 1011) {
          FlashService.Success(response.description, false);
          alert(response.description);
        }
        else {
          FlashService.Error(response.description, false);
          alert(response.description);
        }
      });
    }

    function saveMainQuestion() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.mainQuestion.dsProjectKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveMainQuestion(vm.protocol.mainQuestion).then(function (response) {
        if (response.code === 1012) {
          FlashService.Success(response.description, false);
          alert(response.description);
        }
        else {
          FlashService.Error(response.description, false);
          alert(response.description);
        }
      });
    }

    function saveSecondaryQuestion() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.secondaryQuestion.dsProjectKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveSecondaryQuestion(vm.protocol.secondaryQuestion).then(function (response) {
        if (response.code === 1013) {
          FlashService.Success(response.description, false);
          alert(response.description);
        }
        else {
          FlashService.Error(response.description, false);
          alert(response.description);
        }
      });
    }

    function saveStandardQuery() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.standardQuery.dsProjectKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveStandardQuery(vm.protocol.standardQuery).then(function (response) {
        if (response.code === 1014) {
          FlashService.Success(response.description, false);
          alert(response.description);
        }
        else {
          FlashService.Error(response.description, false);
          alert(response.description);
        }
      });
    }


    function saveKeyword() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.searchKeywords.dsProjectKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveKeyword(vm.protocol.searchKeywords).then(function (response) {
        if (response.code === 1015) {
          FlashService.Success(response.description, false);
          getAllProtocol();
        }
        else {
          FlashService.Error(response.description, false);
        }
        closeModal();
      });
    }


    function saveCriteria() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.selectionCriterias.dsProjectKey = currentProject.dsKey;
      }
      console.log(vm.protocol);
      ProtocolService.SaveCriteria(vm.protocol.selectionCriterias).then(function (response) {
        if (response.code === 1016) {
          FlashService.Success(response.description, false);
          getAllProtocol();
        }
        else {
          FlashService.Error(response.description, false);
        }
        closeModal();
      });
    }



  } /****** End ProtocolController *****/

})();