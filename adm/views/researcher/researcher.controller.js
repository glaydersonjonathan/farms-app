(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResearcherController', ResearcherController);

  ResearcherController.$inject = ['ResearcherService', 'AuthenticationService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ResearcherController *****/
  function ResearcherController(ResearcherService, AuthenticationService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    // Researcher
    vm.researcher = {};

    

    // Forms
    vm.showEditForm = showEditForm;
    vm.showChangePassForm = showChangePassForm;
    vm.closeModal = closeModal;


    vm.getBydsSso = getBydsSso;
    vm.editResearcher = editResearcher;
    vm.editPassword = editPassword;
    vm.deleteResearcher = deleteResearcher;
    vm.yes = yes;

    

    initController();

    function initController() {
      vm.getBydsSso();
    }

    // Forms
    function showEditForm() {
      $('#create-modal-form-title').text("Edit Researcher");
      $('#create-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showChangePassForm() {
      vm.researcher.dsPassword = null;
      $('#change-modal-form-title').text("Change Password");
      $('#change-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation delete researcher");
      $('#confirmation-message-modal-message').text("Do you really want to delete this researcher?");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#create-modal-form').modal('hide');
      $('#change-modal-form').modal('hide');
      $('#confirmation-message-modal').modal('hide');
      getBydsSso();
    }

    // CRUD functions
    //OK!
    function getBydsSso() {
      var dsSso = $rootScope.globals.currentUser.dsUsername;
      ResearcherService.GetBydsSso(dsSso).then(function (response) {
        vm.researcher = response;
      });
    }

    //falta verificar corretmanet no back se email já existe
    function editResearcher() {
      ResearcherService.UpdateResearcher(vm.researcher).then(function (response) {
        if (response.code === 1003) {
          FlashService.Success(response.description, false);
          closeModal();
        } else {
          FlashService.Error(response.description, false);
          closeModal();
        }
      });
    }
    //falta o confirm password funcionar
    function editPassword() {
      ResearcherService.UpdatePassword(vm.researcher).then(function (response) {
        if (response.code === 1001) {
          FlashService.Success(response.description, false);
          closeModal();
        } else {
          FlashService.Error(response.description, false);
          closeModal();
        }
      });
    }



    function deleteResearcher() {
      showConfirmationMessage();
    }
    //entra caso usuário confirme no modal
    function yes() {
      closeModal();
      ResearcherService.Delete(vm.researcher.idResearcher).then(function (response) {
        console.log(response.data);
        // AuthenticationService.ClearCredentials();
        /* if (response.code === 1004) {
           FlashService.Success(response.description, true);
          
         } else {
           FlashService.Error(response.description, true);
           vm.dataLoading = false;
         }*/
      });
    }





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
