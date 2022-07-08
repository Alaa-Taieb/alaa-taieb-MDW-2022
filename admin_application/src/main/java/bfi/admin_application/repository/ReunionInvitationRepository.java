package bfi.admin_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bfi.admin_application.model.Reunion;
import bfi.admin_application.model.ReunionInvitation;
import bfi.admin_application.model.User;

public interface ReunionInvitationRepository extends JpaRepository<ReunionInvitation , Integer>{
    public Iterable<ReunionInvitation> findByReunion(Reunion reunion);
    public Iterable<ReunionInvitation> findByUser(User user);
}
