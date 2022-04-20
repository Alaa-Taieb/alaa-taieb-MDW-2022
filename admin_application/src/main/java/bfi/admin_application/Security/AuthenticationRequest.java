package bfi.admin_application.Security;

public class AuthenticationRequest {

    private String login;
    private String password;

    public AuthenticationRequest(){}

    public AuthenticationRequest(String login , String password){
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String username) {
        this.login = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
}
