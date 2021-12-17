package ant.yum.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.MainRepository;
import ant.yum.vo.UserVo;

@Service
public class MainService {
	@Autowired
	private MainRepository mainRepository;

	public void join(@Valid UserVo vo) {
		mainRepository.insert(vo);
	}
	public UserVo findId(UserVo userVo) {
		return mainRepository.findId(userVo);
	}
	public UserVo findIdByEmail(UserVo userVo) {
		return mainRepository.findIdByEmail(userVo);
	}
	public void updatePw(UserVo userVo) {
		mainRepository.updatePw(userVo);
	}
    public UserVo findByNo(int no) {
        return mainRepository.findByNoMedicine(no);
    }
    public UserVo getUser(String email, String password) {
        return mainRepository.getUser(email, password);
    }
    public void updateInfo(UserVo userVo) {
		mainRepository.updateInfo(userVo);
    }
    public UserVo checkEmail(UserVo userVo) {
		return mainRepository.checkEmail(userVo);
    }
}
