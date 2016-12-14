package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.BoardDao;
import objackie.dao.BoardFileDao;
import objackie.service.BoardService;
import objackie.util.FileUploadUtil;
import objackie.vo.Board;
import objackie.vo.BoardFile;


@Service
public class DefaultBoardService implements BoardService {

  @Autowired
  BoardDao boardDao;
  @Autowired
  BoardFileDao boardFileDao;


  public List<Board> getBoardList(int pageNo, int length, String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email);
    return boardDao.selectList(map);
  }

  @Override
  public void insertBoard(Board board, MultipartFile file, String uploadDir) throws Exception {
//    System.out.println("여기부터");
    try {
      boardDao.insert(board);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        BoardFile boardFile = new BoardFile();
        boardFile.setFilename(newFilename);
        boardFile.setBoardNo(board.getBoardNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        boardFileDao.insert(boardFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

//    System.out.println("여기까지");
  }



  public Board getBoard(int no) throws Exception {
    return boardDao.selectOne(no);
  }

  @Override
  public int getTotalPage(int pageSize) throws Exception {
    System.out.println("getTotalPage 들어옵니다.");
    int countAll = boardDao.countAll();
    System.out.println("countAll 출력합니다");
    System.out.println(countAll);
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }


  public void updateBoard(Board Board) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("boardNo", Board.getBoardNo());
    paramMap.put("email", Board.getEmail());

    boardDao.update(Board);
  }
  
  public void updateVW_CNTBoard(int no) throws Exception {
    boardDao.updateVW_CNT(no);
  }

  public void deleteBoard(int no) throws Exception {
    boardFileDao.delete(no);
    boardDao.delete(no);
  }

  @Override
  public List<Board> getFirstList(String email) throws Exception {
    return boardDao.selectFirstList(email);
  }
}

