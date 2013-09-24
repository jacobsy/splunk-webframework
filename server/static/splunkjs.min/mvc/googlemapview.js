define("async",[],function(){function n(e){var t,n;t=document.createElement("script"),t.type="text/javascript",t.async=!0,t.src=e,n=document.getElementsByTagName("script")[0],n.parentNode.insertBefore(t,n)}function r(t,n){var r=/!(.+)/,i=t.replace(r,""),s=r.test(t)?t.replace(/.+!/,""):e;return i+=i.indexOf("?")<0?"?":"&",i+s+"="+n}function i(){return t+=1,"__async_req_"+t+"__"}var e="callback",t=0;return{load:function(e,t,s,o){if(o.isBuild)s(null);else{var u=i();window[u]=s,n(r(e,u))}}}}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.addBuffer("splunkjs/css/googlemap.css")}),requirejs.s.contexts._.nextTick=requirejs.nextTick,define("splunkjs/mvc/googlemapview",["require","exports","module","underscore","./mvc","./basesplunkview","./messages","async!http://maps.googleapis.com/maps/api/js?sensor=false","css!../css/googlemap.css"],function(e,t,n){var r=e("underscore"),i=e("./mvc"),s=e("./basesplunkview"),o=e("./messages");e("async!http://maps.googleapis.com/maps/api/js?sensor=false"),e("css!../css/googlemap.css");var u=s.extend({moduleId:n.id,className:"splunk-googlemap",options:{managerid:null,data:"preview"},initialize:function(){this.configure(),this.bindToComponentSetting("managerid",this._onManagerChange,this),this.map=null,this.markers=[],this.manager||this._onManagerChange(i.Components,null)},_onManagerChange:function(e,t){this.manager&&(this.manager.off(null,null,this),this.manager=null),this.resultsModel&&(this.resultsModel.off(null,null,this),this.resultsModel.destroy(),this.resultsModel=null);if(!t){this.message("no-search");return}this.message("empty"),this.manager=t,this.resultsModel=t.data(this.settings.get("data"),{output_mode:"json_rows"}),t.on("search:start",this._onSearchStart,this),t.on("search:progress",this._onSearchProgress,this),t.on("search:cancelled",this._onSearchCancelled,this),t.on("search:error",this._onSearchError,this),this.resultsModel.on("data",this.render,this),this.resultsModel.on("error",this._onSearchError,this),t.replayLastSearchEvent(this)},_onSearchCancelled:function(){this._isJobDone=!1,this.message("cancelled")},_onSearchError:function(e,t){this._isJobDone=!1;var n=e;t&&t.data&&t.data.messages&&t.data.messages.length&&(n=r(t.data.messages).pluck("text").join("; ")),this.message({level:"error",icon:"warning-sign",message:n})},_onSearchProgress:function(e){e=e||{};var t=e.content||{},n=t.resultPreviewCount||0,r=this._isJobDone=t.isDone||!1;if(n===0&&r){this.message("no-results");return}if(n===0){this.message("waiting");return}},_onSearchStart:function(){this._isJobDone=!1,this.message("waiting")},clearMarkers:function(){var e=this.markers.length;for(var t=0;t<e;++t)this.markers[t].setMap(null);this.markers.length=0},createMap:function(){this.map=new google.maps.Map(this.el,{center:new google.maps.LatLng(47.6,-122.32),zoom:2,mapTypeId:google.maps.MapTypeId.ROADMAP}),this.map.setOptions(this.options)},message:function(e){this.map=null,o.render(e,this.$el)},render:function(){if(!this.manager)return;if(!this.resultsModel||!this.resultsModel.hasData())return this.resultsModel&&!this.resultsModel.hasData()&&this._isJobDone&&this.message("no-results"),this;this.map||this.createMap();var e=this;return this.clearMarkers(),this.resultsModel.collection().each(function(t){var n=parseFloat(t.get("lat")),r=parseFloat(t.get("lng")),i=new google.maps.LatLng(n,r),s=new google.maps.Marker({position:i,map:e.map});e.markers.push(s)}),this}});return u}),requirejs.s.contexts._.nextTick=function(e){e()},require(["css"],function(e){e.setBuffer("/*  */\n\n/* Bootstrap Css Map Fix*/\n.splunk-googlemap img { \n  max-width: none;\n}\n/* Bootstrap Css Map Fix*/\n.splunk-googlemap label { \n  width: auto; \n  display:inline; \n} \n/* Set a small height on the map so that it shows up*/\n.splunk-googlemap {\n    min-height: 100px;\n    height: 100%;\n}\n")}),requirejs.s.contexts._.nextTick=requirejs.nextTick;