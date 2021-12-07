package ant.yum.repository;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.OrderVo;

@Repository
public class OrderRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public List<OrderVo> findByState() {
		
		return sqlSession.selectList("order.findByState");
	}
	
	public List<OrderVo> findByNo(int patientNo) {
		
		return sqlSession.selectList("order.findByNo", patientNo);
	}

    public List<OrderVo> findByOrderPatient(String date) {
        System.out.println("service date ======== " + date);
        List<OrderVo> list = sqlSession.selectList("order.findByOrderPatient", date);
        System.out.println(list);
        return list;
    }

	public void addOrder(OrderVo orderVo) {
		sqlSession.insert("order.insert", orderVo);

	}
	
	public void updateState(int orderNo, int orderStateNo) {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("orderNo", orderNo);
		map.put("orderStateNo", orderStateNo);
		sqlSession.update("order.updateState", map);
	}

	public void updateState(OrderVo orderVo) {
		sqlSession.update("order.updateStateNurse", orderVo);
	}

    public void updateDesc(OrderVo orderVo) {
		sqlSession.update("order.updateOrderDesc", orderVo);
    }
}
