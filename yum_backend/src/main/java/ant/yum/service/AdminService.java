package ant.yum.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.AdminRepository;
import ant.yum.vo.DiseaseVo;
import ant.yum.vo.MedicineVo;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;

	public List<Object> findByAll() {
		return adminRepository.findByAll();
	}
	public List<Object> findByDisease() {
		return adminRepository.findByDisease();
	}
	public List<Object> findByMedicine() {
		return adminRepository.findByMedicine();
	}
	public boolean deleteByNo(int no) {
		return adminRepository.deleteByNo(no);
	}
	public boolean deleteByDisease(String code) {
		return adminRepository.deleteByDisease(code);
	}
	public boolean deleteByMedicine(int no) {
		return adminRepository.deleteByMedicine(no);
	}
	public boolean updateAuth() {
		return adminRepository.updateAuth();
	}
	public boolean updateDisease() {
		return adminRepository.updateDisease();
	}
	public boolean updateMedicine() {
		return adminRepository.updateMedicine();
	}
	public void addDisease(@Valid DiseaseVo vo) {
		adminRepository.addDisease(vo);
	}
	public void addMedicine(@Valid MedicineVo vo) {
		adminRepository.addMedicine(vo);
	}
}
