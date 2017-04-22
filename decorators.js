// babel --plugins transform-decorators-legacy decorators.js > ./build/decorators.js
function fly(target) {
    target.fly = () => 'I can fly'
    return target;
}

@fly
class Ironman {
    say() {
        console.log('I am ironman');
    }
}
console.log(Ironman.fly());