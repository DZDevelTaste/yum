package ant.yum.controller;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ant.yum.service.MainService;
import ant.yum.vo.UserVo;

@Controller
public class MainController {
	
	@Autowired
	ServletContext servletContext;
	
	@Autowired
	private MainService mainService;
	
	@RequestMapping("")
	public String index() {
		return "main/index";
	}
	
	@RequestMapping("/join")
	public String join() {
		return "main/join"; 
	}
	@RequestMapping(value="/join", method=RequestMethod.POST)
	public String join(@Valid UserVo vo) {
		mainService.join(vo);
		
		return "redirect:/";
	}
	@RequestMapping("/searchemail")
	public String search_email() {
		return "main/search_email";
	}
	@RequestMapping(value="/searchemailsuccess", method=RequestMethod.POST)
	public String search_email_(HttpServletRequest hsr, HttpServletResponse hsR , Model model) throws IOException{
		String name = hsr.getParameter("name");
		String rrn1 = hsr.getParameter("rrn");
		String rrn2 = hsr.getParameter("rrn1");
		String rrn = rrn1 +"-"+ rrn2;
		
		UserVo vo = mainService.findId(name, rrn);
		
	
		model.addAttribute("vo", vo);
		
		if(vo == null) {
			return "main/search_email";
		}
		return "main/search_email_success";
	}
	@RequestMapping("/searchpassword")
	public String search_password() {
		return "main/search_password";
	}
	@RequestMapping(value="/searchpassword" , method=RequestMethod.POST)
	public String search_password_su(HttpServletRequest hsr, Model model) {
		String name = hsr.getParameter("name");
		String email1 = hsr.getParameter("email");
		String email2 = hsr.getParameter("email1");
		String rrn1 = hsr.getParameter("rrn");
		String rrn2 = hsr.getParameter("rrn1");
		String rrn = rrn1 +"-"+ rrn2;
		String email = email1 + "@" + email2;
		
		UserVo vo = mainService.findIdByEmail(name, email, rrn);
		model.addAttribute("vo", vo);
		
		if(vo == null) {
			return "main/search_password";
		}
		
		return "main/search_password_success";
	}
	@RequestMapping(value="/searchpasswordsuccess/{name}", method=RequestMethod.POST)
	public String search_password_success(HttpServletRequest hsr, Model model, @PathVariable("name") String name) {
		String password = hsr.getParameter("password");
		
		mainService.updatePw(password, name);
		
		return "redirect:/";
	}

}
