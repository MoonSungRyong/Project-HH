package objackie.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import objackie.dao.BuildDao;
import objackie.vo.Build;
import objackie.vo.JsonResult;

@Controller
@RequestMapping("/build/")
public class BuildController {

  @Autowired BuildDao buildDao;

  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="4") int length, String email) throws Exception {

    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      map.put("email", email);

      return JsonResult.success(buildDao.selectList(map));

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="reqList")
  public Object reqList(String email) throws Exception {

    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("email", email);

      return JsonResult.success(buildDao.selectReqList(map));

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="lemail")
  public Object lemail(String TEmail) throws Exception {
    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("TEmail", TEmail);

      return JsonResult.success(buildDao.selectLEmail(map));

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  public Object add(Build build)throws Exception {
    try {
      buildDao.insert(build);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      Build build = buildDao.selectOne(no);

      if (build == null)
        throw new Exception("해당 번호의 건물이 존재하지 않습니다.");

      return JsonResult.success(build);

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="update")
  public Object update(Build build) throws Exception {
    try {
      if (buildDao.selectOne(build.getBuildNo()) == null) {
        throw new Exception("해당 번호의 건물이 없거나 회원정보가 없습니다.");
      }
      buildDao.update(build);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  

  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {
      if (buildDao.selectOne(no) == null) {
        throw new Exception("해당 번호의 건물이 없거나 회원정보가 없습니다.");
      }
      buildDao.delete(no);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}
