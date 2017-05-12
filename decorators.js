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

// 装饰器作用于类的属性
// function sexy(target, name, descriptor) {
//   let weight = descriptor.value
//   descriptor.value = () => {
//     console.log('少吃多运动')
//     weight()
//   }
//   descriptor.writable = false
//   return descriptor
// }
//
// class Man {
//   @sexy
//   weight() {
//     console.log('I am sexy')
//   }
// }
//
// let stank = new Man()
// // stank.weight = () => console.log('I am fat')
//
// stank.weight()