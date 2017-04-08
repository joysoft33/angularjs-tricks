var NameComponent = {
  bindings: {
    name: '<',
    age: '<'
  },
  controller: function () {},
  controllerAs: '$ctrl',
  template: `
    <div>
      <p>Name: {{$ctrl.name}}</p>
      <p>Age: {{$ctrl.age}}</p>
    </div>
  `
};

function MainController() {
  this.people = [{
    name: 'Todd',
    age: 25
  }, {
    name: 'Ryan',
    age: 20
  }, {
    name: 'Jilles',
    age: 21
  }];
}

angular
  .module('app', [])
  .controller('MainController', MainController)
  .component('nameComponent', NameComponent);