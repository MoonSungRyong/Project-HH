package objackie.dao;

import java.util.List;
import java.util.Map;

import objackie.vo.Complain;

public interface ComplainDao {
  List<Complain> selectList(Map<String,Object> paramMap) throws Exception;
  List<Complain> selectListbyRsvd0(Map<String,Object> paramMap) throws Exception;
  List<Complain> selectListbyRsvd1(Map<String,Object> paramMap) throws Exception;
  List<Complain> selectListbyRsvd0_t(Map<String,Object> paramMap) throws Exception;
  List<Complain> selectListbyRsvd1_t(Map<String,Object> paramMap) throws Exception;
  Complain selectOne(int no) throws Exception;
  Complain selectOneByPassword(Map<String,Object> paramMap) throws Exception;
  int insert(Complain complain) throws Exception;
  int update(Complain complain) throws Exception;
  int update0(Complain complain) throws Exception;
  int delete(int no) throws Exception;
  int countAll() throws Exception;
  int countAllRsvd0() throws Exception;
  int countAllRsvd1() throws Exception;
}








