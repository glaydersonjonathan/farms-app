(function () {
  'use strict';

  angular
  .module('app')
  .controller('ResearcherController', ResearcherController);

  ResearcherController.$inject = ['ResearcherService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ResearcherController *****/
  function ResearcherController(ResearcherService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    // Researcher
    vm.researcher = {};
    vm.researchers = [];
   
    
    // Forms
    vm.clearForm = clearForm;
    vm.showCreateForm = showCreateForm;
    //vm.showEditForm = showEditForm;
    //vm.showReadForm = showReadForm;
    
    vm.getBydsSso = getBydsSso;
    vm.editResearcher  = editResearcher;
    
    initController();

    function initController() {
      vm.getBydsSso();
    }

 // Forms
    function clearForm() {
      vm.researcher = null;
    }

    function showCreateForm() {
     // clearForm();
      $('#create-modal-title').text("Edit Researcher");
      $('#create-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }



    // CRUD functions

      function getBydsSso() {
        var dsSso = $rootScope.globals.currentUser.dsUsername;
        ResearcherService.GetBydsSso(dsSso).then(function (response) {  
        vm.researcher = response;
      });
    }



    function editResearcher(){
      ResearcherService.UpdateResearcher(vm.researcher).then(function (response) {  
      console.log(response.data);
        //vm.getBydsSso();
      }); 	
    }


   
 } /****** End ProjectController *****/

  /****** Start pager *****/
  angular
  .module('app')
  .filter('pagination', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });
  /****** End pager *****/
})();
