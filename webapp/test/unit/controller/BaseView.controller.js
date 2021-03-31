/*global QUnit*/

sap.ui.define([
	"fileuploder/controller/BaseView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BaseView Controller");

	QUnit.test("I should test the BaseView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
