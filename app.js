(function () {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'angularUtils.directives.uiBreadcrumbs'])
    .config(config)
    .run(run)
    .value('page', {
      name: 'FARMS'
    });

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("adm");

    $stateProvider
      .state('/', {
        url: '/',
        controller: 'AccountController',
        templateUrl: "adm/views/account/account.view.html",
        controllerAs: 'vm'
      })
      .state('adm', {
        url: '/adm',
        controller: 'AdmController',
        templateUrl: "adm/adm.view.html",
        controllerAs: 'vm',
        title: 'Home',
        data: {
          displayName: 'Home'
        }
      })
      .state('confirmation', {
        url: '/confirmation',
        controller: 'AccountController',
        templateUrl: "adm/views/account/confirmation.view.html",
        controllerAs: 'vm',
      })
      .state('newPassword', {
        url: '/newPassword',
        controller: 'AccountController',
        templateUrl: "adm/views/account/newPassword.view.html",
        controllerAs: 'vm',
      })
      .state('adm.dashboard', {
        url: "/dashboard",
        controller: 'DashboardController',
        templateUrl: "adm/views/dashboard/dashboard.view.html",
        controllerAs: 'vm',
        data: {
          displayName: 'Home'
        }
      })
      .state('adm.projects', {
        url: "/projects",
        controller: 'ProjectController',
        templateUrl: "adm/views/project/project-view.html",
        controllerAs: 'vm',
        title: 'Projects',
        data: {
          displayName: 'Projects'
        }
      })
      .state('adm.researchers', {
        url: "/researchers",
        controller: 'ResearcherController',
        templateUrl: "adm/views/researcher/researcher-view.html",
        controllerAs: 'vm',
        title: 'Researchers',
        data: {
          displayName: 'Researcher'
        }
      })
      .state('adm.institutions', {
        url: "/project/institutions",
        controller: 'InstitutionController',
        templateUrl: "adm/views/institution/institution-view.html",
        controllerAs: 'vm',
        title: 'Institutions',
        data: {
          displayName: 'Institutions'
        }
      })
      .state('adm.members', {
        url: "/project/members",
        controller: 'MemberController',
        templateUrl: "adm/views/member/member-view.html",
        controllerAs: 'vm',
        title: 'Members',
        data: {
          displayName: 'Members'
        }
      })
      .state('adm.studies', {
        url: "/project/studies",
        controller: 'StudyController',
        templateUrl: "adm/views/study/study-view.html",
        controllerAs: 'vm',
        title: 'Studies',
        data: {
          displayName: 'Studies'
        }
      })
      .state('adm.studies-example', {
        url: "/project/studies/example",
        controller: 'StudyController',
        templateUrl: "adm/views/study/study-example.html",
        controllerAs: 'vm',
        title: 'Studies',
        data: {
          displayName: 'Studies'
        }
      })
      .state('adm.searches', {
        url: "/project/searches",
        controller: 'StudyController',
        templateUrl: "adm/views/search/search-view.html",
        controllerAs: 'vm',
        title: 'Searches',
        data: {
          displayName: 'Searches'
        }
      })
      .state('adm.protocol', {
        url: "/project/protocol",
        controller: 'ProtocolController',
        templateUrl: "adm/views/protocol/protocol-view.html",
        controllerAs: 'vm',
        title: 'Protocol',
        data: {
          displayName: 'Protocol'
        }
      })
      .state('adm.configuration_selection', {
        url: "/project/selection",
        controller: 'SelectionController',
        templateUrl: "adm/views/selection/selection-configuration-view.html",
        controllerAs: 'vm',
        title: 'Selection Configuration',
        data: {
          displayName: 'Selection Configuration'
        }
      })
      .state('adm.assign', {
        url: "/project/selection/assign",
        controller: 'SelectionController',
        templateUrl: "adm/views/selection/selection-assign-view.html",
        controllerAs: 'vm',
        title: 'Assign',
        data: {
          displayName: 'Assign'
        }
      })
      .state('adm.selection', {
        url: "/project/selection/review",
        controller: 'SelectionController',
        templateUrl: "adm/views/selection/selection-view.html",
        controllerAs: 'vm',
        title: 'Review',
        data: {
          displayName: 'Review'
        }
      })
      .state('adm.finalization', {
        url: "/project/selection/finalization",
        controller: 'SelectionController',
        templateUrl: "adm/views/selection/selection-conflicts-end-view.html",
        controllerAs: 'vm',
        title: 'Conflicts Solving and End Selection Step',
        data: {
          displayName: 'Finalization'
        }
      })
      .state('adm.charts', {
        url: "/project/charts",
        controller: 'ProtocolController',
        templateUrl: "adm/views/chart/chart-view.html",
        controllerAs: 'vm',
        title: 'Chart',
        data: {
          displayName: 'Chart'
        }
      })
      .state('adm.reports', {
        url: "/project/reports",
        controller: 'ProtocolController',
        templateUrl: "adm/views/report/report-view.html",
        controllerAs: 'vm',
        title: 'Report',
        data: {
          displayName: 'Report'
        }
      })
      .state('adm.extractions', {
        url: "/project/extractions",
        controller: 'ProtocolController',
        templateUrl: "adm/views/extraction/extraction-view.html",
        controllerAs: 'vm',
        title: 'Extraction',
        data: {
          displayName: 'Extraction'
        }
      })
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state'];
  function run($rootScope, $location, $cookieStore, $http, $state) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['adm']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      $rootScope.$state = $state
      if (restrictedPage && !loggedIn && $location.path() != '/newPassword' && $location.path() != '/confirmation' ) {
        $location.path('/');
      }
    });
  }

})();
