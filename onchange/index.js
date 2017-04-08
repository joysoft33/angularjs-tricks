var parentComponent = {
  template: `
  	<div>
    	<a href="" ng-click="$ctrl.changeUser();">
      	Change user (this will call $onChanges in child)
      </a>
    	<child-component user="$ctrl.user"></child-component>
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
  }
};

var childComponent = {
  bindings: {
    user: '<'
  },
  template: `
  	<div>
    	<pre>{{ $ctrl.user | json }}</pre>
    </div>
  `,
  controller: function () {
    this.$onChanges = function (changes) {
      this.user = changes;
    };
  }
};

angular
  .module('app', [])
  .component('parentComponent', parentComponent)
  .component('childComponent', childComponent);