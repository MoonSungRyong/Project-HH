package objackie.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.FreeBoard;

public interface FreeBoardService {

  List<FreeBoard> getFreeBoardList(int pageNo, int length, String keyword) throws Exception;
  void insertFreeBoard(FreeBoard freeboard, MultipartFile file, String uploadDir) throws Exception; 
  void insertFreeBoard1(FreeBoard freeboard, String uploadDir) throws Exception; 
  FreeBoard getFreeBoard(int no) throws Exception;
  void updateFreeBoard(FreeBoard freeboard, MultipartFile file, String uploadDir) throws Exception;
  void updateVW_CNTFreeBoard(int no) throws Exception;
  void deleteFreeBoard(int no) throws Exception;
  int getTotalPage(int pageSize) throws Exception;

}



