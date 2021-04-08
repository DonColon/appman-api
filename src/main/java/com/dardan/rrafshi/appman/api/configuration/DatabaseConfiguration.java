package com.dardan.rrafshi.appman.api.configuration;

import java.beans.PropertyVetoException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.dardan.rrafshi.commons.security.Passwords;


@Configuration
public class DatabaseConfiguration
{
    @Autowired
    private Environment environment;


    @Bean
    public DataSource datasource()
    	throws PropertyVetoException
    {
    	final var driverClass = this.environment.getProperty("spring.datasource.driver-class-name");
    	final var url = this.environment.getProperty("spring.datasource.url");

    	final var username = this.environment.getProperty("spring.datasource.username");
    	final var password = Passwords.getPasswordFromFile("mysql");

        return DataSourceBuilder.create()
        		.driverClassName(driverClass)
        		.url(url)
        		.username(username)
        		.password(password)
        		.build();
    }
}