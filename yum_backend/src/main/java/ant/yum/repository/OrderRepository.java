package ant.yum.repository;

import java.util.List;

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

	public List<OrderVo> findByPatientNo(int patientNo) {

		return sqlSession.selectList("order.findByPatientNo", patientNo);
	}

	public void updateState(OrderVo orderVo) {

		sqlSession.update("order.updateState", orderVo);
	}

	public OrderVo findByOrderNo(int orderNo) {
		return sqlSession.selectOne("order.findByOrderNo", orderNo);
	}

}
