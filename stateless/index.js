var NameComponent = {

  template: `
    <div>
      <p>Name: {{$ctrl.name}}</p>
      <p>Age: {{$ctrl.age}}</p>
    </div>
  `,

  bindings: {
    name: '<',
    age: '<'
  }
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