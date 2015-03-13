angular.module('app', ['ngResource', 'ngRoute', 'ng-bootstrap-datepicker', 'ngAutocomplete']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    // configuration which auth to o by role
    var routeRoleChecks = {
            admin: {
                auth: function (mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute('admin')
                }
            },
            user: {
                auth: function (mvAuth) {
                    return mvAuth.authorizeAuthenticatedUserForRoute()
                }
            }
        }
        // Behave like REST
    $locationProvider.html5Mode(true);

    $routeProvider
    //.otherwise({ redirectTo: '/'})

    .when('/Succses', {
        template: 'LOG IN',
        controller: function ($scope, $q, $http, $location,mvUser, mvIdentity) {
            
            function authenticateUser() {
                var dfd = $q.defer();
                $http.post('/login/me').then(function (response) {
                    if (response.data.success) {
                            var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
                        dfd.resolve(true);
                        $location.path('/');
                        
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            }
            
            authenticateUser();
        }
    })
        .when('/', {
            templateUrl: '/partials/main/main.html',
            controller: 'mvMainCtrl'
        })
    // Check if user has admin auth and just if YES refirect to admin panel
    .when('/admin/users', {
        templateUrl: '/partials/admin/user-list.html',
        controller: 'mvUserListCtrl',
        resolve: routeRoleChecks.admin
    })
        .when('/users/update', {
            templateUrl: '/partials/account/user-update.html',
            controller: 'mvUserUpdateCtrl',
            resolve: routeRoleChecks.user
        })
    // For get profile page you have to be sign in so
    // we check if the user already authticated
    .when('/profile', {
        templateUrl: '/partials/account/profile.html',
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.user
    })
        .when('/signup', {
            templateUrl: '/partials/account/signup.html',
            controller: 'mvSignupCtrl'
        })
        .when('/courses', {
            templateUrl: '/partials/courses/course-list.html',
            controller: 'mvCourseListCtrl'
        })
        .when('/orders', {
            templateUrl: '/partials/orders/CreateMessage.html',
            controller: 'mvOrders'
        })
        .when('/screens/:id', {
            templateUrl: '/partials/screen/template.html',
            controller: 'mvScreen'
        })
});



angular.module('app').run(function ($rootScope, $location) {
    // Listen to event if not authorized move to Root path
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        // if no auth redirect to ROOT path
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})