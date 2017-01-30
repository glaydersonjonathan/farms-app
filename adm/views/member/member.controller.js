(function () {
  'use strict';

  angular
    .module('app')
    .controller('MemberController', MemberController);

  MemberController.$inject = ['MemberService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Begin MemberController *****/
  function MemberController(MemberService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    //vm.dataLoading = true;

    // Member
    vm.member = {};
    vm.members = [];

    //show buttons
    vm.roleResearcher = {};

    // Invite
    vm.invite = {};



    vm.clearForm = clearForm;
    vm.closeModal = closeModal;
    vm.showMemberInvitationForm = showMemberInvitationForm;
    vm.showEditForm = showEditForm;
    vm.showReadForm = showReadForm;

    vm.getAllMembers = getAllMembers;
    vm.getMemberByCdCite = getMemberByCdCite;

    vm.inviteMember = inviteMember;
    //vm.readMember = readMember;
    vm.updateMember = updateMember;
    vm.deleteMember = deleteMember;

    vm.membersByFilter = membersByFilter;
    vm.nmResearcherSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllMembers();
      getRoleResearcher();
    }

    // Forms
    function clearForm() {
      vm.member = null;
      //vm.flMember = null;
      vm.invite = null;
    }

    function closeModal() {
      $('#member-invitation-modal-form').modal('hide');
    }

    function showMemberInvitationForm() {
      clearForm();
      $('#member-invitation-modal-form-title').text("Member Invitation");
      $('#member-invitation-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showEditForm() {
      $('#edit-modal-title').text("Update member");
      $('#edit-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showReadForm() {
      $('#read-modal-title').text("Member");
      $('#read-modal-form').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal').modal({ backdrop: 'static', keyboard: false, show: true, closable: false });
    }

    // CRUD functions

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

    function getAllMembers() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey
      }
      ProjectService.GetMembersByDsKey(dsKey).then(function (response) {

        var members = response;
        vm.members = members;
        vm.dataLoading = false;
        if (response.code === 2008) {
          FlashService.Error(response.description, false);
          vm.lDataLoading = false;
        }
      });
    }



    function inviteMember() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        vm.invite.dsKey = currentProject.dsKey;
      }

      MemberService.Invite(vm.invite).then(function (response) {
        console.log(response.data);
        if (response.code === 1010) {
          FlashService.Success(response.description, false);
          vm.invite = null;
          closeModal();
          vm.getAllMembers();
        } else {
          FlashService.Error(response.description, false);
          vm.dataLoading = false;
          closeModal();
        }
      });
    };

    function getMemberByCdCite(cdCite) {
      //vm.dataLoading = true;
      MemberService.GetByCdCite(cdCite).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var member = response;
        return member;
        //} else {
        // console.log(response.data);
        //FlashService.Error(response.description);
        //vm.dataLoading = false;
        //}
      });
    }


//    function readMember(cdCiteKey) {
      //vm.dataLoading = true;
     // MemberService.GetByCdCiteKey(cdCiteKey).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
     //   vm.member = response;
        showReadForm();
        //} else {
        //FlashService.Error(response.description);
        //vm.dataLoading = false;
        //}
   ///   });
   // }

    function updateMember(member) {
      alert(vm.member.tpReview + " " + vm.member.dsKey + " " + vm.member.dsTitle + " " + vm.member.dsMember);
      /*
      vm.dataLoading = true;
      MemberService.Update(vm.member).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.member = null;
          $('#edit-modal-form').closeModal();
          vm.getAllMembers();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function deleteMember(cdCiteKey) {
      showConfirmationMessage();
      /*vm.dataLoading = true;
      if (Do you really want to delete this member?) {
      MemberService.Delete(vm.member).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.member = null;
          $('#create-modal-form').closeModal();
          vm.getAllMembers();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });
    }*/
    }

    /****** Start filter functions *****/
    function membersByFilter() {
      return vm.members.filter(function (member) {
        return (member.nmResearcher.toString().indexOf(vm.nmResearcherSearch) > -1
          || member.nmResearcher.toLowerCase().indexOf(vm.nmResearcherSearch.toLowerCase()) > -1);
      });
    };
    /****** End filters functions *****/

    /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.membersByFilter().length / vm.itemsPerPage) - 1;
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

  } /****** End MemberController *****/

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
