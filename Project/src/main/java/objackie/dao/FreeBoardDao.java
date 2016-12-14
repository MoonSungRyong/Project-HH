package objackie.dao;


import java.util.List;
import java.util.Map;

import objackie.vo.FreeBoard;

public interface FreeBoardDao {
  List<FreeBoard> selectList(Map<String,Object> paramMap) throws Exception;
  FreeBoard selectOne(int no) throws Exception;
  int insert(FreeBoard freeboard) throws Exception;
  int update(FreeBoard freeboard) throws Exception;
  int updateVW_CNT(int no) throws Exception;  
  int delete(int no) throws Exception;
  int countAll() throws Exception;
}








