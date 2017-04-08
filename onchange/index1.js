var parentComponent = {
  template: `
  	<div>
    	<pre>Parent Object: {{ $ctrl.user | json }}</pre>
    	<a href="" ng-click="$ctrl.changeUser();">
      	Change user (this will call $onChanges in child)
      </a>
    	<child-component 
        user="$ctrl.user"
        on-update="$ctrl.updateUser($event);">
      </child-component>
    </div>
  `,
  controller: function () {
    this.$onInit = function () {
      this.user = {
        name: 'Todd Motto',
        location: 'England, UK'
      };
    };
    this.changeUser = function () {
      this.user = {
        name: 'Tom Delonge',
        location: 'California, USA'
      };
    };
    this.updateUser = function (event) {
      this.user = event.user;
    };
  }
};

var childComponent = {
  bindings: {
    onUpdate: '&',
    user: '<'
  },
  template: `
  	<div>
      <input type="text" ng-model="$ctrl.user.name">
      <pre>Child Object: {{ $ctrl.user | json }}</pre>
      <a href="" ng-click="$ctrl.saveUser();">Update</a>
    </div>
  `,
  controller: function () {
    this.$onChanges = function (changes) {
      if (changes.user) {
        if (changes.user.isFirstChange()) {
          console.log('First change...', changes);
        }
        this.user = angular.copy(changes.user.currentValue);
      }
    };
    this.saveUser = function () {
      this.onUpdate({
        user: this.user
      });
    };
  }
};

angular
  .module('app', [])
  .component('parentComponent', parentComponent)
  .component('childComponent', childComponent);
