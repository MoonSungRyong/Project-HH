package objackie.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.Board;

public interface BoardService {
 List<Board> getFirstList(String email) throws Exception;
 List<Board> getBoardList(int pageNo, int length, String email) throws Exception;
 void insertBoard(Board board, MultipartFile file, String uploadDir) throws Exception; 
 Board getBoard(int no) throws Exception;
 void updateBoard(Board board) throws Exception;
 void updateVW_CNTBoard(int no) throws Exception;
 void deleteBoard(int no) throws Exception;
 int getTotalPage(int pageSize) throws Exception;
 
}



