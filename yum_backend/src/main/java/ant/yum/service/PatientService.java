package ant.yum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ant.yum.repository.OrderRepository;
import ant.yum.repository.PatientRepository;
import ant.yum.vo.OrderVo;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private OrderRepository orderRepository;

    public PatientVo findByNo(int patientNo) {
        System.out.println("service " + patientNo);
        return patientRepository.findByNo(patientNo);
    }
    
    @Transactional
    public void addOrder(OrderVo orderVo) {
        if(orderVo.getPatientVo().getNo() == 0) {
            // patient의 no를 받아오지 못했으면 신규 환자이므로 환자 정보를 등록
            patientRepository.addPatient(orderVo.getPatientVo());
        }
        
        orderRepository.addOrder(orderVo);
    }

}
