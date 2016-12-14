package objackie.dao;

import java.util.List;
import java.util.Map;

import objackie.vo.Member;

public interface MyinfoDao {
  List<Member> selectList(Map<String,Object> paramMap) throws Exception;
  Member selectOne(String email) throws Exception;
  Member selectOneByEmailAndPassword(Map<String,Object> paramMap) throws Exception;
  int insert(Member member) throws Exception;
  int update(Member member) throws Exception;
  int delete(String email) throws Exception;
}
