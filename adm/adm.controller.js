(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdmController', AdmController);

    AdmController.$inject = ['AccountService', 'ProjectService', '$rootScope', '$cookieStore','$state'];
    function AdmController(AdmService,ProjectService, $rootScope, $cookieStore, $state) {
        var vm = this;

        vm.user = {};
        vm.project = {};
        vm.projects = [];
        vm.year = {};

        vm.openProject = openProject;
        vm.getAllProjects = getAllProjects;

        initController();

        function initController() {
            loadCurrentUser();
            date();
            getAllProjects();
        }

        function date() {
            var date = new Date();
            vm.year = date.getFullYear();
        }


        function loadCurrentUser() {
            vm.user.dsName = $rootScope.globals.currentUser.dsName;
            vm.user.dsUsername = $rootScope.globals.currentUser.dsUsername;
            vm.user.dsEmail = $rootScope.globals.currentUser.dsEmail;
            vm.project = $cookieStore.get("currentProject");
        }

        function getAllProjects() {
            vm.dataLoading = true;
            var dsSso = $rootScope.globals.currentUser.dsUsername;
            ProjectService.GetAllByDsSsoResearcher(dsSso).then(function (response) {
                var projects = response;
                vm.projects = projects;
                vm.dataLoading = false;
            });
        }

        function openProject() {
            ProjectService.GetByDsKey(vm.project.dsKey).then(function (response) {
                var project = response;
                $cookieStore.put('currentProject', project);
                $state.go($state.current, {}, { reload: true });
            });
        }
    }
})();
