package objackie.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.BoardDao;
import objackie.service.BoardService;
import objackie.vo.Board;
import objackie.vo.JsonResult;

@Controller 
@RequestMapping("/board/")
public class BoardController {

  @Autowired ServletContext sc;
  @Autowired BoardDao boardDao;
  @Autowired BoardService boardService;

  @RequestMapping(path="firstlist")
  public Object firstlist(String email) throws Exception {

    try {
    	System.out.println("최근공지");
    	System.out.println(email);
      List<Board> list = boardService.getFirstList(email);
      System.out.println(list);
      HashMap<String, Object> data = new HashMap<>();
      data.put("list", list);
      data.put("email", email);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  } 

  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="4") int length, String email) throws Exception {
    try {
      //System.out.println("board list controller 들어왔어요.");
      List<Board> list = boardService.getBoardList(pageNo, length, email);
      System.out.println(list);
      int totalPage = boardService.getTotalPage(length);

      HashMap<String,Object> data = new HashMap<>();      
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("email", email);
      data.put("pageNo", pageNo);
      data.put("length", length);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }  

  @RequestMapping(path="add")
  @ResponseBody
  public Object add(@ModelAttribute Board board, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    System.out.println("-----------------------파일 업로드--------------------------------");
    System.out.println(board.getEmail());
    System.out.println(board.getTitle());
    System.out.println(board.getContents());
    System.out.println(file);
    System.out.println(uploadDir);
    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      boardService.insertBoard(board, file, uploadDir);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      Board board = boardService.getBoard(no);

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
      if (boardService.getBoard(board.getBoardNo()) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      boardService.updateBoard(board);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="updateVW_CNT")
  public Object updateVW_CNT(int no) throws Exception {
    try {
      if (boardService.getBoard(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      boardService.updateVW_CNTBoard(no);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }


  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {      
      if (boardService.getBoard(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      System.out.println("delete Controller 들어옵니다.");
      System.out.println(no);
      boardService.deleteBoard(no);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}



