package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Document;
import bfi.admin_application.model.Envoi;
import bfi.admin_application.model.User;

public interface DocumentRepository extends JpaRepository<Document , Integer> {
    public Iterable<Document> findByUser(User user);
    public Iterable<Document> findByEnvoi(Envoi envoi);
}
