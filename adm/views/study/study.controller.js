(function () {
  'use strict';

  angular
    .module('app')
    .controller('StudyController', StudyController).directive('fileModel', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
            });
          });
        }
      };
    }]);

  StudyController.$inject = ['StudyService', 'ProjectService', 'FlashService', 'ProtocolService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Begin StudyController *****/
  function StudyController(StudyService, ProjectService, FlashService, ProtocolService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    vm.dataLoading = true;

    // Study
    vm.study = {};
    vm.studies = [];
    vm.flStudy = 'none';

    vm.year = {};

    vm.showCreateForm = showCreateForm;
    vm.showImportForm = showImportForm;
    vm.showEditStudyForm = showEditStudyForm;
    vm.showReadForm = showReadForm;
    vm.clearForm = clearForm;

    vm.getAllStudies = getAllStudies;

    vm.createStudy = createStudy;
    vm.updateStudy = updateStudy;
    vm.deleteStudy = deleteStudy;
    vm.deleteConfirm = deleteConfirm;

    vm.getStandardQuery = getStandardQuery;
    vm.standardQuery = {};

    vm.myFile = undefined;
    vm.uploadFile = uploadFile;

    vm.studiesByFilter = studiesByFilter;
    vm.dsTitleSearch = "";
    vm.nrYearSearch = "";
    vm.nmAuthorSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllStudies();
      getStandardQuery();
      date();
    }

    // Forms
    function clearForm() {
      vm.study = null;
      vm.flStudy = null;
    }

    function showCreateForm() {
      $('#study-create-modal-form-title').text("Create Study");
      $('#study-create-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showImportForm() {
      clearForm();
      $('#import-modal-title').text("Import Study");
      $('#import-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditStudyForm(study) {
      clearForm();
      vm.study = study;
      $('#study-edit-modal-form-title').text("Edit study");
      $('#study-edit-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showReadForm(study) {
      console.log(study);
      clearForm();
      vm.study = study;
      $('#read-modal-form-title').text(study.dsTitle);
      $('#read-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage(message) {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal-message').text("Do you really want to delete " + message + " ?");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#study-create-modal-form').modal('hide');
      $('#study-edit-modal-form').modal('hide');
      $('#import-modal-form').modal('hide');
      $('#confirmation-message-modal').modal('hide');
    }

    function date() {
      var date = new Date();
      vm.year = date.getFullYear();
    }

    // CRUD functions

    function getAllStudies() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey;
        StudyService.GetStudiesByDsKey(dsKey).then(function (response) {
          var studies = response;
          vm.studies = studies;
          vm.dataLoading = false;
        });
      } else {
        vm.dataLoading = false;
      }
    }

    function createStudy() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.study.dsKey = currentProject.dsKey;
      }
      StudyService.Create(vm.study).then(function (response) {
        console.log(response.data);
        if (response.code === 1026) {
          FlashService.Success(response.description, false);
          vm.study = null;
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
        }
        closeModal();
      });
    }


    function getStandardQuery() {
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey;
      }
      ProtocolService.GetStandardQueryByDsKey(dsKey).then(function (response) {
        var standardQuery = response;
        vm.standardQuery = standardQuery[0];
      });
    }


    function uploadFile() {
      vm.dataLoading = true;
      var file = vm.myFile;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey;
      }
      StudyService.Import(file, dsKey).then(function (response) {
        console.log(response);
        if (response.code === 1033) {
          vm.myFile = null;
          FlashService.Success(response.description + response.data, false);
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, false);
        }
        closeModal();
        vm.dataLoading = false;
      });
    }

    function updateStudy() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.study.dsKeyProject = currentProject.dsKey;
      }
      StudyService.Update(vm.study).then(function (response) {
        if (response.code === 1026) {
          FlashService.Success(response.description, true);
          vm.study = null;
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
        closeModal();
      });
    }

    function deleteConfirm() {
      StudyService.Delete(vm.study.idStudy).then(function (response) {
        console.log(response.data);
        if (response.code === 1027) {
          FlashService.Success(response.description, true);
          vm.study = null;
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
        }
        closeModal();
      });
    }


    function deleteStudy(study) {
      showConfirmationMessage("study '" + study.dsTitle + "' ");
      vm.study = study;
    }

    /****** Start filter functions *****/
    function studiesByFilter() {
      return vm.studies.filter(function (study) {
        return (study.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
          || study.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1)
          && (study.nrYear == null || study.nrYear.toString().indexOf(vm.nrYearSearch) > -1
            || study.nrYear.toString().toLowerCase().indexOf(vm.nrYearSearch.toLowerCase()) > -1)
          && (study.nmAuthor == null || study.nmAuthor.toString().indexOf(vm.nmAuthorSearch) > -1
            || study.nmAuthor.toString().toLowerCase().indexOf(vm.nmAuthorSearch.toLowerCase()) > -1);
      });
    }
    /****** End filters functions *****/

    /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.studiesByFilter().length / vm.itemsPerPage) - 1;
    };

    function range() {
      var rangeSize = 7;
      var ps = [];
      var start;

      start = vm.currentPage;
      if (start > vm.pageCount() - rangeSize) {
        start = vm.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        if (i >= 0) {
          ps.push(i);
        }
      }
      return ps;
    };

    function prevPage() {
      if (vm.currentPage > 0) {
        vm.currentPage--;
      }
    };

    function nextPage() {
      if (vm.currentPage < vm.pageCount()) {
        vm.currentPage++;
      }
    };

    function setPage(pageNumber) {
      vm.currentPage = pageNumber;
    };
    /****** End pagination functions *****/

  } /****** End StudyController *****/

  /****** Start pager *****/
  angular
    .module('app')
    .filter('pagination', function () {
      return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
      };
    });
  /****** End pager *****/
})();
