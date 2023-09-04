package Service;

import java.util.List;

import DAO.AccountDao;
import DAO.MessageDao;
import Model.Account;
import Model.Message;


public class MessageService {

    private MessageDao messageDao;
    private AccountDao accountDao;


    public MessageService() {
        messageDao = new MessageDao();
        accountDao = new AccountDao();

    }

    public Message createMessage(Message message) {
        int posted_by = message.getPosted_by();
        Account existedAccount = accountDao.getAccountById(posted_by);
        if (message.getMessage_text().isEmpty()) return null;

        if (message.getMessage_text().isBlank() || message.getMessage_text().length() > 512 || existedAccount == null) {
            return null;
        }
        
        return messageDao.createMessage(message);
    }

    public List<Message> retrievMessage() {
       
        return messageDao.getAllMessages();
    }

    public Message retrieveMessageById(int message_id) {
        return messageDao.getMessagetById(message_id);
    }

    public Message deleteMessageById(int message_id) {
        return messageDao.deleteMessagetById(message_id);
    }

    public Message updatMessage(int message_id, Message message) {
     
        System.out.println(message +  " message");

        if (message.getMessage_text().isBlank() || message.getMessage_text().length() > 254  ) {
            return null; 
        }
        System.out.println(message +  " message");

        return messageDao.updateMessage(message_id, message);
    }

    public List<Message> retrieveMessageUser(int posted_by) {
        return messageDao.getAllMessagesByUser(posted_by);
    }


}

    





