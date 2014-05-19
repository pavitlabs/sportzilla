'use strict';

(function() {
    // Teams Controller Spec
    describe('MEAN controllers', function() {
        describe('TeamsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var TeamsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                TeamsController = $controller('TeamsController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one team object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('teams').respond([{
                        name: 'Phoenix',
                        parentTeamId: '',
                        city: 'Pune',
                        state: 'Maharashtra',
                        country: 'India'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.teams).toEqualData([{
                        name: 'Phoenix',
                        parentTeamId: '',
                        city: 'Pune',
                        state: 'Maharashtra',
                        country: 'India'
                    }]);

                });

            it('$scope.findOne() should create an array with one team object fetched ' +
                'from XHR using a teamId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.teamId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testTeamData = function() {
                        return {
                            name: 'Phoenix',
                            parentTeamId: '',
                            city: 'Pune',
                            state: 'Maharashtra',
                            country: 'India'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/teams\/([0-9a-fA-F]{24})$/).respond(testTeamData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.team).toEqualData(testTeamData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postTeamData = function() {
                        return {
                            name: 'Phoenix',
                            parentTeamId: '',
                            city: 'Pune',
                            state: 'Maharashtra',
                            country: 'India'
                        };
                    };

                    // fixture expected response data
                    var responseTeamData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            name: 'Phoenix',
                            parentTeamId: '',
                            city: 'Pune',
                            state: 'Maharashtra',
                            country: 'India'
                        };
                    };

                    // fixture mock form input values
                    scope.name = 'Phoenix';
                    scope.city = 'Pune';
                    scope.parentTeamId = '';
                    scope.state = 'Maharashtra';
                    scope.country = 'India';

                    // test post request is sent
                    $httpBackend.expectPOST('teams', postTeamData()).respond(responseTeamData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.name).toEqual('');
                    expect(scope.city).toEqual('');
                    expect(scope.state).toEqual('');
                    expect(scope.country).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/teams/' + responseTeamData()._id);
                });

            it('$scope.update() should update a valid team', inject(function(Teams) {

                // fixture rideshare
                var putTeamData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        name: 'Phoenix1',
                        parentTeamId: '',
                        city: 'Pune',
                        state: 'Maharashtra',
                        country: 'India'
                    };
                };

                // mock team object from form
                var team = new Teams(putTeamData());

                // mock team in scope
                scope.team = team;

                // test PUT happens correctly
                $httpBackend.expectPUT(/teams\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/teams\/([0-9a-fA-F]{24})$/, putTeamData()).respond();
                /*
                Error: Expected PUT /teams\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/teams/' + putTeamData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid teamId' +
                'and remove the team from the scope', inject(function(Teams) {

                    // fixture rideshare
                    var team = new Teams({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.teams = [];
                    scope.teams.push(team);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/teams\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(team);
                    $httpBackend.flush();

                    // test after successful delete URL location teams list
                    //expect($location.path()).toBe('/teams');
                    expect(scope.teams.length).toBe(0);

                }));
        });
    });
}());