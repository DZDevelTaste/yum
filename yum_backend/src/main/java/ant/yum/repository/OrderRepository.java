package ant.yum.repository;

<<<<<<< HEAD
=======
import java.util.HashMap;
import java.util.List;
import java.util.Map;

>>>>>>> origin/master
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

	public void addOrder(OrderVo orderVo) {
		sqlSession.insert("order.insert", orderVo);

	}
	
	public void updateState(int orderNo, int orderStateNo) {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("orderNo", orderNo);
		map.put("orderStateNo", orderStateNo);
		sqlSession.update("order.updateState", map);
	}
}
