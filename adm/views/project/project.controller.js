(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['ProjectService', 'InstitutionService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Begin ProjectController *****/
  function ProjectController(ProjectService, InstitutionService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    vm.dataLoading = true;

    // Project
    vm.project = {}; //usando pra editar
    vm.projects = [];

    vm.roleResearcher = {};


    vm.all_countries = [];
    vm.all_institutions = [];//usado na criação de um projeto

    vm.clearForm = clearForm;
    vm.showCreateForm = showCreateForm;
    vm.showEditForm = showEditForm;
    vm.showReadForm = showReadForm;
    vm.closeModal = closeModal;

    vm.getAllProjects = getAllProjects;
    vm.createProject = createProject;
    
    vm.updateProject = updateProject;
    vm.openProject = openProject;



    vm.getAllCountries = getAllCountries;

    vm.projectsByFilter = projectsByFilter;
    vm.tpReviewSearch = "";
    vm.dsKeySearch = "";
    vm.dsTitleSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllProjects();
      getRoleResearcher();
      getAllCountries();
    }

    // Forms
    function clearForm() {
      vm.project = null;
    }


    function showCreateForm() {
      clearForm();
      $('#create-modal-title').text("Create Project");
      $('#create-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }


    function showEditForm() {
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = {};
      if (currentProject != null) {
        dsKey = currentProject.dsKey;
      }
      ProjectService.GetByDsKey(dsKey).then(function (response) {
        vm.project = response;
      });
      $('#edit-modal-form-title').text("Update project");
      $('#edit-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showReadForm() {
      $('#read-modal-title').text("Project");
      $('#read-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#create-modal-form').modal('hide');
      $('#edit-modal-form').modal('hide');
      $('#confirmation-message-modal').modal('hide');
    }


    // CRUD functions

    function getAllProjects() {
      vm.dataLoading = true;
      var dsSso = $rootScope.globals.currentUser.dsUsername;
      ProjectService.GetAllByDsSsoResearcher(dsSso).then(function (response) {
        var projects = response;
        vm.projects = projects;
        vm.dataLoading = false;
      });
    }

    function getAllCountries() {
      InstitutionService.GetAllCountries().then(function (response) {
        vm.all_countries = response;
      });
    }

    function getProjectByKey(dsKey) {
      ProjectService.GetByDsKey(dsKey).then(function (response) {
        var project = response;
        return project;
      });
    }

    function createProject() {
      vm.project.dsSsoResearcher = $rootScope.globals.currentUser.dsUsername;
      vm.dataLoading = true;
      ProjectService.Create(vm.project).then(function (response) {
        if (response.code === 1006) {
          FlashService.Success(response.description, false);
          vm.project = null;
          vm.getAllProjects();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
        }
        closeModal();
      });
    };

    function updateProject() {
      vm.dataLoading = true;
      ProjectService.Update(vm.project).then(function (response) {
        if (response.code === 1007) {
          FlashService.Success(response.description, false);
          $cookieStore.put('currentProject', vm.project);
          vm.project = null;
          closeModal();
          vm.getAllProjects();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
          closeModal();
        }
      });
    };

 
    function openProject(dsKey) {
      ProjectService.GetByDsKey(dsKey).then(function (response) {
        var project = response;
        $cookieStore.put('currentProject', project);
        $state.go($state.current, {}, { reload: true });
      });
    }




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



    /****** Start filter functions *****/
    function projectsByFilter() {
      return vm.projects.filter(function (project) {
        return (vm.tpReviewSearch == "" || (vm.tpReviewSearch > -1 && vm.tpReviewSearch == project.tpReview))
          && (project.dsKey.toString().indexOf(vm.dsKeySearch) > -1
            || project.dsKey.toLowerCase().indexOf(vm.dsKeySearch.toLowerCase()) > -1)
          && (project.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
            || project.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1);
      });
    };
    /****** End filters functions *****/

    /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.projectsByFilter().length / vm.itemsPerPage) - 1;
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

  } /****** End ProjectController *****/

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
