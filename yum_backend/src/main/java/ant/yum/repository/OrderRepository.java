package ant.yum.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ant.yum.vo.OrderVo;

@Repository
public class OrderRepository {
    @Autowired
    private SqlSession sqlSession;

    public void addOrder(OrderVo orderVo) {
        sqlSession.insert("order.insert", orderVo);

    }
    
}
