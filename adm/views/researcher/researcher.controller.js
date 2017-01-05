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
    
    vm.getAllResearchers = getAllResearchers;
    vm.editResearcher  = editResearcher;
    
    initController();

    function initController() {
      vm.getAllResearchers();
    }

 // Forms
    function clearForm() {
      vm.researcher = null;
    }

    function showCreateForm() {
      clearForm();
      $('#create-modal-title').text("Create Project");
      $('#create-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }



    // CRUD functions

    function getAllResearchers() {
      vm.dataLoading = true;
            ResearcherService.GetAll().then(function (response) {
        //if (response.code === 1000) {
          var researchers = response;
          vm.researchers = researchers;          
          vm.dataLoading = false;
          console.log(researchers);
          //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
    }

    function editResearcher(researcher){
    	
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
