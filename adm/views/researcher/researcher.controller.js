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
    
    vm.getByNmResearcher = getByNmResearcher;
    vm.editResearcher  = editResearcher;
    
    initController();

    function initController() {
      var teste = 'andre';
      vm.getByNmResearcher(teste);
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

function getByNmResearcher(nmResearcher) {
      //vm.dataLoading = true;
      ResearcherService.GetByNmResearcher(nmResearcher).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var researcher = response;
        return researcher;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
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
