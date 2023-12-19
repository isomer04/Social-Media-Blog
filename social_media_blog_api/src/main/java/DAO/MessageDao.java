package DAO;

import Model.Message;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import Util.ConnectionUtil;

public class MessageDao {


    // * @param message_id
    //  * @param posted_by
    //  * @param message_text
    //  * @param time_posted_epoch


    public Message createMessage(Message message) {
        String sql = "INSERT INTO Message (posted_by, message_text, time_posted_epoch) VALUES (?, ?, ?)";
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)
        ) {
            preparedStatement.setInt(1, message.getPosted_by());
            preparedStatement.setString(2, message.getMessage_text());
            preparedStatement.setLong(3, message.getTime_posted_epoch());

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Creating message failed, no rows affected.");
            }

            try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return new Message(generatedKeys.getInt(1), message.getPosted_by(), message.getMessage_text(), message.getTime_posted_epoch());
                } else {
                    throw new SQLException("Creating message failed, no ID obtained.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Message> getAllMessages() {
        List<Message> messages = new ArrayList<>();
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement("SELECT * from Message");
                ResultSet rs = preparedStatement.executeQuery()
        ) {
            while (rs.next()) {
                Message message = new Message(
                        rs.getInt("message_id"),
                        rs.getInt("posted_by"),
                        rs.getString("message_text"),
                        rs.getLong("time_posted_epoch")
                );
                messages.add(message);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return messages;
    }

    public Message getMessagetById(int id) {
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement("Select * from Message where message_id = ?")
        ) {
            preparedStatement.setInt(1, id);

            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    return new Message(rs.getInt("message_id"), rs.getInt("posted_by"), rs.getString("message_text"), rs.getLong("time_posted_epoch"));
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public Message deleteMessagetById(int id) {
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement("Delete FROM Message where message_id = ?")
        ) {
            preparedStatement.setInt(1, id);

            Message message = getMessagetById(id);
            preparedStatement.executeUpdate();

            return message;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public Message updateMessage(int message_id, Message message) {
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement("update Message set  message_text = ? where message_id = ?")
        ) {
            preparedStatement.setString(1, message.getMessage_text());
            preparedStatement.setInt(2, message_id);

            preparedStatement.executeUpdate();

            return getMessagetById(message_id);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public List<Message> getAllMessagesByUser(int posted_by) {
        List<Message> messages = new ArrayList<>();
        Connection connection = ConnectionUtil.getConnection();

        try (
                PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Message WHERE posted_by = ?")
        ) {
            preparedStatement.setInt(1, posted_by);
            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    Message message = new Message(
                            rs.getInt("message_id"),
                            rs.getInt("posted_by"),
                            rs.getString("message_text"),
                            rs.getLong("time_posted_epoch")
                    );
                    messages.add(message);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } 
        return messages;
    }
}

   


