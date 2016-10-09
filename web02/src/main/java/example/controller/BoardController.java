package example.controller;

import java.io.File;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import example.dao.BoardDao;
import example.dao.BoardFileDao;
import example.util.FileUploadUtil;
import example.vo.Board;
import example.vo.BoardFile;
import example.vo.JsonResult;

@Controller 
@RequestMapping("/board/")
public class BoardController {
  @Autowired ServletContext sc;
  @Autowired BoardDao boardDao;
  @Autowired BoardFileDao boardFileDao;
  
  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int length) throws Exception {
    
    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(boardDao.selectList(map));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  public Object add(
      Board board,
      MultipartFile file1,
      MultipartFile file2) throws Exception {
    
   boardDao.insert(board);
    
   String newFilename = null;
    if (!file1.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file1.getOriginalFilename());
      try {
        file1.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
        BoardFile boardFile = new BoardFile();
        boardFile.setFilename(newFilename);
        boardFile.setBoardNo(board.getNo());
        boardFileDao.insert(boardFile);
      } catch (Exception e) {}
    }
    
    if (!file2.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file2.getOriginalFilename());
      try {
        file2.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
        BoardFile boardFile = new BoardFile();
        boardFile.setFilename(newFilename);
        boardFile.setBoardNo(board.getNo());
        boardFileDao.insert(boardFile);
      } catch (Exception e) {}
    }
    
   
    return "redirect:list.do";
  } 
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      Board board = boardDao.selectOne(no);
      
      if (board == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(board);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="update")
  public Object update(Board board) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", board.getNo());
      paramMap.put("password", board.getPassword());
      
      if (boardDao.selectOneByPassword(paramMap) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      boardDao.update(board);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="delete")
  public Object delete(int no, String password) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", no);
      paramMap.put("password", password);
      
      if (boardDao.selectOneByPassword(paramMap) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      boardDao.delete(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
}
