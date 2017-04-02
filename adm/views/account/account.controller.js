(function () {
  'use strict';

  angular
    .module('app')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['AccountService', 'AuthenticationService', '$location', 'FlashService'];
  function AccountController(AccountService, AuthenticationService, $location, FlashService) {
    var vm = this;

    vm.luser = {};
    vm.login = login;

    vm.ruser = {};
    vm.register = register;
    vm.confirm = confirm;

    vm.resend_button = false;
    vm.resend = resend;

    (function initController() {
      // reset login status.
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.lDataLoading = true;
      //alert(vm.luser.dsEmail + " " + vm.luser.dsPassword);
      AuthenticationService.Login(vm.luser, function (response) {
        if (response.code === 2013) {
          FlashService.Error(response.description, false);
          vm.resend_button = true;
        }
        if (response.code === 1000) {
          var loggedUser = response.data;
          loggedUser.dsPassword = vm.luser.dsPassword;
          AuthenticationService.SetCredentials(loggedUser);
          $location.path('/adm');
        } else {
          FlashService.Error(response.description, false);
          vm.lDataLoading = false;
        }
      });
    };


    function confirm() {
      var code = $location.search();
      AccountService.Confirm(code.u).then(function (response) {
        if (response.code === 1005) {
          FlashService.Success(response.description, false);
        } else {
          FlashService.Error(response.description, false);
        }
      });
    }

    function resend() {
      vm.resend_button = false;
      AccountService.Resend(vm.luser).then(function (response) {
        if (response.code === 1036) {
          FlashService.Success(response.description, false);
        } else {
          FlashService.Error(response.description, false);
        }
      });
    }

    function register() {
      //alert(vm.ruser.dsName  + " " + vm.ruser.dsSSO + " " + vm.ruser.dsEmail + " " + vm.ruser.dsPassword + " " + vm.ruser.dsConfirmPassword);
      vm.rDataLoading = true;
      AccountService.Register(vm.ruser).then(function (response) {
        if (response.code === 1002) {
          FlashService.Success(response.description, false);
          vm.ruser = null;
          vm.rDataLoading = false;
        } else {
          FlashService.Error(response.description, false);
          vm.rDataLoading = false;
        }
      });
    };
  }

})();
