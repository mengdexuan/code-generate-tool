var app = angular.module('app', [
       	'ngAnimate',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ui.validate',
        'pascalprecht.translate',
        'messager',
        'toaster',
        'hc.util',
        'hc.ui',
        'hc.common'
    ]);
app.serverUrl = "http://test.adi.iciyun.com:8080";
app.config(
	    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
	        // lazy controller, directive and service
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
	        app.constant   = $provide.constant;
	        app.value      = $provide.value;
	    }
	  ])
	  .config(['$translateProvider', function($translateProvider){
	    $translateProvider.useStaticFilesLoader({
	      prefix: 'asset/l10n/',
	      suffix: '.js'
	    });
	    $translateProvider.preferredLanguage('zh_CN');
	  }]).factory('responseObserver', ['$q','$window',function responseObserver($q, $window) {
		    return {
		        'responseError': function(errorResponse) {
		            switch (errorResponse.status) {
		            case 401:
		                $window.location.href = 'login.html';
		                break;
		            }
		            return $q.reject(errorResponse);
		        }/*,
                request: function(config) {
                    config.headers = config.headers || {};
                    if(!config.url.endsWith(".html") && !config.url.endsWith(".js")){
                    	if(!config.url.startsWith("/")){
                            config.url = "/" + config.url;
                        }
                    	config.url = app.serverUrl + config.url;
                    }
                    if ($window.localStorage.Authentication) {
                        config.headers['Authentication'] = $window.localStorage.Authentication;
                    }
                    return config || $q.when(config);
                }*/
		    };
		}]).config(['$httpProvider',function($httpProvider){  
		  $httpProvider.interceptors.push('responseObserver');
		  $httpProvider.defaults.transformRequest = function(obj){  
			     var params = [];  
			     for(var p in obj){  
			    	 var value = obj[p];
			    	 if(angular.isObject(value)){
			    		 transformObject(value,p,params);
			    	 }else{
			    		 params.push(encodeURIComponent(p) + "=" + encodeURIComponent(angular.isUndefined(value) ? "" : value));   
			    	 }
			     }  
			     return params.join("&");  
			   }; 
		   function transformObject(obj,name,params){
			   for(var pro in obj){
				   var value = obj[pro];
				   var paramName = name + "." + pro;
				   if(angular.isObject(value)){
					   transformObject(value,paramName,params);
				   }else{
					   params.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(angular.isUndefined(value) ? "" : value));  
				   }
			   }
		   }
		  
		   $httpProvider.defaults.headers.post = {  
		       'Content-Type': 'application/x-www-form-urlencoded',
				//'Content-Type': 'application/json',
		        'X-Requested-With' : 'XMLHttpRequest'
		   };  
		   $httpProvider.defaults.headers.get = {  
		        'X-Requested-With' : 'XMLHttpRequest'
		   }; 
	  }]);
app.run(['$rootScope', '$state', '$stateParams','$http','Messager',
	 function ($rootScope,   $state,   $stateParams,$http,Messager) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;        
}])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
	function ($stateProvider,   $urlRouterProvider,$locationProvider) {
		  //$locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/index');
      $stateProvider.state('/index', {
              url: '/index',
              templateUrl: 'asset/tpl/index.html'
          });
	}
]);
app.controller('AppCtrl', ['$rootScope','$scope', 'toaster','Messager','$http','$modal','$location','$state','$http',
           function( $rootScope,$scope,toaster,Messager,$http,$modal,$location,$state,$http,user,setting,menus) {
	$scope.ie9 = /msie 9/.test(window.navigator.userAgent.toLowerCase());
    $rootScope.toaster = toaster;
    $rootScope.toaster = toaster;
    //设置用户信息
	$rootScope.started = true;
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['app']);
});

/*

angular.element(document).ready(function() {

    if(window.localStorage.Authentication){
        $.ajaxSetup({
            headers : {
                Authentication : window.localStorage.Authentication
            }
        });
        loadEnv();
    }else{
        window.location.href = 'login.html';
    }
	

	
	 //加载用户信息
    function loadEnv(){
    	$.ajax({
    		url:app.serverUrl +"/env",
    		method:'get'
    	}).success(function(result){
			if(result.success){
				delete result.success;
				app.value("user",result.data.user);
				app.value("setting",{
					staticResourceServerUrl : '',
					resourceServceUrl : ''
				});
				var menus = result.data.menus;
				app.value("menus",menus);
				
				//根据菜单初始化路由
				app.config(['$stateProvider', function ($stateProvider) {
			        menus.forEach(function(menu){
			        	menu.state = menu.code;
			        	if(menu.children && menu.children.length > 0){
			        		$stateProvider.state(menu.code, {
			                    url: '/' + menu.code,
			                    template: '<div ui-view class="app-view fade-in-up"></div>'
			                });
			        		var children = menu.children;
			        		children.forEach(function(child){
			        			if(child.url){
				        			child.state = menu.state + "." + child.code;
				        			configMenu(child);
			        			}
			        		});
			        	}else{
			        		if(menu.url){
					        	configMenu(menu);
			        		}
			        	}
			        });

			        function configMenu(child){
                        if(child.url){

                        	var config = {
                        		url : '/' + child.code
							};

                            if(child.loadType == '1'){
                                config.template = '<iframe class="h-full w-full no-border" src="'+child.url+'"></iframe>';
                            }else{
                                config.templateUrl = child.url;
                            }
                            $stateProvider.state(child.state,config);
                        }
					}

			    }]);
				
				bootstrap();
			}else{
				alert("加载用户信息失败，请重新刷新页面再试");
			}
		}).error(function(xhr){
			if(xhr.status == 401){
				window.location.href="login.html";
			}
		});
    }
    
    function bootstrap(){
    	angular.bootstrap(document, ['app']);
    	window.clearInterval(window.preloadInterval);
    }
});*/
