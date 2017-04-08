let tabs = {

  template: `
      <div class="tabs">
        <div class="tabs_list">
          <span
            ng-repeat="tab in $ctrl.tabs"
            ng-class="{selected: tab.selected}"
            ng-click="$ctrl.selectTab($index);"
          >
            <span ng-bind="tab.label"></span>
          </span>
        </div>
        <div class="tabs_content" ng-transclude></div>
      </div>
    `,

  bindings: {
    selected: '@'
  },

  transclude: true,

  controller: function () {

    this.$onInit = () => {
      this.tabs = [];
    }

    this.addTab = (tab) => {
      this.tabs.push(tab);
    };

    this.selectTab = (index) => {
      this.tabs.map((tab, i) => tab.selected = (i == index));
    };

    this.$postLink = () => {
      this.selectTab(this.selected || 0);
    }

  },

};

let tab = {

  template: `
    <div ng-if="$ctrl.tab.selected" ng-transclude></div>
  `,

  bindings: {
    label: '@'
  },

  require: {
    tabs: '^^tabs'
  },

  transclude: true,

  controller: function () {

    this.$onInit = () => {

      this.tab = {
        label: this.label,
        selected: false
      };

      this.tabs.addTab(this.tab);
    };
  }
};

angular
  .module('app', [])
  .component('tab', tab)
  .component('tabs', tabs);