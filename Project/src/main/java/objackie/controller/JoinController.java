package objackie.controller;

import java.io.File;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.JoinDao;
import objackie.dao.MemberDao;
import objackie.util.FileUploadUtil;
import objackie.vo.JsonResult;
import objackie.vo.Member;

@Controller
@RequestMapping("/auth/")
public class JoinController {
  @Autowired
  JoinDao joinDao;
  @Autowired
  MemberDao memberDao;
  @Autowired
  ServletContext sc;

  @RequestMapping(path = "join")
  public Object add(Member member) throws Exception {
    // System.out.println("join컨트롤러에 들어옵니다.");
    // System.out.println(member.toString());
    try {
      joinDao.insert(member);
      // System.out.println("DB 들어간 후 출력");
      System.out.println(member.toString());
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "updateFile0")
  @ResponseBody
  public Object updateFile0(@RequestParam("email0") String email,
                            @RequestParam("password3") String password,
                           MultipartFile file,
                           HttpSession session) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    String newFilename = null;
    try {
      //System.out.println("updateFile0.json");
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        
        System.out.println(password);
        HashMap<String,Object> paramMap = new HashMap<>();
        paramMap.put("email", email);
        
        Member member = memberDao.selectOneByEmail(paramMap);
        member.setEmail(email);
        member.setPassword(password);
        member.setPhoPath(newFilename);
        joinDao.updatePhoto0(member);
        
        System.out.println(member);
        session.setAttribute("member", member);
      }
      return JsonResult.success();
    } catch (Exception e) {
      // e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path = "updateFile1")
  @ResponseBody
  public Object updateFile1(@RequestParam("email1") String email,
                           @RequestParam("password2") String password,
                           HttpSession session) throws Exception {
    try {
        System.out.println("updateFile1.json");
        System.out.println(password);
        HashMap<String,Object> paramMap = new HashMap<>();
        paramMap.put("email", email);
        Member member = memberDao.selectOneByEmail(paramMap);
        member.setEmail(email);
        member.setPassword(password);
        joinDao.updatePhoto1(member);
        session.setAttribute("member", member);
        
      return JsonResult.success();
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path = "updateFile2")
  @ResponseBody
  public Object updateFile2(@RequestParam("email0") String email,
                           @RequestParam("password2") String password,
                           MultipartFile file,
                           HttpSession session) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    String newFilename = null;
    try {
      System.out.println("updateFile2.json");
      System.out.println(email);
      System.out.println(password);
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        
        HashMap<String,Object> paramMap = new HashMap<>();
        paramMap.put("email", email);
        Member member = memberDao.selectOneByEmail(paramMap);
        member.setEmail(email);
        member.setPassword(password);
        member.setPhoPath(newFilename);
        joinDao.updatePhoto2(member);
        session.setAttribute("member", member);
      }
      return JsonResult.success();
    } catch (Exception e) {
      // e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}
