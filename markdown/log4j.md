## Log for Java

Apache的开源项目，可以按照开发人员预告的设定，在指定的位置和情况下打印log语句；并且可以酌情关闭某些log语句，如开发阶段的debug语句。
有五种log级别：

- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL

## SLF4J

简单日记门面(Facade)SLF4J是为各种loging APIs提供一个简单统一的接口，从而使得最终用户能够在部署的时候配置自己希望的loging APIs实现。 Logging API实现既可以选择直接实现SLF4J接的loging APIs如： NLOG4J、SimpleLogger。也可以通过SLF4J提供的API实现来开发相应的适配器如Log4jLoggerAdapter、JDK14LoggerAdapter。

## Apache Common-Logging

目前广泛使用的Java日志门面库。通过动态查找的机制，在程序运行时自动找出真正使用的日志库。但由于它使用了ClassLoader寻找和载入底层的日志库，导致了象OSGI这样的框架无法正常工作，由于其不同的插件使用自己的ClassLoader。 OSGI的这种机制保证了插件互相独立，然而确使Apache Common-Logging无法工作。

SLF4J库类似于Apache Common-Logging。但是，他在编译时静态绑定真正的Log库。使用SLF4J时，如果你需要使用某一种日志实现，那么你必须选择正确的SLF4J的jar包的集合。 如此便可以在OSGI中使用了。

另外，SLF4J 支持参数化的log字符串，避免了之前为了减少字符串拼接的性能损耗而不得不写的if(logger.isDebugEnable())，现在你可以直接写：logger.debug(“current user is: {}”, user)。拼装消息被推迟到了它能够确定是不是要显示这条消息的时候，但是获取参数的代价并没有幸免。同时，日志中的参数若超过三个，则需要将参数以数组的形式传入，如：

```
Object[] params = {value1, value2, value3};
logger.debug(“first value: {}, second value: {} and third value: {}.”, params);
```

现在，Hibernate、Jetty、Spring-OSGi、Wicket和MINA等项目都已经迁移到了SLF4J，由此可见SLF4J的影响力不可忽视。

使用CommonLog接口而实际由SLF4J和Log4j实现的过程

1. 项目中照常使用

    ```
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    ```

    编写日志。

2. 仍然在src下使用log4j.properties文件进行配置。

3. 使用的所有jar文件：
   1）log4j-1.2.15.jar 这是log4j的库。 SLF4J并不改变这个底层实现库。
   2）slf4j-api-1.5.2.jar 这是SLF4J库。
   3）slf4j-log4j12-1.5.2.jar 这包含Log4j的适配器和静态绑定log4j底层实现。
   4）jcl-over-slf4j-1.5.2.jar 这提供了Commons-Logging接口，以及使用common-loggin的接口，底层还是由SLF4J来决定哪种实现机制 。
这里，我们需要使用Log4j的原生库，但是不需要Commons-Logging的原生库。
一切就绪，把上面这4个jar包复制到lib下，导入项目中，就可以像以往一样继续使用Apache Common-Logging编写日志了。
看一看logback.xml的配置
```

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <substitutionProperty name="log.base" value="../logs/hzg" />
  <jmxConfigurator />
  <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
     <layout class="ch.qos.logback.classic.PatternLayout">
        <pattern>%date [%thread] %-5level %logger{80} - %msg%n</pattern>
     </layout>
    </appender>
    <!-- 文件输出日志 (文件大小策略进行文件输出，超过指定大小对文件备份)-->

   <appender name="logfile" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <Encoding>UTF-8</Encoding>
        <File>${log.base}.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>${log.base}.%d{yyyy-MM-dd}.log.zip</FileNamePattern>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>2MB</MaxFileSize>
        </triggeringPolicy>
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%date [%thread] %-5level %logger{80} - %msg%n</pattern>
        </layout>
    </appender>

    <!-- 需要记录日志的包 -->
    <logger name="org.springframework">
        <level value="WARN" />
    </logger>
    <logger name="org.hibernate">
        <level value="WARN" />
    </logger>
    <logger name="org.hibernate.SQL">
        <level value="WARN" />
    </logger>
        <logger name="org.hibernate.cache">
        <level value="ERROR" />
    </logger>
    <root>
        <level value="INFO" />
        <appender-ref ref="stdout" />
        <appender-ref ref="logfile" />
    </root>
</configuration>
```
使用slf4j+logback的优势：
支持按文件大小或基于时间的切分方式，可自定义命名模式
支持文件打包(触发器方式）
支持OSGI环境
如果在单纯的logging环境中，使用SLF4J意义不大。如果想在各种logger API中切换，SELF4J是理想选择，另外在新的项目中，使用SLF4J+Logback是比较好的日志框架选型。
