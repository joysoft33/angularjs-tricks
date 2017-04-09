var parentComponent = {

  template: `
  	<div>
    	<pre>Parent Object: {{ $ctrl.user | json }}</pre>
    	<button ng-click="$ctrl.changeUser();">
      	Change user (this will call $onChanges in child)
      </button>
    	<child-component 
        user="$ctrl.user"
        on-update="$ctrl.updateUser(user);">
      </child-component>
    </div>
  `,

  controller: function () {

    this.$onInit = () => {
      this.user = {
        name: 'Todd Motto',
        location: 'England, UK'
      };
    };

    this.changeUser = () => {
      this.user = {
        name: 'Tom Delonge',
        location: 'California, USA'
      };
    };

    this.updateUser = (user) => {
      this.user = user;
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
      <button ng-click="$ctrl.saveUser();">Update</button>
    </div>
  `,

  controller: function () {

    this.$onChanges = (changes) => {
      if (changes.user) {
        if (changes.user.isFirstChange()) {
          console.log('First change...');
        }
        this.user = angular.copy(changes.user.currentValue);
      }
    };

    this.saveUser = () => {
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