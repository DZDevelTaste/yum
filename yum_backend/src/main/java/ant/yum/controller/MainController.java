package ant.yum.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ant.yum.dto.JsonResult;
import ant.yum.service.MainService;
import ant.yum.vo.UserVo;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MainController {
	@Autowired
	private MainService mainService;
	
	@PostMapping("/join")
	public JsonResult join(@RequestBody UserVo userVo) {
		mainService.join(userVo);
		
		return JsonResult.success(userVo);
	}
	@PostMapping("/successId")
	public JsonResult search_email_(@RequestBody UserVo userVo) throws IOException{
		UserVo vo = mainService.findId(userVo);
		
		return JsonResult.success(vo);
	}
	@PostMapping("/successPw")
	public JsonResult search_password_su(@RequestBody UserVo userVo) {
		UserVo vo = mainService.findIdByEmail(userVo);
		
		return JsonResult.success(vo);
	}
	@PostMapping("/updatePw")
	public JsonResult search_password_success(@RequestBody UserVo userVo) {
		mainService.updatePw(userVo);
		
		return JsonResult.success(userVo);
	}

}
