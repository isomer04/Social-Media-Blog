package Controller;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import Model.Account;
import Model.Message;

import Service.AccountService;
import Service.MessageService;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.staticfiles.Location;






/**
 * TODO: You will need to write your own endpoints and handlers for your controller. The endpoints you will need can be
 * found in readme.md as well as the test cases. You should
 * refer to prior mini-project labs and lecture materials for guidance on how a controller may be built.
 */
public class SocialMediaController {
    /**
     * In order for the test cases to work, you will need to write the endpoints in the startAPI() method, as the test
     * suite must receive a Javalin object from this method.
     * @return a Javalin app object which defines the behavior of the Javalin controller.
     */

     AccountService accountService;
     MessageService messageService;
 
     public SocialMediaController(){
         this.accountService = new AccountService();
         this.messageService = new MessageService();
     }

    public Javalin startAPI() {

        Javalin app = Javalin.create(config -> {
        config.plugins.enableCors(cors -> {
            cors.add(it -> {
                it.anyHost();
            });
        });
});

        app.post("/register", this::registerHandler);
        app.post("/login", this::loginHandler);
        app.post("/messages", this::messagesCreationHandler);
        app.get("/messages", this::messagesRetrieveHandler);
        app.get("/messages/{message_id}", this::retrieveMessageByIdHandler);
        app.delete("/messages/{message_id}", this::deleteMessageByIdHandler);
        app.patch("/messages/{message_id}", this::updateMessageByIdHandler);
        app.get("/accounts/{account_id}/messages", this::retrieveMessagesByAccountIdHandler);

        return app;
    }

    /**
     * This is an example handler for an example endpoint.
     * @param context The Javalin Context object manages information about both the HTTP request and response.
     */
 

    private void registerHandler(Context context) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Account account = mapper.readValue(context.body(), Account.class);

        // Account account = context.bodyAsClass(Account.class);
        Account createdAccount = accountService.registerAccount(account);

        if (createdAccount != null) {
            context.status(200).json(createdAccount);
        } else {
            context.status(400);
        }
    }

    private void loginHandler(Context context) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Account account = mapper.readValue(context.body(), Account.class);

        Account loggedInAccount = accountService.loginAccount(account);

        if (loggedInAccount != null) {
            context.status(200);
            context.json(loggedInAccount);

        } else {
            context.status(401);
        }
    }

    private void messagesCreationHandler(Context context) {
        Message newMessage = context.bodyAsClass(Message.class);
        Message createdMessage = messageService.createMessage(newMessage);

        if (createdMessage != null) {
            context.status(200).json(createdMessage);
        } else {
            context.status(400);
        }
    }


    private void messagesRetrieveHandler(Context context) {
        List<Message> messages = messageService.retrievMessage();
        context.status(200).json(messages);
    }

    private void retrieveMessageByIdHandler(Context context) throws JsonMappingException, JsonProcessingException  {
      
        int messageId = Integer.parseInt(context.pathParam("message_id"));
        Message message2 = messageService.retrieveMessageById(messageId);
        System.out.println(message2 + " this is message");
       
        if (message2 != null) {
            context.status(200).json(message2);
        }
      

    } 

    private void deleteMessageByIdHandler(Context context) {
        int messageId = Integer.parseInt(context.pathParam("message_id"));
        Message message2 = messageService.deleteMessageById(messageId);
        System.out.println(message2 + " this is message");
       
        if (message2 != null) {
            context.status(200).json(message2);
        }    }
     
    private void updateMessageByIdHandler(Context context)  throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Message message = mapper.readValue(context.body(), Message.class);

        int message_id = Integer.parseInt(context.pathParam("message_id"));
        Message updatedMessage = messageService.updatMessage(message_id, message);
        System.out.println(updatedMessage);
        if(updatedMessage == null){
            context.status(400);
        }else{
            context.status(200).json(updatedMessage);

        }
    }

  

    private void retrieveMessagesByAccountIdHandler(Context context) {

        int account_id = Integer.parseInt(context.pathParam("account_id"));
        List<Message>  message2 = messageService.retrieveMessageUser(account_id);
        System.out.println(message2 + " this is message");
       
        if (message2 != null) {
            context.status(200).json(message2);
        }
    }



}