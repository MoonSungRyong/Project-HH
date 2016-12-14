package objackie.dao;

import objackie.vo.Member;

public interface JoinDao {
  int insert(Member member) throws Exception;
  int updatePhoto0(Member member) throws Exception;
  int updatePhoto1(Member member) throws Exception;
  int updatePhoto2(Member member) throws Exception;
}



