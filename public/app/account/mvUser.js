angular.module('app').factory('mvUser', function ($resource) {
    $resource('/api/users/:id', {
                _id: "@id"
            });


    var UserResource = $resource('/api/users/:id', {}, {
            query: {
                method: 'GET',
                params: {
                    _id: "@id"
                },
                isArray: true
            },
            post: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    _id: "@id"
                },
                isArray: false
            },
            remove: {
                method: 'DELETE',
                params: {
                    _id: "@id"
                }
            }
        });

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        }

        return UserResource;
    });