(function () {
  'use strict';

  angular
    .module('app')
    .controller('InstitutionController', InstitutionController);

  InstitutionController.$inject = ['InstitutionService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Begin InstitutionController *****/
  function InstitutionController(InstitutionService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    //vm.dataLoading = true;

    vm.all_countries = [];


    // Institution
    vm.institution = {};
    vm.institutions = [];

    // Add Institution a project
    vm.project_member = {};

    //show buttons
    vm.roleResearcher = {};

    vm.clearForm = clearForm;

    vm.showInstitutionAddForm = showInstitutionAddForm;
    vm.showEditInstitutionForm = showEditInstitutionForm;
    vm.closeModal = closeModal;

    vm.getAllInstitutions = getAllInstitutions;
    vm.getAllCountries = getAllCountries;

    vm.updateInstitution = updateInstitution;
    vm.deleteInstitution = deleteInstitution;
    vm.deleteConfirm = deleteConfirm;

    vm.addInstitutionProject = addInstitutionProject;


    vm.institutionsByFilter = institutionsByFilter;
    vm.nmInstitutionSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllInstitutions();
      getRoleResearcher();
    }

    // Forms
    function clearForm() {
      vm.institution = null;
    }


    function showInstitutionAddForm() {
      clearForm();
      getAllCountries();
      $('#institution-add-modal-form-title').text("Add Institution a Project");
      $('#institution-add-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditInstitutionForm(institution) {
      clearForm();
      getAllCountries();
      vm.institution = institution;
      $('#institution-edit-form-title').text("Edit Institution");
      $('#institution-edit-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation delete institution project");
      $('#confirmation-message-modal-message').text("Do you really want to delete '" + vm.institution.nmInstitution + "' ?");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#create-institution').modal('hide');
      $('#institution-add-modal-form').modal('hide');
      $('#institution-edit-modal-form').modal('hide');
      $('#confirmation-message-modal').modal('hide');
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


    //todas do projeto aberto
    function getAllInstitutions() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey
      }
      ProjectService.GetInstitutionsByDsKey(dsKey).then(function (response) {
        if (response.code === 2008) {
          FlashService.Error(response.description, false);
        }
        var institutions = response;
        vm.institutions = institutions;
        vm.dataLoading = false;
      });
    }


    function getAllCountries() {
      InstitutionService.GetAllCountries().then(function (response) {
        vm.all_countries = response;
      });
    }


    function addInstitutionProject() {
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.institution.dsKey = currentProject.dsKey;
      }

      InstitutionService.AddInstitutionProject(vm.institution).then(function (response) {
        if (response.code === 1009) {
          FlashService.Success(response.description, false);
          vm.institution = null;
          getAllInstitutions();
          closeModal();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
          closeModal();
        }
      });

    }

    function updateInstitution(institution) {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.institution.dsKey = currentProject.dsKey;
      }
      InstitutionService.Update(vm.institution).then(function (response) {
        if (response.code === 1020) {
          FlashService.Success(response.description, false);
          vm.institution = null;
          vm.getAllInstitutions();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
        }
        closeModal();
      });
    };


    function deleteConfirm() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      if (currentProject != null) {
        vm.institution.dsKey = currentProject.dsKey;
      }
      InstitutionService.Delete(vm.institution.dsKey, vm.institution.idInstitution).then(function (response) {
        if (response.code === 1025) {
          FlashService.Success(response.description, false);
          getAllInstitutions();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
        }
        closeModal();
        vm.institution = null;
      });
    }


    function deleteInstitution(institution) {
      vm.institution = institution;
      showConfirmationMessage();
    }

    /****** Start filter functions *****/
    function institutionsByFilter() {
      return vm.institutions.filter(function (institution) {
        return (institution.nmInstitution.toString().indexOf(vm.nmInstitutionSearch) > -1
          || institution.nmInstitution.toLowerCase().indexOf(vm.nmInstitutionSearch.toLowerCase()) > -1);
      });
    };
    /****** End filters functions *****/

    /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.institutionsByFilter().length / vm.itemsPerPage) - 1;
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

  } /****** End InstitutionController *****/

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
