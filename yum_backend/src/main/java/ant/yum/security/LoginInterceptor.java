package ant.yum.security;

import java.io.BufferedReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import ant.yum.service.MainService;
import ant.yum.vo.UserVo;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private MainService mainService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		StringBuffer json = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				json.append(line);
			}

		} catch (Exception e) {
			System.out.println("Error reading JSON string: " + e.toString());
		}

		String result = json.toString();
		JSONParser parser = new JSONParser();
		JSONObject obj = null;

		try {
			obj = (JSONObject) parser.parse(result);
		} catch (ParseException e) {
			System.out.println("변환에 실패");
			e.printStackTrace();
		}

		String email = obj.get("email").toString();
		String password = obj.get("password").toString();
		UserVo authUser = mainService.getUser(email, password);

		// session 처리
		HttpSession session = request.getSession(true);
		session.setAttribute("authUser", authUser);
		return true;
	}
}