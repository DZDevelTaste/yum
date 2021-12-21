package ant.yum.config;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ant.yum.security.AuthInterceptor;
import ant.yum.security.AuthUserHandlerMethodArgumentResolver;
import ant.yum.security.LoginInterceptor;
import ant.yum.security.LogoutInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	// Argument Resolver
	@Bean
	public HandlerMethodArgumentResolver handlerMethodArgumentResolver() {
		return new AuthUserHandlerMethodArgumentResolver();
	}
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(handlerMethodArgumentResolver());
	}
	// Interceptors
	@Bean
	public HandlerInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}
	@Bean
	public HandlerInterceptor logoutInterceptor() {
		return new LogoutInterceptor();
	}
	@Bean
	public HandlerInterceptor authInterceptor() {
		return new AuthInterceptor();
	}
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry
			.addInterceptor(loginInterceptor())
			.addPathPatterns("/api/user/auth");
		
		registry
			.addInterceptor(logoutInterceptor())
			.addPathPatterns("/api/user/logout");
		
		registry
			.addInterceptor(authInterceptor())
			.addPathPatterns("/**")
			.excludePathPatterns("/api/user/auth")
			.excludePathPatterns("/api/user/logout")
			.excludePathPatterns("/assets/**");		
	}
		//
	// Message Converter
	//
	@Bean
	public StringHttpMessageConverter stringHttpMessageConverter() {
		StringHttpMessageConverter messageConverter = new StringHttpMessageConverter();
		messageConverter.setSupportedMediaTypes(Arrays.asList(new MediaType("text", "html", Charset.forName("UTF-8"))));

		return messageConverter;
	}

	@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder().indentOutput(true)
				.dateFormat(new SimpleDateFormat("yyyy-mm-dd"));

		MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter(builder.build());
		messageConverter
				.setSupportedMediaTypes(Arrays.asList(new MediaType("application", "json", Charset.forName("UTF-8"))));

		return messageConverter;
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(stringHttpMessageConverter());
		converters.add(mappingJackson2HttpMessageConverter());
	}
}
