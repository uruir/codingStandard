```
System.out.println("呵呵");
```

需要用双引号及分号，而 JavaScript 单双引均可，大部分情况也无需分号。

通过 `javac HelloWorld.java` 将源文件编译成字节码文件，其中类名应与文件名相同，生成 `HelloWorld.class` 文件，再用 `java` 命令运行 `class` 文件：`java HelloWorld`。注：类名大小写敏感，且每个单词首字母都为大写；方法名为驼峰大小写。

类名、变量名和方法名都是标识符（a1c | $a1c | _a1c）。

类中使用修饰符来修饰类的属性和方法，可访问的：`default`, `public`, `protected`, `private`；不可访问的：`final`, `abstract`（抽象类的修饰符）, `strictfp`。

变量：

- 局部变量（在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁。修饰符不能用于局部变量。在栈上分配。没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用）
- 类变量（静态变量，声明在类中，方法体之外，但必须声明为static类型。无论一个类创建了多少个对象，类只拥有类变量的一份拷贝。静态变量除了被声明为常量外很少使用。常量是指声明为 public/private, final 和 static 类型的变量。常量初始化后不可改变。在程序开始时创建，在程序结束时销毁。）
- 成员变量（即实例变量，是非静态变量，定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问。访问修饰符可以修饰实例变量）。

每个类都有构造方法。如果没有显式地为类定义构造方法，Java编译器将会为该类提供一个默认构造方法。

在创建一个对象的时候，至少要调用一个构造方法。构造方法的名称必须与类同名，一个类可以有多个构造方法。

```
public class Puppy {
   public Puppy(){
   }

   public Puppy(String name) {
      // 这个构造器仅有一个参数：name
   }
}
```

创建对象：对象是根据类创建的。在 Java 中，使用关键字 new 来创建一个新的对象。

创建对象需要以下三步：

- 声明：声明一个对象，包括对象名称和对象类型
- 实例化：使用关键字new来创建一个对象
- 初始化：使用new创建对象时，会调用构造方法初始化对象

```
public class Puppy {
   public Puppy(String name) {
      //这个构造器仅有一个参数：name
      System.out.println("Passed Name is :" + name );
   }
   public static void main(String []args) {
      // 下面的语句将创建一个Puppy对象
      Puppy myPuppy = new Puppy( "tommy" );
   }
}
```

数组是储存在堆上的对象，保存多个同类型变量。

枚举限制变量的值只能是预先设定好的值。

```
class FreshJuice {
   enum FreshJuiceSize{ SMALL, MEDUIM, LARGE }
   FreshJuiceSize size;
}

public class FreshJuiceTest {
   /* 这
    * 是
    * 一个多行注释的示例
    */
   public static void main(String []args) {
      // 这是单行注释的示例
      FreshJuice juice = new FreshJuice();
      juice.size = FreshJuice. FreshJuiceSize.MEDUIM ;
   }
}
```

上例中枚举声明在类中，它也可以单独声明。方法、变量、构造函数也可以在枚举中定义。

`assert`：断言条件是否满足
`naive`：表示方法由非 JAVA 代码实现
`static`：类级别定义，所有实例共享
`super`：基（超）类
`Java2 Platform Standard/Enterprice/Micro Edition` 改名为：`Java SE/EE/ME`。

面向对象：

- 类之间的单继承
- 接口（对象间相互通信的协议，只定义派生要用到的方法，但是方法的具体实现完全取决于派生类）之间的多继承
- 类与接口之间的实现机制
- 动态绑定（程序所需的类被动态载入运行环境中）

线程是一种特殊的对象，它必须由Thread类或其子（孙）类来创建。通常有两种方法来创建线程：其一，使用型构为Thread(Runnable)的构造子将一个实现了Runnable接口的对象包装成一个线程，其二，从Thread类派生出子类并重写run方法，使用该子类创建的对象即为线程。值得注意的是Thread类已经实现了Runnable接口，因此，任何一个线程均有它的run方法，而run方法中包含了线程所要运行的代码。线程的活动由一组方法来控制。Java语言支持多个线程的同时执行，并提供多线程之间的同步机制（关键字为synchronized）。

在"系统变量"中设置 3 项属性：`JAVA_HOME` & `PATH` & `CLASSPATH`，大小写无所谓。其中 `CLASSPATH` 的值为：`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;`；`PATH` 的值为：`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`。注：1.5 以上版本的 JDK 无需再设置 `CLASSPATH`。

一个 JAVA 程序是一系列对象的集合。对象有状态和行为，类是模板，描述一类对象的状态和行为；行为就是方法，一个类可以有很多方法；每个类都有独特的实例变量，对象的状态由这些实例变量的值决定。

