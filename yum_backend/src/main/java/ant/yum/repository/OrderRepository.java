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

    public List<OrderVo> findByDateAndOrderstateNo(String date, int orderstateNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("date", date);
		map.put("orderstateNo", orderstateNo);
        List<OrderVo> list = sqlSession.selectList("order.findByDateAndOrderstateNo", map);
        return list;
    }

	public OrderVo findByOrderNo(int orderNo) {
		return sqlSession.selectOne("order.findByOrderNo", orderNo);
	}

	public void addOrder(OrderVo orderVo) {
		sqlSession.insert("order.insertOrder", orderVo);

	}

	// public void addReservation(OrderVo orderVo) {
	// 	sqlSession.insert("order.insertReservation", orderVo);
	// }
	
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

	public void updateDate(OrderVo orderVo) {
		sqlSession.update("order.updateDate", orderVo);
	}

	public int deleteOrder(int orderNo) {
		return sqlSession.delete("order.deleteOrder", orderNo);
	}

}
