(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdmController', AdmController);

    AdmController.$inject = ['AccountService', 'ProjectService', 'DashboardService', 'FlashService', '$rootScope', '$cookieStore', '$state'];
    function AdmController(AdmService, ProjectService, DashboardService, FlashService, $rootScope, $cookieStore, $state) {
        var vm = this;

        vm.user = {};
        vm.project = {};
        vm.projects = [];
        vm.year = {};

        vm.openProject = openProject;
        vm.closeProject = closeProject;
        vm.getAllProjects = getAllProjects;
        vm.roleResearcher = {};

        vm.getInvitations = getInvitations;
        vm.invitations = [];
        vm.decline = decline;
        vm.accept = accept;

        initController();

        function initController() {
            vm.project = null;
            loadCurrentUser();
            date();
            getAllProjects();
            getRoleResearcher();
            getInvitations();
        }

        function getInvitations() {
            var dsSSO = $rootScope.globals.currentUser.dsUsername;
            DashboardService.GetInvitations(dsSSO).then(function (response) {
                vm.invitations = response;
            });
        }

        function decline(id) {
            DashboardService.Decline(id).then(function (response) {
                if (response.code === 1034) {
                    FlashService.Success(response.description, false);
                    vm.getInvitations();
                } else {
                    FlashService.Error(response.description, false);
                }
            });
        }

        function accept(id) {
            DashboardService.Accept(id).then(function (response) {
                if (response.code === 1035) {
                    FlashService.Success(response.description, false);
                    vm.getInvitations();
                } else {
                    FlashService.Error(response.description, false);
                }
            });
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

        function closeProject() {
            vm.project = null;
            $cookieStore.put('currentProject', null);
            $state.go($state.current, {}, { reload: true });
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
    }
})();
