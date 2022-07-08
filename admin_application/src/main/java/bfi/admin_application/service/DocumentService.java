package bfi.admin_application.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import bfi.admin_application.model.Document;
import bfi.admin_application.model.DocumentType;
import bfi.admin_application.model.Envoi;
import bfi.admin_application.model.FileEntity;
import bfi.admin_application.model.User;
import bfi.admin_application.repository.DocumentRepository;
import bfi.admin_application.repository.DocumentTypeRepository;
import bfi.admin_application.repository.EnvoiRepository;
import bfi.admin_application.repository.FileRepository;
import bfi.admin_application.repository.UserRepository;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository BR;

    @Autowired 
    private UserRepository UR;

    @Autowired
    private FileService FS;

    @Autowired
    private FileRepository FR;

    @Autowired
    private EnvoiRepository ER;

    @Autowired
    private DocumentTypeRepository DTR;

    public Iterable<Document> findAll(){
        return BR.findAll();
    }

    public Optional<Document> findById(Integer id){
        return BR.findById(id);
    }

    public Iterable<Document> findByUser(Integer user_id){
        User user = UR.getById(user_id);
        return BR.findByUser(user);
    }

    public Iterable<Document> findByEnvoi(Integer envoi_id){
        Optional<Envoi> o_envoi = ER.findById(envoi_id);
        Envoi envoi = o_envoi.get();
        return BR.findByEnvoi(envoi);
    }

    public ResponseEntity create(Integer user_id , Integer file_id , String code , Date date , boolean sent , Date date_sent , Integer documentTypeId){
        Optional<User> o_user = UR.findById(user_id);
        Optional<FileEntity> o_file = FR.findById(file_id);
        Optional<DocumentType> o_documentType = DTR.findById(documentTypeId);
        if(o_file.isPresent() && o_user.isPresent() && o_documentType.isPresent()){
            FileEntity file = o_file.get();
            User user = o_user.get();
            DocumentType documentType = o_documentType.get();
            Document bulletin = new Document(user, file, code, date, sent, date_sent , documentType);
            try{
                BR.save(bulletin);
                return new ResponseEntity<>(bulletin , HttpStatus.OK);
            }catch(Exception e){
                Map<String , String> body = new HashMap();
                body.put("Message" , "An Error Occured!");
                body.put("Error" , e.getMessage());
                return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
            }
            
        }else{
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , "The file referenced was not found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity update(Integer id , Integer user_id , Integer file_id , String code , Date date , boolean sent , Date date_sent , Integer documentTypeId){
        Optional<User> o_user = UR.findById(user_id);
        Optional<FileEntity> o_file = FR.findById(file_id);
        Optional<Document> o_b = BR.findById(id);
        Optional<DocumentType> o_documentType = DTR.findById(documentTypeId);
        if(o_file.isPresent() && o_b.isPresent() && o_user.isPresent() && o_documentType.isPresent()){
            FileEntity file = o_file.get();
            Document b = o_b.get();
            User user = o_user.get();
            DocumentType documentType = o_documentType.get();
            b.setCode(code);
            b.setDate(date);
            b.setFile(file);
            b.setSend_date(date_sent);
            b.setUser(user);
            b.setSent(sent);
            b.setDocumentType(documentType);
            BR.save(b);
            return new ResponseEntity<>(b , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , "The file or the Bulletin referenced was not found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity delete(Integer id){
        Optional<Document> o_b = BR.findById(id);
        if(o_b.isPresent()){
            Document b = o_b.get();
            FileEntity file = b.getFile();
            BR.deleteById(b.getId());
            FR.deleteById(file.getId());
            Map<String , String> body = new HashMap();
            body.put("Message" , "Item Deleted Successfully!");
            return new ResponseEntity<>(body , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , "The file or the Bulletin referenced was not found!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity markSent(Integer id , Integer envoi_id){
        Optional<Envoi> o_envoi = ER.findById(envoi_id);
        Optional<Document> o_document = BR.findById(id);
        if(o_envoi.isPresent() && o_document.isPresent()){
            Document document = o_document.get();
            Envoi envoi = o_envoi.get();
            document.setEnvoi(envoi);
            document.setSent(true);
            document.setSend_date(envoi.getDate());
            BR.save(document);
            return new ResponseEntity<>(document , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap();
            body.put("Message" , "An Error Occured!");
            body.put("Error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity markUnsent(Integer id){
        Optional<Document> o_document = BR.findById(id);
        if(o_document.isPresent()){
            Document document = o_document.get();
            document.setSend_date(null);
            document.setSent(false);
            document.setEnvoi(null);
            BR.save(document);
            return new ResponseEntity<>(document , HttpStatus.OK);
        }else{
            Map<String , String> body = new HashMap<>();
            body.put("message" , "An Error has occured!");
            body.put("error" , "Invalid arguments!");
            return new ResponseEntity<>(body , HttpStatus.NOT_FOUND);
        }
    }
}


