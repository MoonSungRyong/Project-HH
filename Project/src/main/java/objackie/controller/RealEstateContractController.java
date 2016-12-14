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

import objackie.service.RealEstateContractService;
import objackie.vo.JsonResult;
import objackie.vo.RealEstateContract;

@Controller 
@RequestMapping("/contract/")
public class RealEstateContractController {

  @Autowired ServletContext sc;
  @Autowired RealEstateContractService realEstateContractService;


  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="12") int length,
      String email) throws Exception {

    try {
      System.out.println(email);
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList(pageNo, length, email);

      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="list1")
  public Object list1(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="12") int length,
      int no) throws Exception {

    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList1(pageNo, length, no);

      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);
      data.put("buildNo", no);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="list2")
  public Object list2(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="12") int length,
      int no) throws Exception {

    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList2(pageNo, length, no);

      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);
      data.put("buildNo", no);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="list3")
  public Object list3(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="12") int length,
      int no) throws Exception {

    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList3(pageNo, length, no);

      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);
      data.put("buildNo", no);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="rtpaydt")
  public Object rtpaydt(String email) throws Exception {    
    try {

      return JsonResult.success(realEstateContractService.getSelectRtpaydt(email));

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="add")
  @ResponseBody
  public Object add(@ModelAttribute RealEstateContract realEstateContract, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    System.out.println("-----------------------파일 업로드--------------------------------");
    System.out.println(realEstateContract.getEmail());
    System.out.println(file);
    System.out.println(uploadDir);
    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      realEstateContractService.insertRealEstateContract(realEstateContract, file, uploadDir);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="updatereq")
  @ResponseBody
  public Object updatereq(RealEstateContract realEstateContract) throws Exception {
    try {
      realEstateContractService.updateReqRealEstateContract(realEstateContract);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      RealEstateContract realEstateContract = realEstateContractService.getRealEstateContract(no);

      if (realEstateContract == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");

      return JsonResult.success(realEstateContract);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="update")
  public Object update(@ModelAttribute RealEstateContract realEstateContract, MultipartFile file) throws Exception {
    try {
      System.out.println(realEstateContract.getContractNo());
      String uploadDir = sc.getRealPath("/upload") + "/";
      if (realEstateContractService.getRealEstateContract(realEstateContract.getContractNo()) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      realEstateContractService.updateRealEstateContract(realEstateContract, file, uploadDir);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }



  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {      
      if (realEstateContractService.getRealEstateContract(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      realEstateContractService.deleteRealEstateContract(no);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="tenantList")
  public Object tenantList(String email) throws Exception {
    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractTenantList(email);

      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);

      return JsonResult.success(data);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }


}



