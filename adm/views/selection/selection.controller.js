(function () {
    'use strict';

    angular
        .module('app')
        .controller('SelectionController', SelectionController);

    SelectionController.$inject = ['SelectionService', 'StudyService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

    /****** Begin SelectionController *****/
    function SelectionController(SelectionService, StudyService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
        var vm = this;

        vm.studies = [];
        vm.study = {};

        vm.page = false;


        vm.selection = {};

        vm.getAllStudies = getAllStudies;

        vm.getConfiguration = getConfiguration;

        vm.studiesByFilter = studiesByFilter;
        vm.dsTitleSearch = "";
        vm.nrYearSearch = "";
        vm.nmAuthorSearch = "";

        // Pagination functions
        vm.range = range;
        vm.prevPage = prevPage;
        vm.pageCount = pageCount;
        vm.nextPage = nextPage;
        vm.setPage = setPage;


        vm.showReadForm = showReadForm;
        vm.clearForm = clearForm;

        vm.saveConfiguration = saveConfiguration;

        initController();

        function clearForm() {
            vm.study = null;
        }

        function showReadForm(study) {
            clearForm();
            vm.study = study;
            $('#read-modal-form-title').text(study.dsTitle);
            $('#read-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
        }


        function initController() {
            vm.getAllStudies();
            vm.getConfiguration();
        }

        

        function getAllStudies() {
            vm.dataLoading = true;
            var currentProject = $cookieStore.get("currentProject");
            var dsKey = null;
            if (currentProject != null) {
                dsKey = currentProject.dsKey;
            }
            StudyService.GetStudiesByDsKey(dsKey).then(function (response) {
                var studies = response;
                console.log(response);
                vm.studies = studies;
                vm.dataLoading = false;
            });
        }

        function getConfiguration() {
            vm.dataLoading = true;
            var currentProject = $cookieStore.get("currentProject");
            var dsKey = null;
            if (currentProject != null) {
                dsKey = currentProject.dsKey;
            }
            SelectionService.GetConfiguration(dsKey).then(function (response) {
                console.log(response);
                vm.selection = response;
                vm.selection.dhStartSelectionStep = new Date(vm.selection.dhStartSelectionStep);
                vm.selection.dhEndSelectionStep = new Date(vm.selection.dhEndSelectionStep);
                vm.selection.dhConflictsSolvingEnd = new Date(vm.selection.dhConflictsSolvingEnd);
                vm.selection.dhReviewEnd = new Date(vm.selection.dhReviewEnd);
                vm.dataLoading = false;
            });
        }


        function saveConfiguration() {
            var currentProject = $cookieStore.get("currentProject");
            if (currentProject != null) {
                vm.selection.idProject = currentProject.idProject;
            }
            vm.selection.dhStartSelectionStep = new Date(vm.selection.dhStartSelectionStep);
            vm.selection.dhEndSelectionStep = new Date(vm.selection.dhEndSelectionStep);
            vm.selection.dhConflictsSolvingEnd = new Date(vm.selection.dhConflictsSolvingEnd);
            vm.selection.dhReviewEnd = new Date(vm.selection.dhReviewEnd);
            console.log(vm.selection);
            SelectionService.SaveConfiguration(vm.selection).then(function (response) {
                console.log(response.data);
                if (response.code === 1028) {
                    FlashService.Success(response.description, false);
                    getConfiguration();
                } else {
                    FlashService.Error(response.description, false);
                    vm.dataLoading = false;
                }
            });

        }


        /****** Start filter functions *****/
        function studiesByFilter() {
            return vm.studies.filter(function (study) {
                return (study.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
                    || study.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1)
                    && (study.nrYear == null || study.nrYear.toString().indexOf(vm.nrYearSearch) > -1
                        || study.nrYear.toString().toLowerCase().indexOf(vm.nrYearSearch.toLowerCase()) > -1)
                    && (study.nmAuthor == null || study.nmAuthor.toString().indexOf(vm.nmAuthorSearch) > -1
                        || study.nmAuthor.toString().toLowerCase().indexOf(vm.nmAuthorSearch.toLowerCase()) > -1);
            });
        }
        /****** End filters functions *****/

        /****** Start pagination functions *****/
        vm.currentPage = 0;
        vm.itemsPerPage = 30;

        function pageCount() {
            return Math.ceil(vm.studiesByFilter().length / vm.itemsPerPage) - 1;
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
    }
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
