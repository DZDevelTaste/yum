package ant.yum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ant.yum.repository.OrderRepository;
import ant.yum.vo.OrderVo;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;

	public List<OrderVo> findByState() {
		
		/*
		 * 현재 진료 대기중인 환자 리스트를 반환한다.
		 * 
		 * */
		return orderRepository.findByState();
	}

	public List<OrderVo> findByNo(int patientNo) {
		
		return orderRepository.findByNo(patientNo);
	}

    public List<OrderVo> findByOrderPatient(String date, int orderstateNo) {
        return orderRepository.findByOrderPatient(date, orderstateNo);
    }

	public void updateState(int orderNo, int orderStateNo) {
		
		orderRepository.updateState(orderNo, orderStateNo);
	}

	public void updateState(OrderVo orderVo) {
		orderRepository.updateState(orderVo);
	}

	public void updateDesc(OrderVo orderVo) {
		orderRepository.updateDesc(orderVo);
	}

}
