package objackie.dao;

import objackie.vo.FreeBoardFile;

public interface FreeBoardFileDao {
  int insert(FreeBoardFile freeboardFile);
  int update(FreeBoardFile freeboardFile) throws Exception;
  int delete(int no) throws Exception;
}