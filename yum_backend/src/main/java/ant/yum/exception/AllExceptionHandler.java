package ant.yum.exception;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import ant.yum.dto.JsonResult;

@ControllerAdvice
public class AllExceptionHandler {
private static final Log LOGGER = LogFactory.getLog(AllExceptionHandler.class);
	@ExceptionHandler(Exception.class)
	public String handlerException(
			HttpServletRequest request,
			HttpServletResponse response,
			Exception e
			) throws Exception{
		//1. 로깅(logging)
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		LOGGER.error(errors.toString());
		//2. 요청 구분
		// 만약에, JSON 요청인 경우이면 request header의 Accept에 application/json
		// 만약에, HTML 요청인 경우이면 request header의 Accept에 text/html
		String accept = request.getHeader("accept");
		
		if(accept.matches(".*application/json.*")) {
			//3. json 응답 
			response.setStatus(HttpServletResponse.SC_OK);
			
			JsonResult result = JsonResult.fail(errors.toString());
			String jsonString = new ObjectMapper().writeValueAsString(result);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
		} else {
			//3. 사과 페이지 가기 (정상종료)
			request.setAttribute("exception", errors.toString());
			request.getRequestDispatcher("/WEB-INF/viwes/error/exception.jsp").forward(request, response);
		}
		return "error/exception";
	}
}
