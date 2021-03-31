sap.ui.define([
	// "sap/ui/core/mvc/Controller"
	"fileuploder/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";

		return BaseController.extend("fileuploder.controller.BaseView", {
			onInit: function () {
				this.getFileData()
			},
			onAfterRendering:function(){
				console.log("onaferter")
			},
			onBeforeRendering:function(){
				console.log("on before aferter")
			},
			onUploaderTS:function(oEvent){
				debugger
			var filename = this.getView().byId("TSFileName").getValue();
			 var oFileUpload = this.getView().byId("fileUploaderTS").getValue();


		   if(filename == "" && oFileUpload == ""){
			  this.getView().byId("TSFileName").setValueState(sap.ui.core.ValueState.Error);
			   this.getView().byId("TSFileName").setValueStateText("Please Enter File Name");
			   this.getView().byId("fileUploaderTS").setValueState(sap.ui.core.ValueState.Error);
			   this.getView().byId("fileUploaderTS").setValueStateText("Please Enter Some File");
		   }
		   else{
				this.getView().byId("TSFileName").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("fileUploaderTS").setValueState(sap.ui.core.ValueState.None);


			 var oFileUpload = this.getView().byId("fileUploaderTS");
			   var domRef = oFileUpload.getFocusDomRef();
			   var file = domRef.files[0];
			   var that = this;
			   this.Eid=this.getView().byId("InputIdTS").getValue();
			   this.EmpName= this.getView().byId("InputNameTS").getValue();
			   this.fileName = this.getView().byId("TSFileName").getValue()+".csv";
			   this.fileType = file.type;
			   this.json_object=null
			 
			   var reader = new FileReader();
				 reader.onload = function(e) {
	 var data = e.target.result;
	 var workbook = XLSX.read(data, {
	   type: 'binary'
	 });

	 workbook.SheetNames.forEach(function(sheetName) {
	   // Here is your object
	   var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	   if(XL_row_object.length!==0){

		that.json_object = JSON.stringify(XL_row_object);
		console.log(that.json_object);
	}
	   
	})
	that.updateFile(that.Eid, that.fileName, that.fileType, that.json_object,that.EmpName);

   };

   reader.onerror = function(ex) {
	 console.log(ex);
   };

   reader.readAsBinaryString(file);

		   }
	   
		   },
		   onUploadFile:function(oEvent){
			debugger
			 var filename = this.getView().byId("FileName").getValue();
		 var oFileUpload = this.getView().byId("fileUploaderFS").getValue();


	   if(filename == "" && oFileUpload == ""){
		  this.getView().byId("FileName").setValueState(sap.ui.core.ValueState.Error);
		   this.getView().byId("FileName").setValueStateText("Please Enter File Name");
		   this.getView().byId("fileUploaderFS").setValueState(sap.ui.core.ValueState.Error);
		   this.getView().byId("fileUploaderFS").setValueStateText("Please Enter Some File");
	   }else{
		   this.getView().byId("FileName").setValueState(sap.ui.core.ValueState.None);
		   this.getView().byId("fileUploaderFS").setValueState(sap.ui.core.ValueState.None);


		 var oFileUpload = this.getView().byId("fileUploaderFS");

		   var domRef = oFileUpload.getFocusDomRef();
		   var file = domRef.files[0];
		   var that = this;
			if(file=== undefined){
			   sap.m.MessageToast.show("Please select a file")
		   }else{
			this.Eid=this.getView().byId("InputIdFS").getValue();
			this.EmpName= this.getView().byId("InputNameFS").getValue();
		   this.fileName = this.getView().byId("FileName").getValue();
		   this.fileType = file.type;
		   var reader = new FileReader();
		   reader.onload = function (e) {
			   var vContent = e.currentTarget.result.replace("data:"+file.type+ ";base64,","");
				   vContent=vContent.replace("data:application/octet-stream;base64,","");
			  // debugger
		   that.updateFile(that.Eid, that.fileName, that.fileType, vContent,that.EmpName);
		   }
			reader.readAsDataURL(file);
	   }
	}
},
downloadFile:function(oEvent){
	// debugger;
	 var fileName =oEvent.getSource().oParent.mAggregations.cells[2].mProperties.text;
	 this.getFile(fileName);
  },
		});
	});
