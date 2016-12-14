package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.RealEstateContractDao;
import objackie.dao.RealEstateContractFileDao;
import objackie.service.RealEstateContractService;
import objackie.util.FileUploadUtil;
import objackie.vo.RealEstateContract;
import objackie.vo.RealEstateContractFile;

@Service 
public class DefaultRealEstateContractService implements RealEstateContractService {
  @Autowired RealEstateContractDao realEstateContractDao;
  @Autowired RealEstateContractFileDao realEstateContractFileDao;
  

  public List<RealEstateContract> getRealEstateContractList(int pageNo, int length, String email) throws Exception {
    System.out.println("리스트 서비스에 들어옵니다.");
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("email", email);
    return realEstateContractDao.selectList(map);
  }


  public List<RealEstateContract> getRealEstateContractList1(int pageNo, int length, int no) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("buildNo", no);
    return realEstateContractDao.selectList1(map);
  }

  public List<RealEstateContract> getRealEstateContractList2(int pageNo, int length, int no) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("buildNo", no);
    return realEstateContractDao.selectList2(map);
  }

  public List<RealEstateContract> getRealEstateContractList3(int pageNo, int length, int no) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    map.put("buildNo", no);
    return realEstateContractDao.selectList3(map);
  }
  
  public List<RealEstateContract> getRealEstateContractTenantList(String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("email", email);
    
    return realEstateContractDao.tenantList(map);
  }

  public void insertRealEstateContract(RealEstateContract realEstateContract, 
      MultipartFile file,
      String uploadDir) throws Exception {

    try{    
      realEstateContractDao.insert(realEstateContract);
      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        RealEstateContractFile realEstateContractFile = new RealEstateContractFile();
        realEstateContractFile.setFilename(newFilename);
        realEstateContractFile.setContractNo(realEstateContract.getContractNo());
        realEstateContractFileDao.insert(realEstateContractFile);
      }      
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public RealEstateContract getRealEstateContract(int no) throws Exception {
    return realEstateContractDao.selectOne(no);
  }

  public RealEstateContract getSelectRtpaydt(String email) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("email", email);    
    return realEstateContractDao.selectRtpaydt(map);
  }

  public void updateRealEstateContract(RealEstateContract realEstateContract, MultipartFile file, String uploadDir) throws Exception {
    try{
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("contractNo", realEstateContract.getContractNo());
      paramMap.put("email", realEstateContract.getEmail());
      realEstateContractDao.update(realEstateContract);
      
      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        RealEstateContractFile realEstateContractFile = new RealEstateContractFile();
        realEstateContractFile.setFilename(newFilename);
        realEstateContractFile.setContractNo(realEstateContract.getContractNo());
        realEstateContractFileDao.update(realEstateContractFile);
      }      
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  
  public void updateReqRealEstateContract(RealEstateContract realEstateContract) throws Exception {     
    realEstateContractDao.updateReq(realEstateContract);
  }
  
  public void deleteRealEstateContract(int no) throws Exception {
    realEstateContractDao.delete(no);
  }

}







