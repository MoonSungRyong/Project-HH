package objackie.dao;

import objackie.vo.ComplainFile;

public interface ComplainFileDao {
  ComplainFile selectOne(int no) throws Exception;
  int insert(ComplainFile complainFile);
  int update(ComplainFile complainFile);
}