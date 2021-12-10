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
		String address = vo.getAddress() + vo.getAddressDetail();
		String rrn = vo.getRrn() +"-"+ vo.getRrn1();
		String email = vo.getEmail() + "@"+ vo.getEmail1();
		String phone = vo.getPhone() +"-"+ vo.getPhone1() +"-"+ vo.getPhone2();
		vo.setEmail(email);
		vo.setRrn(rrn);
		vo.setAddress(address);
		vo.setPhone(phone);

		mainRepository.insert(vo);
	}
	public UserVo findId(UserVo userVo) {
		String rrn = userVo.getRrn() +"-"+ userVo.getRrn1();
		userVo.setRrn(rrn);

		return mainRepository.findId(userVo);
		
	}
	public UserVo findIdByEmail(UserVo userVo) {
		String rrn = userVo.getRrn() +"-"+ userVo.getRrn1();
		String email = userVo.getEmail() + "@"+ userVo.getEmail1();
		userVo.setEmail(email);
		userVo.setRrn(rrn);

		return mainRepository.findIdByEmail(userVo);
	}
	public void updatePw(UserVo userVo) {
		mainRepository.updatePw(userVo);
	}
    public UserVo findByNo(int no) {
        return mainRepository.findByNoMedicine(no);
    }
}
