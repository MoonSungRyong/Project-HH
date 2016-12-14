package objackie.dao;

import java.util.Map;

import objackie.vo.Member;

public interface MemberDao {
  Member selectOneByEmailAndPassword(Map<String, Object> paramMap);
  Member selectOneByEmail(Map<String, Object> paramMap);
}


