(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProtocolController', ProtocolController);

  ProtocolController.$inject = ['ProtocolService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Begin ProtocolController *****/
  function ProtocolController(ProtocolService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    // Protocol
    vm.protocol = {};
    vm.searchEngine = {}; //usado para criar search engine

    vm.dataLoading = true;
    //show buttons
    vm.roleResearcher = {};

    vm.all_languages = [];
    vm.all_engines = [];

    //Forms
    vm.clearForm = clearForm;
    vm.showAddKeywordForm = showAddKeywordForm;
    vm.showAddCriteriaForm = showAddCriteriaForm;
    vm.showAddLanguageForm = showAddLanguageForm;
    vm.showAddSearchEngineForm = showAddSearchEngineForm;
    vm.showCreateSearchEngineForm = showCreateSearchEngineForm;
    vm.closeModal = closeModal;

    vm.showEditKeywordForm = showEditKeywordForm;
    vm.showEditEngineForm = showEditEngineForm;
    vm.showEditSelectionCriteriaForm = showEditSelectionCriteriaForm;

    vm.getAllProtocol = getAllProtocol;
    vm.saveObjectives = saveObjectives;
    vm.saveMainQuestion = saveMainQuestion;
    vm.saveSecondaryQuestion = saveSecondaryQuestion;
    vm.saveStandardQuery = saveStandardQuery;
    vm.saveKeyword = saveKeyword;
    vm.saveCriteria = saveCriteria;
    vm.saveLanguage = saveLanguage;
    vm.saveEngine = saveEngine;
    vm.createEngine = createEngine;

    vm.deleteKeyword = deleteKeyword;
    vm.deleteLanguage = deleteLanguage;
    vm.deleteEngine = deleteEngine;
    vm.deleteSelectionCriteria = deleteSelectionCriteria;

    vm.deleteConfirm = deleteConfirm;
    vm.keywordToDelete = null;
    vm.languageToDelete = null;
    vm.engineToDelete = null;
    vm.criteriaToDelete = null;

    vm.editKeyword = editKeyword;
    vm.editEngine = editEngine;
    vm.editCriteria = editCriteria;


    initController();

    function initController() {
      vm.getAllProtocol();
      getRoleResearcher();
    }

    //Forms

    function showAddKeywordForm() {
      clearForm();
      $('#keyword-modal-form-title').text("Add Keyword");
      $('#keyword-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditKeywordForm(keyword) {
      vm.protocol.searchKeywords = keyword;
      $('#edit-keyword-modal-form-title').text("Edit Keyword");
      $('#edit-keyword-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditEngineForm(engine) {
      vm.protocol.searchEngines = engine;
      $('#edit-engine-modal-form-title').text("Edit Search Engine");
      $('#edit-engine-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditSelectionCriteriaForm(criteria) {
      vm.protocol.selectionCriterias = criteria;
      $('#edit-criteria-modal-form-title').text("Edit Selection Criteria");
      $('#edit-criteria-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showAddCriteriaForm() {
      clearForm();
      $('#criteria-modal-form-title').text("Add Criteria");
      $('#criteria-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showAddLanguageForm() {
      clearForm();
      getAllLanguages();
      $('#language-modal-form-title').text("Add Language");
      $('#language-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showAddSearchEngineForm() {
      clearForm();
      getAllEngines();
      $('#engine-modal-form-title').text("Add Search Engine");
      $('#engine-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showCreateSearchEngineForm() {
      vm.searchEngine = null;
      $('#create-engine-modal-form-title').text("Create Search Engine");
      $('#create-engine-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage(message) {
      $('#confirmation-message-modal-title').text("Confirmation delete");
      $('#confirmation-message-modal-message').text("Do you really want to delete " + message + " ?");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }


    function closeModal() {
      $('#keyword-modal-form').modal('hide');
      $('#criteria-modal-form').modal('hide');
      $('#language-modal-form').modal('hide');
      $('#engine-modal-form').modal('hide');
      $('#create-engine-modal-form').modal('hide');
      $('#edit-keyword-modal-form').modal('hide');
      $('#edit-engine-modal-form').modal('hide');
      $('#edit-criteria-modal-form').modal('hide');
      $('#confirmation-message-modal').modal('hide');
    }

    function clearForm() {
      vm.protocol.searchKeywords = null;
      vm.protocol.selectionCriterias = null;
      vm.protocol.languages = null;
      vm.protocol.searchEngines = null;
    }

    // CRUD functions

    function getRoleResearcher() {
      var currentProject = $cookieStore.get("currentProject");
      var roleResearcher = {};
      if (currentProject != null) {
        roleResearcher.dsKey = currentProject.dsKey;
      }
      roleResearcher.dsUserName = $rootScope.globals.currentUser.dsUsername;
      ProjectService.GetRoleBydsKey(roleResearcher.dsKey, roleResearcher.dsUserName).then(function (response) {
        vm.roleResearcher = response;
      });
    }

    function getAllLanguages() {
      ProtocolService.GetAllLanguages().then(function (response) {
        vm.all_languages = response;
      });
    }

    function getAllEngines() {
      ProtocolService.GetAllEngines().then(function (response) {
        vm.all_engines = response;
      });
    }

    function getAllProtocol() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey
      } else {
        FlashService.Error('Open a project before view and edit protocol', false);
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
      vm.dataLoading = false;
    }

    function saveObjectives() {
      if (vm.protocol.objective.dsProjectKey != null) {
        delete vm.protocol.objective.dsProjectKey;
      }

      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.objective.dsKey = currentProject.dsKey;
      }
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
      ProtocolService.SaveKeyword(vm.protocol.searchKeywords).then(function (response) {
        if (response.code === 1015) {
          getAllProtocol();
          FlashService.Success(response.description, false);
        }
        else {
          getAllProtocol();
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

    function saveLanguage() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.languages.dsProjectKey = currentProject.dsKey;
      }
      ProtocolService.SaveLanguage(vm.protocol.languages).then(function (response) {
        if (response.code === 1017) {
          FlashService.Success(response.description, false);
          getAllProtocol();
        }
        else {
          FlashService.Error(response.description, false);
        }
        closeModal();
      });
    }



    function saveEngine() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.protocol.searchEngines.dsProjectKey = currentProject.dsKey;
      }
      ProtocolService.SaveEngine(vm.protocol.searchEngines).then(function (response) {
        if (response.code === 1018) {
          FlashService.Success(response.description, false);
          getAllProtocol();
        }
        else {
          FlashService.Error(response.description, false);
        }
        closeModal();
      });
    }

    function createEngine() {
      ProtocolService.CreateEngine(vm.searchEngine).then(function (response) {
        if (response.code === 1019) {
          FlashService.Success(response.description, false);
        }
        else {
          FlashService.Error(response.description, false);
        }
        closeModal();
      });
    }


    function deleteConfirm() {

      if (vm.keywordToDelete != null) {
        var currentProject = $cookieStore.get("currentProject");
        if (currentProject != null) {
          vm.keywordToDelete.dsProjectKey = currentProject.dsKey;
        }
        ProtocolService.DeleteKeyword(vm.keywordToDelete.dsProjectKey, vm.keywordToDelete.dsSearchKeyword, vm.keywordToDelete.idSearchKeyword).then(function (response) {
          if (response.data.code === 1021) {
            vm.keywordToDelete = null;
            getAllProtocol();
            FlashService.Success(response.data.description, false);
          }
          else {
            getAllProtocol();
            FlashService.Error(response.data.description, false);
          }
        });
      }

      if (vm.languageToDelete != null) {
        var currentProject = $cookieStore.get("currentProject");
        if (currentProject != null) {
          vm.languageToDelete.dsProjectKey = currentProject.dsKey;
        }
        ProtocolService.DeleteLanguage(vm.languageToDelete.dsProjectKey, vm.languageToDelete.idLanguage).then(function (response) {
          if (response.data.code === 1022) {
            vm.languageToDelete = null;
            getAllProtocol();
            FlashService.Success(response.data.description, false);
          }
          else {
            getAllProtocol();
            FlashService.Error(response.data.description, false);
          }
        });
      }

      if (vm.engineToDelete != null) {
        var currentProject = $cookieStore.get("currentProject");
        if (currentProject != null) {
          vm.engineToDelete.dsProjectKey = currentProject.dsKey;
        }
        ProtocolService.DeleteEngine(vm.engineToDelete.dsProjectKey, vm.engineToDelete.idSearchEngine).then(function (response) {
          if (response.data.code === 1023) {
            vm.engineToDelete = null;
            getAllProtocol();
            FlashService.Success(response.data.description, false);
          }
          else {
            getAllProtocol();
            FlashService.Error(response.data.description, false);
          }
        });
      }

      if (vm.criteriaToDelete != null) {
        var currentProject = $cookieStore.get("currentProject");
        if (currentProject != null) {
          vm.criteriaToDelete.dsProjectKey = currentProject.dsKey;
        }
        ProtocolService.DeleteSelectionCriteria(vm.criteriaToDelete.dsProjectKey, vm.criteriaToDelete.dsSelectionCriteria,
          vm.criteriaToDelete.tpCriteria).then(function (response) {
            if (response.data.code === 1024) {
              vm.criteriaToDelete = null;
              getAllProtocol();
              FlashService.Success(response.data.description, false);
            }
            else {
              getAllProtocol();
              FlashService.Error(response.data.description, false);
            }
          });
      }

      closeModal();
    }

    function deleteKeyword(keyword) {
      vm.keywordToDelete = keyword;
      showConfirmationMessage("keyword '" + vm.keywordToDelete.dsSearchKeyword + "'");

    }

    function deleteLanguage(language) {
      vm.languageToDelete = language;
      showConfirmationMessage("language '" + vm.languageToDelete.nmLanguage + "'");
    }

    function deleteEngine(engine) {
      vm.engineToDelete = engine;
      showConfirmationMessage("search engine '" + vm.engineToDelete.nmSearchEngine + "'");
    }

    function deleteSelectionCriteria(selectionCriteria) {
      vm.criteriaToDelete = selectionCriteria;
      showConfirmationMessage("selection criteria '" + vm.criteriaToDelete.dsSelectionCriteria + "'");
    }




    function editKeyword() {
      ProtocolService.EditKeyword(vm.protocol.searchKeywords).then(function (response) {
        if (response.data.code === 1015) {
          getAllProtocol();
          FlashService.Success(response.data.description, false);
        }
        else {
          getAllProtocol();
          FlashService.Error(response.data.description, false);
        }
        closeModal();
      });
    }

    function editEngine() {
      ProtocolService.EditEngine(vm.protocol.searchEngines).then(function (response) {
        if (response.data.code === 1018) {
          getAllProtocol();
          FlashService.Success(response.data.description, false);
        }
        else {
          getAllProtocol();
          FlashService.Error(response.data.description, false);
        }
        closeModal();
      });
    }


    function editCriteria() {
      ProtocolService.EditCriteria(vm.protocol.selectionCriterias).then(function (response) {
        if (response.data.code === 1016) {
          getAllProtocol();
          FlashService.Success(response.data.description, false);
        }
        else {
          getAllProtocol();
          FlashService.Error(response.data.description, false);
        }
        closeModal();
      });
    }

  } /****** End ProtocolController *****/

})();