package Service;

import DAO.AccountDao;
import Model.Account;

public class AccountService {
    private AccountDao accountDAO;

    public AccountService() {
        accountDAO = new AccountDao();
    }

    public Account registerAccount(Account account) {
        if (account.getUsername().isEmpty() || account.getPassword().length() < 4  || accountDAO.getAccountByUsername(account.getUsername()) != null) {
            return null; 
        }
        return accountDAO.createAccount(account); 
    }


    public Account loginAccount(Account account) {
        return accountDAO.loginAccount(account);
    }
    
    public int retrieveUserIdByUsername(String username) {
        Account account = accountDAO.getAccountByUsername(username);
        
        if (account != null) {
            return account.getAccount_id(); // Assuming getAccountId() is the method to get the accountId in Account class
        }
        
        return -1; // Indicate user not found
    }
    
}
