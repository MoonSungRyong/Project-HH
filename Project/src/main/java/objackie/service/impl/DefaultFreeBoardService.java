package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.FreeBoardDao;
import objackie.dao.FreeBoardFileDao;
import objackie.dao.ReplyDao;
import objackie.service.FreeBoardService;
import objackie.util.FileUploadUtil;
import objackie.vo.ComplainFile;
import objackie.vo.FreeBoard;
import objackie.vo.FreeBoardFile;

@Service
public class DefaultFreeBoardService implements FreeBoardService {

  @Autowired
  FreeBoardDao freeboardDao;
  @Autowired
  FreeBoardFileDao freeboardFileDao;
  @Autowired
  ReplyDao replyDao;

  public List<FreeBoard> getFreeBoardList(int pageNo, int length, String keyword) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("keyword", keyword);
    return freeboardDao.selectList(map);

  }

  @Override
  public void insertFreeBoard(FreeBoard freeboard, MultipartFile file, String uploadDir) throws Exception {
    try {
      freeboardDao.insert(freeboard);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        FreeBoardFile freeboardFile = new FreeBoardFile();
        freeboardFile.setFilename(newFilename);
        freeboardFile.setBoardNo(freeboard.getBoardNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        freeboardFileDao.insert(freeboardFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  
  @Override
  public void insertFreeBoard1(FreeBoard freeboard, String uploadDir) throws Exception {
    try {
      freeboardDao.insert(freeboard);

      String newFilename = "0000000000.png";
        FreeBoardFile freeboardFile = new FreeBoardFile();
        freeboardFile.setFilename(newFilename);
        freeboardFile.setBoardNo(freeboard.getBoardNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        freeboardFileDao.insert(freeboardFile);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public FreeBoard getFreeBoard(int no) throws Exception {
    return freeboardDao.selectOne(no);
  }

  @Override
  public int getTotalPage(int pageSize) throws Exception {
    int countAll = freeboardDao.countAll();
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }
  
  public void updateFreeBoard(FreeBoard freeboard, MultipartFile file, String uploadDir) throws Exception {
    try{
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("boardNo", freeboard.getBoardNo());
      paramMap.put("email", freeboard.getEmail());
      freeboardDao.update(freeboard);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        FreeBoardFile freeboardFile = new FreeBoardFile();
        freeboardFile.setFilename(newFilename);
        freeboardFile.setBoardNo(freeboard.getBoardNo());
        freeboardFileDao.update(freeboardFile);
      }  
    } catch (Exception e) {
      e.printStackTrace();
    }    
  }

  public void updateVW_CNTFreeBoard(int no) throws Exception {
    freeboardDao.updateVW_CNT(no);
  }

  public void deleteFreeBoard(int no) throws Exception {
    freeboardFileDao.delete(no);
    replyDao.delete1(no);
    freeboardDao.delete(no);
  }
}

