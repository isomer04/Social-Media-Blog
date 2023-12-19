package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.h2.engine.Database;

import Model.Account;
import Util.ConnectionUtil;

public class AccountDao {

    public Account createAccount(Account account) {
        String sql = "INSERT INTO Account (username, password) VALUES (? , ?)";
        Connection connection = ConnectionUtil.getConnection();
        
        try (
             PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
                preparedStatement.setString(1, account.getUsername());
                preparedStatement.setString(2, account.getPassword());
    
            int rs = preparedStatement.executeUpdate();
            if (rs == 0) {
                throw new SQLException("Creating account failed, no rows affected.");
            }
    
            ResultSet pkeyResultSet = preparedStatement.getGeneratedKeys();

            if(pkeyResultSet.next()){
                int generated_flight_id = (int) pkeyResultSet.getLong(1);
                return new Account(generated_flight_id, account.getUsername(), account.getPassword());
            }   
        } catch (SQLException e) {
            e.printStackTrace();
            
        }
        return null; 
    }
    

    public Account getAccountByUsername(String username) {
        Connection connection = ConnectionUtil.getConnection();
    
        try {
            // Write SQL logic here
            String sql = "SELECT * FROM Account WHERE username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, username);
            ResultSet rs = preparedStatement.executeQuery();
            
            while (rs.next()) {
                Account account = new Account(rs.getInt("account_id"), rs.getString("username"), rs.getString("password"));
                return account;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        
        return null;
    }

    public Account getAccountByPassword(String password) {
        Connection connection = ConnectionUtil.getConnection();
    
        try {
            // Write SQL logic here
            String sql = "SELECT * FROM Account WHERE username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, password);
            ResultSet rs = preparedStatement.executeQuery();
            
            while (rs.next()) {
                Account account = new Account(rs.getInt("account_id"), rs.getString("username"), rs.getString("password"));
                return account;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        
        return null;
    }


    public Account loginAccount(Account account) {
        Connection connection  = ConnectionUtil.getConnection();
        try {
            String sql = "SELECT * FROM Account WHERE username = ? AND password = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, account.getUsername());
            preparedStatement.setString(2, account.getPassword());

            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    return new Account(rs.getInt("account_id"),
                    rs.getString("username"),
                    rs.getString("password"));
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public Account getAccountById(int account) {
        Connection connection  = ConnectionUtil.getConnection();
        try {
            String sql = "SELECT * FROM Account WHERE account.account_id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, account);


            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    return new Account(rs.getInt("account_id"),
                    rs.getString("username"),
                    rs.getString("password"));
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public String retrieveUsernameById(int userId) {
        String username = null;
        String sql = "SELECT username FROM accounts WHERE account_id = ?";

        try (Connection connection = ConnectionUtil.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, userId);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    username = resultSet.getString("username");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); 
        }

        return username;
    }

   

    
    

  
}
