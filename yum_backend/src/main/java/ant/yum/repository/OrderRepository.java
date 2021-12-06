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
	
	public void updateState(int orderNo, int orderStateNo) {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("orderNo", orderNo);
		map.put("orderStateNo", orderStateNo);
		sqlSession.update("order.updateState", map);
	}

}
