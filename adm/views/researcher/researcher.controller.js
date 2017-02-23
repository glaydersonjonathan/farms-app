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
    vm.showEditEmailForm = showEditEmailForm;
    vm.showChangePassForm = showChangePassForm;
    vm.closeModal = closeModal;


    vm.getBydsSso = getBydsSso;
    vm.editResearcher = editResearcher;
    vm.editPassword = editPassword;
    vm.editEmail = editEmail;

    vm.inactiveResearcher = inactiveResearcher;
    vm.deleteConfirm = deleteConfirm;



    initController();

    function initController() {
      vm.getBydsSso();
    }

    // Forms
    function showEditForm() {
      $('#create-modal-form-title').text("Edit Name Researcher");
      $('#create-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditEmailForm() {
      $('#edit-modal-form-title').text("Edit Email Researcher");
      $('#edit-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showChangePassForm() {
      vm.researcher.dsPassword = null;
      $('#change-modal-form-title').text("Change Password");
      $('#change-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Do you really want to delete your account?");
      $('#confirmation-message-modal-message').text("You will not be able to participate in any project any more.");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function closeModal() {
      $('#create-modal-form').modal('hide');
      $('#change-modal-form').modal('hide');
      $('#edit-modal-form').modal('hide');
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


    function editResearcher() {
      ResearcherService.UpdateResearcher(vm.researcher).then(function (response) {
        if (response.code === 1003) {
          FlashService.Success(response.description, false);
          getBydsSso();
          closeModal();
        } else {
          FlashService.Error(response.description, false);
          closeModal();
        }
      });
    }

    function editEmail() {
      ResearcherService.UpdateEmail(vm.researcher).then(function (response) {
        if (response.code === 1003) {
          FlashService.Success(response.description, false);
          getBydsSso();
          closeModal();
        } else {
          FlashService.Error(response.description, false);
          closeModal();
        }
      });
    }


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



    function inactiveResearcher() {
      showConfirmationMessage();
    }

    function deleteConfirm() {
      closeModal();
      ResearcherService.Delete(vm.researcher.idResearcher).then(function (response) {
        if (response.code === 1004) {
          vm.researcher = null;
          FlashService.Success(response.description, false);
          AuthenticationService.ClearCredentials();
        } else {
          FlashService.Error(response.description, false);
        }
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
