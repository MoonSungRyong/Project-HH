package objackie.dao;

import objackie.vo.BoardFile;

public interface BoardFileDao {
  int insert(BoardFile boardFile);
  int delete(int no) throws Exception;
}