源文件声明规则：当在一个源文件中定义多个类，并且还有 `import` 语句和 `package` 语句时，要特别注意这些规则。一个源文件中只能有一个 `public` 类，一个源文件可以有多个非 `public` 类。如果一个类定义在某个包中，那么 `package` 语句应该在源文件的首行。如果源文件包含 `import` 语句，那么应该放在 `package` 语句和类定义之间。如果没有 `package` 语句，那么 `import` 语句应该在源文件中最前面。`import` 语句和 `package` 语句对源文件中定义的所有类都有效。在同一源文件中，不能给不同的类不同的包声明。类有若干种访问级别，并且类也分不同的类型：抽象类和 `final` 类等。除了上面提到的几种类型，Java 还有一些特殊的类，如：内部类、匿名类。

包主要用来对类和接口进行分类。当开发Java程序时，可能编写成百上千的类，因此很有必要对类和接口进行分类。

简单示例：

```
import java.io.*;
public class Employee {
   // 成员变量
   String name;
   int age;
   String designation;
   double salary;
   // Employee 类的构造器，即构造方法，只有一个参数
   public Employee(String name) {
      this.name = name;
   }
   // 设置 age 的值
   public void empAge(int empAge) {
      age =  empAge;
   }
   /* 设置 designation 的值*/
   public void empDesignation(String empDesig) {
      designation = empDesig;
   }
   /* 设置 salary 的值*/
   public void empSalary(double empSalary) {
      salary = empSalary;
   }
   /* 打印信息 */
   public void printEmployee() {
      System.out.println("Name:"+ name );
      System.out.println("Age:" + age );
      System.out.println("Designation:" + designation );
      System.out.println("Salary:" + salary);
   }
}
```

程序都是从 `main` 方法开始执行。为了能运行这个程序，必须包含 `main` 方法并且创建一个实例对象。下面给出 `EmployeeTest` 类，该类实例化两个 `Employee` 类的实例，并调用方法设置变量的值。

```
import java.io.*;
public class EmployeeTest {

   public static void main(String args[]){
      /* 使用构造器创建两个对象 */
      Employee empOne = new Employee("James Smith");
      Employee empTwo = new Employee("Mary Anne");

      // 调用这两个对象的成员方法
      empOne.empAge(26);
      empOne.empDesignation("Senior Software Engineer");
      empOne.empSalary(1000);
      empOne.printEmployee();

      empTwo.empAge(21);
      empTwo.empDesignation("Software Engineer");
      empTwo.empSalary(500);
      empTwo.printEmployee();
   }
}
```

内置数据类型（六种数字类型，4 整 2 浮；字符类型；布尔类型）：

- byte：8 位有符号整数，-128 to 127，默认值为 0，包装类为 `java.lang.Byte`
- short：16 位有符号整数，-32768 to 32767，默认值也为 0
- int：32 位有符号整数，默认值依然为 0
- long：64 位有符号整数，默认值为 0L
- float：32 位单精度浮点数，默认值 0.0f
- double：64 位双精度，默认值 0.0
- boolean：默认值 false
- char：16 位 Unicode 字符，`\u0000` to `\uffff`，可以储存任意字符

引用类型由类的构造函数创建，可以使用它们访问所引用的对象。这些变量在声明时被指定为一个特定的类型，比如 Employee、Pubby 等。变量一旦声明后，类型就不能被改变了。对象、数组都是引用数据类型。所有引用类型的默认值都是 null。一个引用变量可以用来引用与任何与之兼容的类型。例子：`Site site = new Site("Runoob")`。

常量：`final double PI = 3.1415927;`。

所有Java的类均是由java.lang.Object类继承而来的。

Implements关键字使用在类继承接口的情况下， 这种情况不能使用关键字extends。

```
public interface Animal {}

public class Mammal implements Animal {
}

public class Dog extends Mammal {
}
```

如果不能继承一个方法，则不能重写这个方法。

当需要在子类中调用父类的被重写方法时，要使用super关键字。

抽象方法没有定义，方法名后面直接跟一个分号，而不是花括号。

接口（英文：Interface），在JAVA编程语言中是一个抽象类型，是抽象方法的集合，接口通常以interface来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。类描述对象的属性和方法。接口则包含类要实现的方法。除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。接口无法被实例化，但是可以被实现。一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类。另外，在Java中，接口类型可用来声明一个变量，他们可以成为一个空指针，或是被绑定在一个以此接口实现的对象。

Java 程序运行在 Java Vitual Machine 中，而 JVM 又是 Java Runtime Environment 的一部分。电脑中只要有 JRE（包含 JVM 标准实现和 Java 核心类库）就可以运行 Java 程序。JDK（编译器、Jar 打包工具、Javadoc 文档生成器、Debug 调试器、头文件生成器、反汇编器和监控工具等）包含了 JRE。

Java 源程序以 .class 为后缀，JDK 是 Java 语言的开发包，可以将 .class 编译为可执行 Java 程序，可执行 Java 程序需要 JVM 才可以运行。

安装了完整的 JDK 后，双击 Jar 文件即可运行它。

```
package net.ourteam.test;

/**
 * Created by uRuier on 16/5/31.
 */
public class Test {
  public static void main(String []args) {
    System.out.println("呵呵");
  }
}
```
