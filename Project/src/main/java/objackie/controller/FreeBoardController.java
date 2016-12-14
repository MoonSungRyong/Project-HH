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

import objackie.service.FreeBoardService;
import objackie.vo.FreeBoard;
import objackie.vo.JsonResult;

@Controller 
@RequestMapping("/freeboard/")
public class FreeBoardController {
  
  @Autowired ServletContext sc;
  @Autowired FreeBoardService freeboardService;  
 
  
  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="10") int length, 
      String keyword) throws Exception {
    
    try {
      if ((keyword == null) || (keyword == "")) {
        keyword = "";
      }
      
      List<FreeBoard> list = freeboardService.getFreeBoardList(pageNo, length, keyword);
      int totalPage = freeboardService.getTotalPage(length);
      
      for (int i = 0; i < list.size(); i++) {
        System.out.println(list.get(i));
      }
      
      HashMap<String,Object> data = new HashMap<>();      

      if (list.size() <= 9) {
      	data.put("totalPage", 0);
      } else if (10 < list.size() && list.size() <= 19) {
      	data.put("totalPage", 1);
      } else {
      	data.put("totalPage", totalPage);
      }
      
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);
      data.put("keyword", keyword);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }   
  
  
  @RequestMapping(path="add")
  @ResponseBody
  public Object add(@ModelAttribute FreeBoard freeboard, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
//    System.out.println("-----------------------파일 업로드--------------------------------");
//    System.out.println(freeboard.getEmail());
//    System.out.println(freeboard.getWriter());
//    System.out.println(freeboard.getTitle());
//    System.out.println(freeboard.getContents());
//    System.out.println(file);
//    System.out.println(uploadDir);
//    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      freeboardService.insertFreeBoard(freeboard, file, uploadDir);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add1")
  @ResponseBody
  public Object add(@ModelAttribute FreeBoard freeboard) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
//    System.out.println("-----------------------파일 업로드--------------------------------");
//    System.out.println(freeboard.getEmail());
//    System.out.println(freeboard.getWriter());
//    System.out.println(freeboard.getTitle());
//    System.out.println(freeboard.getContents());
//    System.out.println(uploadDir);
//    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      freeboardService.insertFreeBoard1(freeboard, uploadDir);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      FreeBoard freeboard = freeboardService.getFreeBoard(no);
      
      if (freeboard == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(freeboard);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="update")
  public Object update(@ModelAttribute FreeBoard freeboard, MultipartFile file) throws Exception {
    try {
      String uploadDir = sc.getRealPath("/upload") + "/";
      System.out.println(freeboard.getBoardNo());
      if (freeboardService.getFreeBoard(freeboard.getBoardNo()) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      freeboardService.updateFreeBoard(freeboard, file, uploadDir);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="updateVW_CNT")
  public Object updateVW_CNT(int no) throws Exception {
    try {
      if (freeboardService.getFreeBoard(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      freeboardService.updateVW_CNTFreeBoard(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  
  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {      
      if (freeboardService.getFreeBoard(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      freeboardService.deleteFreeBoard(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}



