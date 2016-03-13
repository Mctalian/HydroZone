describe('toolbarCtrl', function() {
    var ctrl, $state;

    beforeEach(module('HydroZone'));

    beforeEach(inject(function($controller, _$state_) {
        $state = _$state_;

        ctrl = $controller('toolbarCtrl', {
            $state: $state
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    describe('isHomeState', function() {
        it('should return true if the current state is home', function() {
            spyOn($state, 'is').and.callFake(function() {
                return true;
            });

            expect(ctrl.isHomeState()).toBe(true);
            expect($state.is).toHaveBeenCalledWith('home');
        });

        it('should return false if the current state is dashboard', function() {
            spyOn($state, 'is').and.callFake(function() {
                return false;
            });

            expect(ctrl.isHomeState()).toBe(false);
            expect($state.is).toHaveBeenCalledWith('home');
        });
    });
});
